export class UpdateProductDTO {
  productCode: string;
  category?: string;
  name?: string;
  image?: string;
  minimumQty?: number;
  discountRate?: number;
}
