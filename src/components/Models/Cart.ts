import { IProduct } from "../../types";

export class Cart {
  private items: IProduct[] = [];

  getProducts(): IProduct[] {
    return this.items;
  }

  addProduct(item: IProduct): void {
    this.items.push(item);
  }

  deleteProduct(item: IProduct): void {
    this.items = this.items.filter(product => product !== item);
  }

  clearCart(): void {
    this.items = [];
  }

  getTotalPrice(): number | null {
    let total = 0;
    this.items.forEach(item => {
      if (item.price !== null) {
        total += item.price;
      }
    })
    if (total == 0) return null
    else return total;
  }

  getTotalCount(): number {
    return this.items.length
  }

  findProduct(id: string): string {
    if (this.items.find((item) => item.id === id)) {
      return `В корзине найден товар с id: ${id}`;
    } else return `В корзине не найден товар с id: ${id}`
  }
}
