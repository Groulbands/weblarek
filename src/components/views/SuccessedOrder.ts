import { Component } from "../base/Component"
import { IEvents } from "../base/Events"
import { ensureElement } from "../../utils/utils"
import { IOrderRequest } from "../../types";


export class OrderSuccess extends Component<IOrderRequest> {
  protected orderSuccessTitle: HTMLElement;
  protected orderSuccessButton: HTMLButtonElement;
  protected orderSuccessDesc: HTMLElement;

  constructor (protected events: IEvents, container: HTMLElement) {
    super(container);
    
    this.orderSuccessTitle  = ensureElement<HTMLElement>(`.order-success__title`, this.container)
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