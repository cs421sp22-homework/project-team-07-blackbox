import torch.utils.data
from data.base_data_loader import BaseDataLoader

def CreateWebDataLoader(opt, cloth, edge, photo):
    # from data.custom_dataset_data_loader_test import CustomDatasetDataLoader
    # data_loader = CustomDatasetDataLoader()
    data_loader = WebDataLoader()
    print(data_loader.name())
    data_loader.initialize(opt, cloth, edge, photo)
    return data_loader


def CreateWebDataset(opt, cloth, edge, photo):
    dataset = None
    from data.web_dataset_test import WebDataset
    dataset = WebDataset()

    print("dataset [%s] was created" % (dataset.name()))
    dataset.initialize(opt, cloth, edge, photo)
    return dataset


class WebDataLoader(BaseDataLoader):
    def name(self):
        return 'WebDataLoader'

    def initialize(self, opt, cloth, edge, photo):
        BaseDataLoader.initialize(self, opt)
        self.dataset = CreateWebDataset(opt, cloth, edge, photo)
        self.dataloader = torch.utils.data.DataLoader(
            self.dataset,
            batch_size=opt.batchSize,
            shuffle=False,
            num_workers=int(opt.nThreads))

    def load_data(self):
        return self.dataloader

    def __len__(self):
        return min(len(self.dataset), self.opt.max_dataset_size)
