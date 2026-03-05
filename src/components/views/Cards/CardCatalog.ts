import { IEvents } from "../../base/Events";
import { Card } from "./Card";
import { IProduct } from "../../../types";
import { cloneTemplate, ensureElement } from "../../../utils/utils";
import { categoryMap, CDN_URL } from "../../../utils/constants";


export class CardCatalog extends Card {
  protected image: HTMLImageElement;
  protected category: HTMLElement;
  protected currentProduct?: IProduct;

  constructor (protected events: IEvents, template: HTMLTemplateElement) {
    super(events, cloneTemplate(template));
    this.image = ensureElement<HTMLImageElement>(`.card__image`, this.container);
    this.category = ensureElement<HTMLElement>(`.card__category`, this.container);


    this.container.addEventListener(`click`, () => {
          this.events.emit(`product:select`, this.currentProduct)
      })

  }

  render(product: IProduct): HTMLElement {
    this.title.textContent = product.title;
    this.price.textContent = product.price ? `${product.price} синапсов` : `Бесценно`;
    this.setImage(this.image, `${CDN_URL}${product.image}`, product.title);
    this.category.className =`card__category ${categoryMap[product.category as keyof typeof categoryMap]}`;
    this.category.textContent = product.category;
    this.currentProduct = product;
    return this.container;
  }
}