import { Form } from "./Form";
import { IEvents } from "../../base/Events"
import { ensureElement } from "../../../utils/utils"


export class ContactsForm extends Form {
  protected emailInputElement: HTMLInputElement;
  protected phoneInputElement: HTMLInputElement;

  constructor (events: IEvents, container: HTMLElement) {
    super(events, container);
    this.emailInputElement = ensureElement<HTMLInputElement>(`[name="email"]`, this.container);
    this.phoneInputElement = ensureElement<HTMLInputElement>(`[name="phone"]`, this.container);

    this.emailInputElement.addEventListener(`input`, () => {
        this.events.emit(`input:input`, {email: this.emailInputElement.value, phone: this.phoneInputElement.value})
    })
    this.phoneInputElement.addEventListener(`input`, () => {
        this.events.emit(`input:input`, {email: this.emailInputElement.value, phone: this.phoneInputElement.value})
    })
  }
}