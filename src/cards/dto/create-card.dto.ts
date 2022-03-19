import { IsNotEmpty } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  originalText: string;

  @IsNotEmpty()
  translatedText: string;
}
