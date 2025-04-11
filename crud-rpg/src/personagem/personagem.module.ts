import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Personagem, PersonagemSchema } from './schema/personagem.schema';
import { PersonagemService } from './personagem.service';
import { PersonagemController } from './personagem.controller';
import { ItemMagico, ItemMagicoSchema } from 'src/item-magico/schema/item-magico.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Personagem.name, schema: PersonagemSchema },
      { name: ItemMagico.name, schema: ItemMagicoSchema }
    ])
  ],
  controllers: [PersonagemController],
  providers: [PersonagemService],
})
export class PersonagemModule {}
