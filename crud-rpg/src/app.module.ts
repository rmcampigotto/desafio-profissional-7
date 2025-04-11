import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonagemModule } from './personagem/personagem.module';
import { ItemMagicoModule } from './item-magico/item-magico.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/crud-rpg'),
    PersonagemModule,
    ItemMagicoModule,
  ],
})

export class AppModule {}