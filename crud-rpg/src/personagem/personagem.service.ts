import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { UpdateNomeAventureiroDto } from './dto/update-personagem.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Personagem } from './schema/personagem.schema';
import { Model } from 'mongoose';
import { ItemMagico } from 'src/item-magico/schema/item-magico.schema';

@Injectable()
export class PersonagemService {
  constructor(
    @InjectModel(ItemMagico.name) private readonly itemMagicoModel: Model<ItemMagico>,
    @InjectModel(Personagem.name) private readonly personagemModel: Model<Personagem>,
  ) {}

  async create(createPersonagemDto: CreatePersonagemDto) {
    const { forca, defesa } = createPersonagemDto;

    if (forca + defesa > 10) {
      throw new BadRequestException('Você possui somente 10 pontos para distribuir!');
    }

    return this.personagemModel.create(createPersonagemDto);
  }

  async addItemMagico(idPersonagem: number, idItemMagico: number) {
    const item = await this.itemMagicoModel.findOne({ identificador: idItemMagico });
  
    if (!item) {
      throw new NotFoundException('Item mágico não encontrado');
    }
  
    const personagem = await this.personagemModel.findOne({ identificador: idPersonagem });
  
    if (!personagem) {
      throw new NotFoundException('Personagem não encontrado');
    }
  
    const jaTemAmuleto = await this.personagemModel.findOne({
      identificador: idPersonagem,
      list_itens_magicos: { $in: [item._id] },
    }).populate('list_itens_magicos');
  
    const amuletoDuplicado = jaTemAmuleto?.list_itens_magicos?.some(
      (i: any) => i.tipo_item === 'AMULETO'
    );
  
    if (amuletoDuplicado && item.tipo_item === 'AMULETO') {
      throw new BadRequestException('Personagem já possui um amuleto!');
    }
  
    return this.personagemModel.findOneAndUpdate(
      { identificador: idPersonagem },
      { $push: { list_itens_magicos: item._id } },
      { new: true },
    );
  }  

  async findAll() {
    const personagens = await this.personagemModel
      .find()
      .populate({
        path: 'list_itens_magicos',
        select: '-_id -__v'
      })
      .exec();
  
    return personagens.map((personagem) => {
      const forcaTotal =
        personagem.forca +
        personagem.list_itens_magicos.reduce((total, item: any) => total + item.forca, 0);
  
      const defesaTotal =
        personagem.defesa +
        personagem.list_itens_magicos.reduce((total, item: any) => total + item.defesa, 0);
  
      const plain = personagem.toObject({ versionKey: false });
      delete plain._id;
  
      return {
        ...plain,
        forca: forcaTotal,
        defesa: defesaTotal,
      };
    });
  }  

  async findOne(id: number) {
    const personagem = await this.personagemModel
      .findOne({ identificador: id })
      .populate({
        path: 'list_itens_magicos',
        select: '-_id -__v',
      })
      .exec();
  
    if (!personagem) {
      throw new NotFoundException('Personagem não encontrado');
    }
  
    const forcaTotal =
      personagem.forca +
      personagem.list_itens_magicos.reduce((total, item: any) => total + item.forca, 0);
  
    const defesaTotal =
      personagem.defesa +
      personagem.list_itens_magicos.reduce((total, item: any) => total + item.defesa, 0);
  
    const plain = personagem.toObject({ versionKey: false });
    delete plain._id;
  
    return {
      ...plain,
      forca: forcaTotal,
      defesa: defesaTotal,
    };
  }  

  async listItensMagicosByPersonagem(id: number) {
    const personagem = await this.personagemModel
      .findOne({ identificador: id })
      .populate({
        path: 'list_itens_magicos',
        select: '-_id -__v',
      })
      .select('list_itens_magicos')
      .exec();
  
    if (!personagem) {
      throw new NotFoundException('Personagem não encontrado');
    }
  
    return personagem.list_itens_magicos;
  }
  

  async buscarAmuletosByPersonagem(id: number) {
    const personagem = await this.personagemModel
      .findOne({ identificador: id })
      .populate('list_itens_magicos')
      .exec();

    if (!personagem) {
      throw new NotFoundException('Personagem não encontrado');
    }

    const amuletos = personagem.list_itens_magicos.filter(
      (item: any) => item.tipo_item === 'AMULETO',
    );

    return { amuletos };
  }

  async updateNomeAventureiro(id: number, updateNomeAventureiroDto: UpdateNomeAventureiroDto) {
    const personagem = await this.personagemModel.findOneAndUpdate(
      { identificador: id },
      { nome_aventureiro: updateNomeAventureiroDto.nome_aventureiro },
      { new: true },
    );

    if (!personagem) {
      throw new NotFoundException('Personagem não encontrado');
    }

    return personagem;
  }

  async removeItemMagico(idPersonagem: number, idItemMagico: number) {
    const personagem = await this.personagemModel.findOneAndUpdate(
      { identificador: idPersonagem },
      { $pull: { list_itens_magicos: idItemMagico } },
      { new: true },
    );

    if (!personagem) {
      throw new NotFoundException('Personagem não encontrado');
    }

    return personagem;
  }

  async remove(id: number) {
    const resultado = await this.personagemModel.deleteOne({ identificador: id });

    if (resultado.deletedCount === 0) {
      throw new NotFoundException('Personagem não encontrado para exclusão');
    }

    return { message: 'Personagem removido com sucesso' };
  }
}