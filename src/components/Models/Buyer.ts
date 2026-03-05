import { IBuyer, TPayment } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer{
  private payment: TPayment = '';
  private address: string = '';
  private email: string = '';
  private phone: string = '';

  constructor(protected events: IEvents) {}
  
  setBuyerInfo(data: Partial<IBuyer>) : void {
      if (data.payment !== undefined) {
        this.payment = data.payment;
        this.events.emit(`buyerInfo:update`)
      }
      if (data.address !== undefined) {
        this.address = data.address;
        this.events.emit(`buyerInfo:update`)
      }
      if (data.email !== undefined) {
        this.email = data.email;
        this.events.emit(`buyerInfo:update`)
      }
      if (data.phone !== undefined) {
        this.phone = data.phone;
        this.events.emit(`buyerInfo:update`)
      }
  }

  getBuyerInfo(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    }
  }

  clearBuyerInfo(): void {
    this.payment = '';
    this.address = '';
    this.email = '';
    this.phone = '';
    this.events.emit(`buyerInfo:clear`)
  }

  validateBuyerInfo(): Partial<Record<keyof IBuyer, string>> {
    const validatedInfo: Partial<Record<keyof IBuyer, string>>= {};

    if (this.payment === ''){
      validatedInfo.payment = 'Не выбран вид оплаты';
    }
    if (this.address === ''){
      validatedInfo.address = 'Не выбран адрес доставки';
    }
    if (this.email === '') {
      validatedInfo.email = 'Укажите емэил'
    }
    if (this.phone === '') {
      validatedInfo.phone = 'Укажите телефон'
    }
    return validatedInfo;
  };

};