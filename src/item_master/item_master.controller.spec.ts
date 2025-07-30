import { Test, TestingModule } from '@nestjs/testing'; // Import testing utilities from NestJS
import { ItemMasterService } from './item_master.service'; // Import the service to test
import { getRepositoryToken } from '@nestjs/typeorm'; // Helper for mocking TypeORM repository
import { ItemMaster } from 'src/entities/entities/ItemMaster';
import { Repository } from 'typeorm'; // TypeORM Repository type

describe('ItemMasterService', () => {
  let service: ItemMasterService; // Will hold our service instance
  let repo: Repository<ItemMaster>; // Will hold our repository mock

  // Sample mock data
  const mockItemArray = [
    {
      uid: '1',
      item_code: 'A001',
      description: 'Item 1',
      create_date: '2024-01-01',
    },
    {
      uid: '2',
      item_code: 'A002',
      description: 'Item 2',
      create_date: '2024-01-02',
    },
  ];

  // Mock implementation of repository methods
  const mockRepository = {
    find: jest.fn().mockResolvedValue(mockItemArray),
    findOne: jest.fn().mockResolvedValue(mockItemArray[0]),
    save: jest.fn().mockResolvedValue(mockItemArray[0]),
    findAndCount: jest
      .fn()
      .mockResolvedValue([mockItemArray, mockItemArray.length]),
    create: jest.fn().mockImplementation((dto) => dto), // เพิ่มตรงนี้!
  };

  beforeEach(async () => {
    // Create a testing module and provide mocks
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemMasterService, // Provide the service under test
        {
          provide: getRepositoryToken(ItemMaster), // Provide the mocked repository
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ItemMasterService>(ItemMasterService); // Get service instance from module
    repo = module.get<Repository<ItemMaster>>(getRepositoryToken(ItemMaster)); // Get repository instance
  });

  it('should be defined', () => {
    // Test that the service is created successfully
    expect(service).toBeDefined();
  });

  // it('findAll should return array of items', async () => {
  //   // Test that findAll returns all items
  //   const result = await service.findAll();
  //   expect(result).toEqual(mockItemArray); // Should match mock data
  //   expect(repo.find).toHaveBeenCalled(); // Ensure .find() was called
  // });

  it('findItemAll should return array of items and total count', async () => {
    const result = await service.findItemAll();
    expect(result).toEqual({
      data: mockItemArray,
      total: mockItemArray.length,
    });
    expect(repo.findAndCount).toHaveBeenCalled();
  });

  // it('should get one item by id', async () => {
  //   // Test that findOne returns the correct item
  //   const result = await service.findOne(1);
  //   expect(result).toEqual(mockItemArray[0]);
  //   expect(repo.findOne).toHaveBeenCalledWith({ where: { uid: 1 } }); // Check call arguments
  // });

  it('should create a new item', async () => {
    // Test that create returns the created item
    const dto = { item_code: 'A003', description: 'Item 3' };
    const result = await service.create(dto as any);
    expect(result).toEqual(mockItemArray[0]);
    expect(repo.save).toHaveBeenCalledWith(dto); // Ensure .save() was called with dto
  });
});
