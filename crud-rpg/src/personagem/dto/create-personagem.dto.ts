import { IsString, IsNumber, IsEnum, IsArray, Max, Min, IsMongoId } from 'class-validator';
import { Classe } from '../enums/classe.enum';

export class CreatePersonagemDto {
  
  @IsNumber()
  identificador: number;

  @IsString()
  nome: string;

  @IsString()
  nome_aventureiro: string;

  @IsEnum(Classe)
  classe: Classe;

  @IsNumber()
  level: number;

  @IsArray()
  @IsMongoId({ each: true })
  list_itens_magicos: string[];

  @IsNumber()
  forca: number;

  @IsNumber()
  defesa: number;
}
