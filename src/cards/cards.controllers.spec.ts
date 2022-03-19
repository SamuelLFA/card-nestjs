import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';

const createCardDto: CreateCardDto = {
  originalText: 'originalText #1',
  translatedText: 'translatedText #1',
};

describe('AppController', () => {
  let cardsController: CardsController;
  let cardsService: CardsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        CardsService,
        {
          provide: CardsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((card: CreateCardDto) =>
                Promise.resolve({ id: '1', ...card }),
              ),
          },
        },
      ],
    }).compile();

    cardsController = app.get<CardsController>(CardsController);
    cardsService = app.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(cardsController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a card', () => {
      cardsController.create(createCardDto);
      expect(cardsController.create(createCardDto)).resolves.toEqual({
        id: '1',
        ...createCardDto,
      });
      expect(cardsService.create).toHaveBeenCalledWith(createCardDto);
    });
  });
});
