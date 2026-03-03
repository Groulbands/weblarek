import { Form } from "./Form";
import { IEvents } from "../../base/Events"
import { ensureElement } from "../../../utils/utils"

export class OrderForm extends Form {
  protected paymentOnlineButton: HTMLButtonElement;
  protected paymentOfflineButton: HTMLButtonElement;
  protected addressInputElement: HTMLInputElement;

  constructor (protected events: IEvents, container: HTMLElement) {
    super(events, container);
    this.paymentOnlineButton = ensureElement<HTMLButtonElement>(`[name="card"]`, this.container);
    this.paymentOfflineButton = ensureElement<HTMLButtonElement>(`[name="cash"]`, this.container);
    this.addressInputElement = ensureElement<HTMLInputElement>(`[name="address"]`, this.container);

    this.paymentOnlineButton.classList.add(`button_alt-active`);

    this.paymentOnlineButton.addEventListener(`click`, () => {
      this.events.emit(`paymentButton:card`, {payment: `card`})
      this.paymentOfflineButton.classList.remove(`button_alt-active`);
      this.paymentOnlineButton.classList.add(`button_alt-active`);
    })
    this.paymentOfflineButton.addEventListener(`click`, () => {
      this.events.emit(`paymentButton:cash`, {payment: `cash`})
      this.paymentOnlineButton.classList.remove(`button_alt-active`);
      this.paymentOfflineButton.classList.add(`button_alt-active`);
    })
    this.addressInputElement.addEventListener(`input`, () => {
      setTimeout(() => {
        this.events.emit(`input:input`, {address: this.addressInputElement.value})
      }, 3000)
    })
  }
}