import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TiposItens } from '../enums/tipos-itens.enum';

@Schema()
export class ItemMagico extends Document {

    @Prop({ type: Number, unique: true })
    identificador: number;

    @Prop()
    nome: string;

    @Prop({ type: String, enum: TiposItens })
    tipo_item: TiposItens;

    @Prop()
    forca: number;

    @Prop()
    defesa: number;

}

export const ItemMagicoSchema = SchemaFactory.createForClass(ItemMagico);

ItemMagicoSchema.set('toJSON', {
    virtuals: false,
    versionKey: false,
    transform: (_doc, ret) => {
      delete ret._id;
    },
});  