import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";
import { IProduct } from "../../../types";

export abstract class Card extends Component<IProduct> {
 protected title: HTMLElement;
 protected price: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)
    this.title = ensureElement<HTMLElement>(`.card__title`, this.container);
    this.price = ensureElement<HTMLElement>(`.card__price`, this.container);
  }
}