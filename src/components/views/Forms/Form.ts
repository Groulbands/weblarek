import { Component } from "../../base/Component"
import { IEvents } from "../../base/Events"
import { ensureElement } from "../../../utils/utils"

export abstract class Form extends Component<HTMLElement> {
  protected orderFormButton: HTMLButtonElement;
  protected formErrorsElement: HTMLElement;
  

  constructor (protected events: IEvents, container: HTMLElement) {
    super(container);
    this.orderFormButton = ensureElement<HTMLButtonElement>(`button[type="submit"]`, this.container);
    this.formErrorsElement = ensureElement<HTMLElement>(`.form__errors`, this.container);

    this.container.addEventListener(`submit`, (e) => {
      e.preventDefault()
      this.events.emit(`orderButton:next`, this)
    })
  }

  set formErrors(errors: string | undefined) {
    if (errors && errors.length > 0) {
      this.formErrorsElement.textContent = errors;
      this.orderFormButton.setAttribute(`disabled`, `true`);
    } else { 
      this.formErrorsElement.textContent = ``
      this.orderFormButton.removeAttribute(`disabled`);
    }
  }
}