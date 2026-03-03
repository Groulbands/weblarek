import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Products {
  private items: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor(protected events: IEvents) {}

  setItems(items: IProduct[]): void {
    this.items = items;
    this.events.emit(`catalog:changed`);
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getItemById(id: string): IProduct | undefined {
    return this.items.find((item) => item.id === id);
  }

  setItem(item: IProduct): void {
    this.selectedProduct = item;
    this.events.emit(`selectedProduct:changed`, this.selectedProduct)
  }
  
  getItem(): IProduct | null{
    return this.selectedProduct;
  }
}   