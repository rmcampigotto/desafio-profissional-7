import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateItemMagicoDto } from './dto/create-item-magico.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ItemMagico } from './schema/item-magico.schema';
import { Model } from 'mongoose';
import { TiposItens } from './enums/tipos-itens.enum';

@Injectable()
export class ItemMagicoService {
  constructor(
    @InjectModel(ItemMagico.name) private readonly itemMagicoModel: Model<ItemMagico>,
  ) {}

  async create(createItemMagicoDto: CreateItemMagicoDto) {
    const { forca, defesa, tipo_item } = createItemMagicoDto;

    if (forca + defesa <= 0) {
      throw new BadRequestException('Itens mágicos devem ter pelo menos 1 ponto de Força ou Defesa.');
    }

    if (tipo_item === TiposItens.ARMA && defesa > 0) {
      throw new BadRequestException('Itens do tipo ARMA não podem ter Defesa maior que zero.');
    }

    if (tipo_item === TiposItens.ARMADURA && forca > 0) {
      throw new BadRequestException('Itens do tipo ARMADURA não podem ter Força maior que zero.');
    }

    return this.itemMagicoModel.create(createItemMagicoDto);
  }

  async findAll() {
    return this.itemMagicoModel.find();
  }

  async findOne(id: number) {
    const item = await this.itemMagicoModel.findOne({ identificador: id });

    if (!item) {
      throw new NotFoundException('Item mágico não encontrado');
    }

    return item;
  }

  async remove(id: number) {
    const resultado = await this.itemMagicoModel.deleteOne({ identificador: id });

    if (resultado.deletedCount === 0) {
      throw new NotFoundException('Item mágico não encontrado para exclusão');
    }

    return { message: 'Item mágico removido com sucesso' };
  }
}