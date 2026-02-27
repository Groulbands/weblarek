import { Component } from "../base/Component"
import { IEvents } from "../base/Events"
import { ensureElement } from "../../utils/utils"

interface IBasket {
  items: HTMLElement[]
}

export class Basket extends Component<IBasket> {
  protected orderButton: HTMLButtonElement;
  protected basketPrice: HTMLElement;

  constructor (protected events:IEvents, container: HTMLElement) {
    super(container)

    this.orderButton = ensureElement<HTMLButtonElement>(`.basket__button`, this.container);
    this.basketPrice = ensureElement<HTMLElement>(`.basket__price`, this.container)

    this.orderButton.addEventListener(`click`, () => {
      this.events.emit(`basket:confirm`)
    })
  }

  set price(value: number) {
    this.basketPrice.textContent.replace(/\d+/, `${value}`);
  }
}