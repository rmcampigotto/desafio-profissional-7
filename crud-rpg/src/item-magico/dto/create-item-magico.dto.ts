import { IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { TiposItens } from '../enums/tipos-itens.enum';

export class CreateItemMagicoDto {
  @IsNumber()
  identificador: number;

  @IsString()
  nome: string;

  @IsEnum(TiposItens)
  tipo_item: TiposItens;

  @IsNumber()
  @Min(0)
  forca: number;

  @IsNumber()
  @Min(0)
  defesa: number;
}
