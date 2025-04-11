import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Mongoose } from 'mongoose';
import { Classe } from '../enums/classe.enum';
import { ItemMagico } from 'src/item-magico/schema/item-magico.schema';

@Schema()
export class Personagem extends Document {

    @Prop({ type: Number, unique: true })
    identificador: number;

    @Prop()
    nome : string;

    @Prop()
    nome_aventureiro: string;

    @Prop({ type: String, enum: Classe })
    classe: Classe;
    
    @Prop()
    level: number;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'ItemMagico' })
    list_itens_magicos: ItemMagico[];

    @Prop({ type: Number})
    forca: number;
    
    @Prop({ type: Number})
    defesa: number;

}

export const PersonagemSchema = SchemaFactory.createForClass(Personagem);

PersonagemSchema.set('toJSON', {
    virtuals: false,
    versionKey: false,
    transform: (_doc, ret) => {
        delete ret._id;
    },
});