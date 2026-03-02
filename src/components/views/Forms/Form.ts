import { Component } from "../../base/Component"
import { IEvents } from "../../base/Events"
import { cloneTemplate, ensureElement } from "../../../utils/utils"

export abstract class Form extends Component<HTMLElement> {
  protected orderFormButton: HTMLButtonElement;
  protected formErrorsElement: HTMLElement;
  

  constructor (protected events: IEvents, container: HTMLElement) {
    super(container);
    this.orderFormButton = ensureElement<HTMLButtonElement>(`button[type="submit"]`, this.container);
    this.formErrorsElement = ensureElement<HTMLElement>(`.form__errors`, this.container);

    this.orderFormButton.addEventListener(`click`, () => {
      this.events.emit(`orderButton:next`)
    })
  }

  set formErrors(errors: string[]) {
    if (errors.length > 0 && errors) {
      this.events.emit(`formErrors:true`)
      this.formErrorsElement.textContent = errors.join(', ');
      this.orderFormButton.setAttribute(`disable`, `true`);
    } else { 
      this.events.emit(`formErrors:false`)
      this.formErrorsElement.textContent = ``
      this.orderFormButton.setAttribute(`disable`, `false`);
    }
  }
}