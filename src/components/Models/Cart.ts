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
  }

  deleteProduct(item: IProduct): void {
    this.items = this.items.filter(product => product !== item);
    this.events.emit(`product:deleteFromBasket`)
  }

  clearCart(): void {
    this.items = [];
    this.events.emit(`basket:clear`)
  }

  getTotalPrice(): number | 0 {
    let total = 0;
    this.items.forEach(item => {
      if (item.price !== null) {
        total += item.price;
      }
    })
    return total;
  }

  getTotalCount(): number {
    return this.items.length
  }

  findProduct(id: string): boolean {
    return this.items.some(product => product.id === id)
  }
}
