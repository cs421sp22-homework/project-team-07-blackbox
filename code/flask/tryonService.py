import io

import numpy as np
import cv2
import time

from PIL import Image

from options.test_options import TestOptions
from data.data_loader_test import CreateWebDataLoader
from models.networks import ResUnetGenerator, load_checkpoint
from models.afwm import AFWM
import torch.nn as nn
import os
import torch
import torch.nn.functional as F
from torchvision import utils
from util import flow_util


def generateEdge(img):
    mask = img.copy()

    # 二值化，180为阈值，小于100的变为255，大于100的变为0
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    etVal, threshold = cv2.threshold(gray, 250, 255, cv2.THRESH_BINARY_INV)

    # OpenCV定义的结构元素
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    # 腐蚀图像
    # eroded = cv2.erode(threshold, kernel)
    # 膨胀图像
    # dilated = cv2.dilate(eroded, kernel)
    # 高斯滤波
    # Gaussian = cv2.GaussianBlur(dilated, (5, 5), 0)
    # 寻找轮廓
    contours, hierarchy = cv2.findContours(threshold, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    valid = len(contours) > 0
    # 找到所有的轮廓
    # contours, _ = cv2.findContours(gray, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    area = []
    # 找到最大的轮廓
    for k in range(len(contours)):
        area.append(cv2.contourArea(contours[k]))
    max_idx = np.argmax(np.array(area))
    # 填充最大的轮廓
    mask = cv2.drawContours(mask, contours, max_idx, 0, cv2.FILLED)
    mask = ~mask
    # 保存填充后的图像
    return mask


@torch.no_grad()
def tensor_to_image(
    tensor,
    **kwargs,
):
    """
    Save a given Tensor into an image file.

    Args:
        tensor (Tensor or list): Image to be saved. If given a mini-batch tensor,
            saves the tensor as a grid of images by calling ``make_grid``.
        fp (string or file object): A filename or a file object
        format(Optional):  If omitted, the format to use is determined from the filename extension.
            If a file object was used instead of a filename, this parameter should always be used.
        **kwargs: Other arguments are documented in ``make_grid``.
    """

    if not torch.jit.is_scripting() and not torch.jit.is_tracing():
        utils._log_api_usage_once(tensor_to_image)
    grid = utils.make_grid(tensor, **kwargs)
    # Add 0.5 after unnormalizing to [0, 255] to round to nearest integer
    ndarr = grid.mul(255).add_(0.5).clamp_(0, 255).permute(1, 2, 0).to("cpu", torch.uint8).numpy()
    img = Image.fromarray(ndarr)
    return image2byte(img)

def image2byte(image):
    '''
    图片转byte
    image: 必须是PIL格式
    image_bytes: 二进制
    '''
    # 创建一个字节流管道
    img_bytes = io.BytesIO()
    # 将图片数据存入字节流管道， format可以按照具体文件的格式填写
    image.save(img_bytes, format="JPEG")
    # 从字节流管道中获取二进制
    image_bytes = img_bytes.getvalue()
    return image_bytes

def process(cloth, photo, edge):
    opt = TestOptions().parse()


    start_epoch, epoch_iter = 1, 0

    f2c = flow_util.flow2color()

    data_loader = CreateWebDataLoader(opt, cloth, edge, photo)
    dataset = data_loader.load_data()
    dataset_size = len(data_loader)
    print(dataset_size)
    # import ipdb; ipdb.set_trace()
    warp_model = AFWM(opt, 3)
    print(warp_model)
    warp_model.eval()
    warp_model.cuda() if opt.gpu_ids == -1 else warp_model.cpu()
    load_checkpoint(warp_model, opt.warp_checkpoint)

    gen_model = ResUnetGenerator(7, 4, 5, ngf=64, norm_layer=nn.BatchNorm2d)
    # print(gen_model)
    gen_model.eval()
    gen_model.cuda() if opt.gpu_ids == -1 else gen_model.cpu()
    load_checkpoint(gen_model, opt.gen_checkpoint)

    total_steps = (start_epoch - 1) * dataset_size + epoch_iter
    step = 0
    step_per_batch = dataset_size / opt.batchSize

    for epoch in range(1, 2):

        for i, data in enumerate(dataset, start=epoch_iter):
            iter_start_time = time.time()
            total_steps += opt.batchSize
            epoch_iter += opt.batchSize

            real_image = data['image']
            clothes = data['clothes']
            ##edge is extracted from the clothes image with the built-in function in python
            edge = data['edge']
            edge = torch.FloatTensor((edge.detach().numpy() > 0.5).astype(np.int))
            clothes = clothes * edge

            # import ipdb; ipdb.set_trace()

            flow_out = warp_model(real_image.cuda(), clothes.cuda()) \
                if opt.gpu_ids == -1 else warp_model(real_image.cpu(), clothes.cpu())
            warped_cloth, last_flow, = flow_out
            if opt.gpu_ids == -1:
                warped_edge = F.grid_sample(edge.cuda(), last_flow.permute(0, 2, 3, 1),
                                            mode='bilinear', padding_mode='zeros')
                gen_inputs = torch.cat([real_image.cuda(), warped_cloth, warped_edge], 1)
            else:
                warped_edge = F.grid_sample(edge.cpu(), last_flow.permute(0, 2, 3, 1),
                                            mode='bilinear', padding_mode='zeros')
                gen_inputs = torch.cat([real_image.cpu(), warped_cloth, warped_edge], 1)
            gen_outputs = gen_model(gen_inputs)
            p_rendered, m_composite = torch.split(gen_outputs, [3, 1], 1)
            p_rendered = torch.tanh(p_rendered)
            m_composite = torch.sigmoid(m_composite)
            m_composite = m_composite * warped_edge
            p_tryon = warped_cloth * m_composite + p_rendered * (1 - m_composite)

            path = 'results/' + opt.name
            os.makedirs(path, exist_ok=True)
            # sub_path = path + '/PFAFN'
            # os.makedirs(sub_path,exist_ok=True)
            output_path = opt.output + data['p_name'][0].split('\\')[-1]
            print(output_path)

                ## save try-on image only

                # utils.save_image(
                #     p_tryon,
                #     os.path.join('./our_t_results', output_path),
                #     nrow=int(1),
                #     normalize=True,
                #     range=(-1, 1),
                # )
            return tensor_to_image(p_tryon, nrow=int(1), normalize=True, range=(-1, 1))
