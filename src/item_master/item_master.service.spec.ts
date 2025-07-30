import { Test, TestingModule } from '@nestjs/testing';
import { ItemMasterService } from './item_master.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ItemMaster } from 'src/entities/entities/ItemMaster';

describe('ItemMasterService', () => {
  let service: ItemMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemMasterService,
        {
          provide: getRepositoryToken(ItemMaster),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            findAndCount: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ItemMasterService>(ItemMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
