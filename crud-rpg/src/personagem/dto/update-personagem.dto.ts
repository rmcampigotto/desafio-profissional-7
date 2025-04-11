import { IsString } from 'class-validator';

export class UpdateNomeAventureiroDto {
  @IsString()
  nome_aventureiro: string;
}
