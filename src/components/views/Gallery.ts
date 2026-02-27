import { Component } from "../base/Component"
import { IEvents } from "../base/Events"
import { ensureElement } from "../../utils/utils"

interface IGallery {
  catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  protected catalogElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.catalogElement = ensureElement<HTMLElement>(`.gallery`, this.container)
    this.catalogElement.addEventListener(`change`, () => {
      this.events.emit(`catalog:changed`)
    })
  }

  set catalog(items: HTMLElement[]) {
    this.catalogElement.replaceChildren(...items);
  }
}