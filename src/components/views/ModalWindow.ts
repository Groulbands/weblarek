import { Component } from "../base/Component"
import { IEvents } from "../base/Events"
import { ensureElement } from "../../utils/utils"


export class ModalWindow extends Component<HTMLElement> {
  protected modalContentElement: HTMLElement;
  protected modalCloseButton: HTMLButtonElement;

  constructor (protected events: IEvents, container: HTMLElement) {
    super(container);

    this.modalContentElement = ensureElement<HTMLElement>(`.modal__content`, this.container);
    this.modalCloseButton = ensureElement<HTMLButtonElement>(`.modal__close`, this.container);

    this.modalCloseButton.addEventListener(`click`, () => {
      this.close()
    });

    this.container.addEventListener('click', (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        this.close()
      }
    });
  }

  set content(content: HTMLElement) {
    this.modalContentElement.replaceChildren(content)
  }

  open (content: HTMLElement) {
    this.container.classList.add(`modal_active`);
    this.modalContentElement.replaceChildren(content)
  }

  close () {
    this.container.classList.remove(`modal_active`);
    this.events.emit(`modalWindow:close`)
  }
}