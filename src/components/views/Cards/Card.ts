import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";
import { cloneTemplate, ensureElement } from "../../../utils/utils";
import { IProduct } from "../../../types";
import { CDN_URL } from "../../../utils/constants";
import { categoryMap } from "../../../utils/constants";

export abstract class Card extends Component<IProduct> {
 protected title: HTMLElement;
 protected image: HTMLImageElement;
 protected category: HTMLElement;
 protected price: HTMLElement;

  constructor(protected events: IEvents, protected template: string | HTMLTemplateElement) {
    super(cloneTemplate<HTMLElement>(template))
    this.title = ensureElement<HTMLElement>(`.card__title`, this.container);
    this.image = ensureElement<HTMLImageElement>(`.card__image`, this.container);
    this.category = ensureElement<HTMLElement>(`.card__category`, this.container);
    this.price = ensureElement<HTMLElement>(`.card__price`, this.container);
  }

  protected renderBase(product: IProduct): void {
    this.title.textContent = product.title;
    this.setImage(this.image, `${CDN_URL}${product.image}`, product.title);
    this.category.className =`card__category ${categoryMap[product.category as keyof typeof categoryMap]}`;
    this.category.textContent = product.category;
    this.price.textContent = product.price ? `${product.price} синапсов` : `Бесценно`;
  }
}