import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Card } from './cards.model';
import { CardsService } from './cards.service';

const oneCard = {
  originalText: 'originalText #1',
  translatedText: 'translatedText #1',
};

describe('UserService', () => {
  let service: CardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: getRepositoryToken(Card),
          useValue: {
            save: jest.fn().mockResolvedValue(oneCard),
          },
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const oneCard = {
        originalText: 'originalText #1',
        translatedText: 'translatedText #1',
      };

      expect(
        service.create({
          originalText: 'originalText #1',
          translatedText: 'translatedText #1',
        }),
      ).resolves.toEqual(oneCard);
    });
  });
});
