import { Component } from "../base/Component"
import { IEvents } from "../base/Events"
import { ensureElement } from "../../utils/utils"

interface ICard {
  title: HTMLElement,
  price: HTMLElement
}

export class CardCatalog extends Component<ICard> {
  protected buttonCardCatalog: HTMLButtonElement;

  constructor (protected events: IEvents, container: HTMLElement) {
    super(container);

    this.buttonCardCatalog = ensureElement<HTMLButtonElement>(`.gallery__item`, this.container);

    this.buttonCardCatalog.addEventListener(`click`, () => {
      this.events.emit(`cardCatalog:open`)
    })
  }
}

export class CardPreview extends Component<ICard> {
  protected addToCartButton: HTMLButtonElement;

  constructor (protected events: IEvents, container: HTMLElement) {
    super(container);

    this.addToCartButton = ensureElement<HTMLButtonElement>(`.card__button`, this.container);

    this.addToCartButton.addEventListener(`click`, () => {
      this.events.emit(`card:addToBasket`)
    })
  }
}

export class cardBasket extends Component<ICard> {
  protected deleteFromCartButton: HTMLButtonElement;

  constructor (protected events: IEvents, container: HTMLElement) {
    super(container);

    this.deleteFromCartButton = ensureElement<HTMLButtonElement>(`.basket__item-delete`, this.container);

    this.deleteFromCartButton.addEventListener(`click`, () => {
      this.events.emit(`card:deletoFromBasket`)
    })
  }
}