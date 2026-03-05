import { Component } from "../base/Component"
import { IEvents } from "../base/Events"
import { ensureElement } from "../../utils/utils"

interface IBasket {
  items: HTMLElement[];
  total: number;
}

export class Basket extends Component<IBasket> {
  protected basketTitle: HTMLElement;
  protected basketListElement: HTMLUListElement;
  protected orderButton: HTMLButtonElement;
  protected basketPrice: HTMLElement;

  constructor (protected events:IEvents, container: HTMLElement) {
    super(container)

    this.basketTitle = ensureElement<HTMLElement>(`.modal__title`, this.container)
    this.basketListElement = ensureElement<HTMLUListElement>(`.basket__list`, this.container);
    this.orderButton = ensureElement<HTMLButtonElement>(`.basket__button`, this.container);
    this.basketPrice = ensureElement<HTMLElement>(`.basket__price`, this.container)
    this.items = [];

    this.orderButton.addEventListener(`click`, () => {
      this.events.emit(`basket:confirm`)
    })
  }

  set items(products: HTMLElement[] | undefined | null) {
    if (!products || products.length === 0) {
      this.basketListElement.replaceChildren();
      this.orderButton.setAttribute(`disabled`, `true`);
    } else {
      this.basketListElement.replaceChildren(...products);
      this.orderButton.removeAttribute(`disabled`);
    }
  }
  set total(total: number) {
    this.basketPrice.textContent = `${total} синапсов`
  }
}