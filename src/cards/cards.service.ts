import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './cards.model';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardsRepository: Repository<Card>,
  ) {}

  create(createCardDto: CreateCardDto): Promise<Card> {
    const card = new Card();
    card.originalText = createCardDto.originalText;
    card.translatedText = createCardDto.translatedText;

    return this.cardsRepository.save(card);
  }
}
