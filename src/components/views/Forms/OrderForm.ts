import { Form } from "./Form";
import { IEvents } from "../../base/Events"
import { ensureElement } from "../../../utils/utils"

export class OrderForm extends Form {
  protected _paymentOnlineButton: HTMLButtonElement;
  protected _paymentOfflineButton: HTMLButtonElement;
  protected _addressInputElement: HTMLInputElement;

  constructor (protected events: IEvents, container: HTMLElement) {
    super(events, container);
    this._paymentOnlineButton = ensureElement<HTMLButtonElement>(`[name="card"]`, this.container);
    this._paymentOfflineButton = ensureElement<HTMLButtonElement>(`[name="cash"]`, this.container);
    this._addressInputElement = ensureElement<HTMLInputElement>(`[name="address"]`, this.container);

    this._paymentOnlineButton.classList.add(`button_alt-active`);

    this._paymentOnlineButton.addEventListener(`click`, () => {
      this.events.emit(`paymentButton:card`)
    })
    this._paymentOfflineButton.addEventListener(`click`, () => {
      this.events.emit(`paymentButton:cash`)
    })
    this._addressInputElement.addEventListener(`input`, () => {
        this.events.emit(`input:input`, {address: this._addressInputElement.value})
    })
  }

  set payment(value: string) {
    if (value == `card`) {
      this.setPaymentOnlineButton;
    } else if (value == `cash`) {
      this.setPaymentOfflineButton;
    } else {
      this._paymentOfflineButton.classList.remove(`button_alt-active`);
      this._paymentOnlineButton.classList.remove(`button_alt-active`);
    }
  }
  setPaymentOnlineButton() {
    this._paymentOfflineButton.classList.remove(`button_alt-active`);
    this._paymentOnlineButton.classList.add(`button_alt-active`);
  }

  setPaymentOfflineButton() {{
    this._paymentOnlineButton.classList.remove(`button_alt-active`);
    this._paymentOfflineButton.classList.add(`button_alt-active`);
  }
  }

  set address(value: string) {
    this._addressInputElement.value = value;
  }
}