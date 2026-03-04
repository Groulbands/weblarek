import { Card } from "./Card";
import { IProduct } from "../../../types";
import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";


export class CardPreview extends Card{
  protected currentProduct: IProduct | null = null;
  protected cardDescription: HTMLElement;
  protected addToCartButton: HTMLButtonElement;
  private _inBasket: boolean = false;

  constructor (protected events: IEvents) {
    super(events, `#card-preview`);
    this.cardDescription = ensureElement<HTMLElement>(`.card__text`, this.container);
    this.addToCartButton = ensureElement<HTMLButtonElement>(`.card__button`, this.container);

    this.addToCartButton.addEventListener(`click`, () => {
      if (this.currentProduct !== null) {
          if (this._inBasket == false) {
            this.events.emit(`product:addToBasket`, this.currentProduct)
          } else if (this._inBasket == true) {
            this.events.emit(`product:deleteFromBasket`, this.currentProduct)
          }
        }
    })
  }

  render(product: IProduct): HTMLElement {
    this.renderBase(product);
    this.currentProduct = product;
    this.cardDescription.textContent = product.description;
    if (product.price === null) {
      this.addToCartButton.setAttribute(`disabled`, `true`);
      this.addToCartButton.textContent = `Недоступно`;
    } else {
      this.addToCartButton.removeAttribute(`disabled`);
      this.updateButtonText();
    } 
    return this.container;
  }

  set inBasket(value: boolean) {
    this._inBasket = value;
    this.updateButtonText()
  }

  private updateButtonText() {
    if (this.addToCartButton.getAttribute(`disable`) !== `true`) {
      this.addToCartButton.textContent = this._inBasket ? `Удалить из корзины` : `Купить`;
    }
  }
}