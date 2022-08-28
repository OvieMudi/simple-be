export class CreateProductDTO {
  category: string;
  name: string;
  image: string;
  minimumQty?: number;
  discountRate?: number;
}
