import { Component } from "../base/Component"
import { IEvents } from "../base/Events"
import { ensureElement } from "../../utils/utils"


interface IOrderSuccess {
  cost: number
}

export class OrderSuccess extends Component<IOrderSuccess> {
  protected orderSuccessButton: HTMLButtonElement;
  protected orderSuccessDesc: HTMLElement;

  constructor (protected events: IEvents, container: HTMLElement) {
    super(container);
    
    this.orderSuccessButton = ensureElement<HTMLButtonElement>(`.order-success__close`, this.container);
    this.orderSuccessDesc = ensureElement<HTMLElement>(`.order-success__description`, this.container);

    this.orderSuccessButton.addEventListener(`click`, () => {
      this.events.emit(`orderSuccess:close`)
    });
  }

  set cost(value: number) {
    this.orderSuccessDesc.textContent.replace(/\d+/, `${value}`);
  }
}