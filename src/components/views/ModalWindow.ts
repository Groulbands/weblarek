import { Component } from "../base/Component"
import { IEvents } from "../base/Events"
import { ensureElement } from "../../utils/utils"


interface IModal {
  content: HTMLElement[];
}


export class ModalWindow extends Component<IModal> {
  protected contentElement: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor (protected events: IEvents, container: HTMLElement) {
    super(container);

    this.contentElement = ensureElement<HTMLElement>(`.modal__content`, this.container);
    this.closeButton = ensureElement<HTMLButtonElement>(`.modal__close`, this.container);

    this.closeButton.addEventListener(`click`, () => {
      this.events.emit(`modalWindow:close`)
    });
  }

  set content(items: HTMLElement[]) {
    this.contentElement.replaceChildren(...items)
  }
}