import { Card } from "./Card";
import { IProduct } from "../../../types";
import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";
import { categoryMap, CDN_URL } from "../../../utils/constants";


export class CardPreview extends Card{
  protected image: HTMLImageElement;
  protected category: HTMLElement;
  protected currentProduct?: IProduct;
  protected cardDescription: HTMLElement;
  protected addToCartButton: HTMLButtonElement;
  private _inBasket: boolean = false;

  constructor (protected events: IEvents, container: HTMLElement) {
    super(events, container);
    this.image = ensureElement<HTMLImageElement>(`.card__image`, this.container);
    this.category = ensureElement<HTMLElement>(`.card__category`, this.container);
    this.cardDescription = ensureElement<HTMLElement>(`.card__text`, this.container);
    this.addToCartButton = ensureElement<HTMLButtonElement>(`.card__button`, this.container);

    this.addToCartButton.addEventListener(`click`, () => {
        if (this._inBasket == false) {
          this.events.emit(`product:addToBasket`, this.currentProduct)
        } else if (this._inBasket == true) {
          this.events.emit(`product:deleteFromBasket`, this.currentProduct)
        }
    })
  }

  render(product: IProduct): HTMLElement {
    this.title.textContent = product.title;
    this.price.textContent = product.price ? `${product.price} синапсов` : `Бесценно`;
    this.currentProduct = product;
    this.cardDescription.textContent = product.description;
    this.setImage(this.image, `${CDN_URL}${product.image}`, product.title);
        this.category.className =`card__category ${categoryMap[product.category as keyof typeof categoryMap]}`;
        this.category.textContent = product.category;
    if (product.price === null) {
      this.addToCartButton.setAttribute(`disabled`, `true`);
      this.addToCartButton.textContent = `Недоступно`;
    } else {
      this.addToCartButton.removeAttribute(`disabled`);
    }
    return this.container;
  }

  set inBasket(value: boolean) {
    this._inBasket = value;
    this.updateButtonText()
  }

  private updateButtonText() {
    this.addToCartButton.textContent = this._inBasket ? `Удалить из корзины` : `Купить`;
  }
}