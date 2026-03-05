import { Form } from "./Form";
import { IEvents } from "../../base/Events"
import { ensureElement } from "../../../utils/utils"


export class ContactsForm extends Form {
  protected _emailInputElement: HTMLInputElement;
  protected _phoneInputElement: HTMLInputElement;

  constructor (events: IEvents, container: HTMLElement) {
    super(events, container);
    this._emailInputElement = ensureElement<HTMLInputElement>(`[name="email"]`, this.container);
    this._phoneInputElement = ensureElement<HTMLInputElement>(`[name="phone"]`, this.container);

    this._emailInputElement.addEventListener(`input`, () => {
        this.events.emit(`input:input`, {email: this._emailInputElement.value, phone: this._phoneInputElement.value})
    })
    this._phoneInputElement.addEventListener(`input`, () => {
        this.events.emit(`input:input`, {email: this._emailInputElement.value, phone: this._phoneInputElement.value})
    })
  }

  set email(value: string) {
    this._emailInputElement.value = value;
  }
  set phone(value: string) {
    this._phoneInputElement.value = value;
  }
}