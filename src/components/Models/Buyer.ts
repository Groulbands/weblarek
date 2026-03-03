import { IBuyer, TPayment } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer{
  private payment: TPayment = 'card';
  private address: string = '';
  private email: string = '';
  private phone: string = '';

  constructor(protected events: IEvents) {}
  
  setBuyerInfo(data: Partial<IBuyer>) : void {
      if (data.payment !== undefined) {
        this.events.emit(`buyerInfo:update`)
        this.payment = data.payment;
      }
      if (data.address !== undefined) {
        this.events.emit(`buyerInfo:update`)
        this.address = data.address;
      }
      if (data.email !== undefined) {
        this.events.emit(`buyerInfo:update`)
        this.email = data.email;
      }
      if (data.phone !== undefined) {
        this.events.emit(`buyerInfo:update`)
        this.phone = data.phone;
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
    this.events.emit(`buyerInfo:clear`)
    this.payment = '';
    this.address = '';
    this.email = '';
    this.phone = '';
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

    this.events.emit(`buyerInfo:validated`);

    return validatedInfo;
  };

};