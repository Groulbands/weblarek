import { Component } from "../base/Component"
import { ensureElement } from "../../utils/utils"

interface IGallery {
  catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> {

  constructor(container: HTMLElement) {
    super(container)
  }

  set catalog(items: HTMLElement[]) {
    this.container.replaceChildren(...items);
  }
}