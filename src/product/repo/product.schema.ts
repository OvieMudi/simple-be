import { Document, Schema } from 'mongoose';
import { User } from 'src/user/repo';

class Product {
  id: string;
  userId: string;
  productCode: string;
  category: string;
  name: string;
  image: string;
  minimumQty: number;
  discountRate?: number;
}

type ProductDocument = Product & Document;

const ProductSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: User.name, required: true },
  productCode: {
    type: String,
    required: true,
    unique: true,
    default: (): string => `P${Math.random().toFixed(8).replace('.', '')}`,
  },
  category: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  minimumQty: { type: Number, default: 1, required: true },
  discountRate: { type: Number, default: 0, required: false },
});

ProductSchema.set('toObject', { virtuals: true });

ProductSchema.set('toJSON', {
  virtuals: true,
  transform: function (_, doc: ProductDocument) {
    delete doc._id;
    delete doc.__v;
  },
});

export { Product, ProductDocument, ProductSchema };
