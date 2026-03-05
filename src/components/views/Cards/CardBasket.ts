import { Card } from "./Card";
import { IProduct } from "../../../types";
import { IEvents } from "../../base/Events";
import { cloneTemplate, ensureElement } from "../../../utils/utils";


export class CardBasket extends Card{
  protected currentProduct?: IProduct;
  protected deleteFromCartButton: HTMLButtonElement;
  protected itemIndexElement: HTMLElement;

  constructor (protected events: IEvents, template: HTMLTemplateElement) {
      super(events, cloneTemplate(template));

    this.deleteFromCartButton = ensureElement<HTMLButtonElement>(`.basket__item-delete`, this.container);
    this.itemIndexElement = ensureElement<HTMLElement>(`.basket__item-index`, this.container);

    this.deleteFromCartButton.addEventListener(`click`, () => {
          this.events.emit(`product:deleteFromBasket`, this.currentProduct)
    })
  }

  render (product: IProduct & {index : number}): HTMLElement {
    this.title.textContent = product.title;
    this.price.textContent = product.price ? `${product.price} синапсов` : `Бесценно`;
    this.currentProduct = product;
    this.itemIndexElement.textContent = String(product.index);
    return this.container;
  }
}