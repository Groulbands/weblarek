import { IProduct } from "../../types";

export class Products {
  private items: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor() {}

  setItems(items: IProduct[]): void {
    this.items = items;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getItemById(id: string): IProduct | undefined {
    return this.items.find((item) => item.id === id);
  }

  setItem(item: IProduct): void {
    this.selectedProduct = item;
  }
  
  getItem(): IProduct | null{
    return this.selectedProduct;
  }
}   