import os.path
from data.base_dataset import BaseDataset, get_params, get_transform
from PIL import Image
import linecache


class WebDataset(BaseDataset):
    def initialize(self, opt, cloth, edge, photo):
        self.opt = opt

        self.im = photo
        self.c = cloth
        self.e = edge
        # import ipdb; ipdb.set_trace()
        self.dataset_size = 1


    def __getitem__(self, index):
        # file_path ='demo.txt'
        # im_name, c_name = linecache.getline(file_path, index+1).strip().split()

        I = self.im.convert('RGB')

        params = get_params(self.opt, I.size)
        transform = get_transform(self.opt, params)
        transform_E = get_transform(self.opt, params, method=Image.NEAREST, normalize=False)

        I_tensor = transform(I)

        C = self.c.convert('RGB')
        C_tensor = transform(C)

        E = self.e.convert('L')
        E_tensor = transform_E(E)

        input_dict = {'image': I_tensor, 'clothes': C_tensor, 'edge': E_tensor,
                      'p_name': '0.jpg'}
        return input_dict

    def __len__(self):
        return self.dataset_size

    def name(self):
        return 'WebDataset'
