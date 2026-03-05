import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
  private items: IProduct[] = [];

  constructor(protected events: IEvents) {}

  getProducts(): IProduct[] {
    return this.items;
  }

  addProduct(item: IProduct): void {
    this.items.push(item);
    this.events.emit(`basket:changed`)
  }

  deleteProduct(item: IProduct): void {
    this.items = this.items.filter(product => product.id !== item.id);
    this.events.emit(`basket:changed`)
  }

  clearCart(): void {
    this.items = [];
    this.events.emit(`basket:changed`)
  }

  getTotalPrice(): number | 0 {
    const total = this.items.reduce((sum, item) => {
      return sum + (item.price ?? 0);
    }, 0);
return total
}

  getTotalCount(): number {
    return this.items.length
  }

  findProduct(id: string): boolean {
    return this.items.some(product => product.id === id)
  }
}
