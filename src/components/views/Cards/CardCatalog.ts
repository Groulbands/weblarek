import { IEvents } from "../../base/Events";
import { Card } from "./Card";
import { IProduct } from "../../../types";


export class CardCatalog extends Card {
  private currentProduct: IProduct | null = null;

  constructor (events: IEvents) {
    super(events, `#card-catalog`);
      this.container.addEventListener(`click`, () => {
        if (this.currentProduct !== null) {
          this.events.emit(`product:select`, this.currentProduct)
        }
      })

  }

  render(product: IProduct): HTMLElement {
    this.renderBase(product);
    this.currentProduct = product;
    return this.container;
  }
}