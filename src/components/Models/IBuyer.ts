import { IBuyer, TPayment } from "../../types";

export class Buyer{
  private payment: TPayment = '';
  private address: string = '';
  private email: string = '';
  private phone: string = '';
  
  setBuyerInfo({payment, address, email, phone}: IBuyer) : void {
      if ((this.payment !== payment) && (payment !== '')) {
        this.payment = payment;
      }
      if ((this.address !== address) && (address !== '')) {
        this.address = address;
      }
      if ((this.email !== email) && (email !== '')) {
        this.email = email;
      }
      if ((this.phone !== phone) && (phone !== '')) {
        this.phone = phone;
      }
  }

  getBuyerInfo(): Object {
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
  }

  validateBuyerInfo({payment, address, email, phone}: IBuyer): Object {
    let validatedInfo: {[key: string]: any }= {};
    let emailValidator = new RegExp('/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/');
    let phoneValidator = new RegExp('/\+7\d{10}/');

    if (payment === ''){
      validatedInfo.payment = 'Не выбран вид оплаты';
    }
    if (address === ''){
      validatedInfo.address = 'Не выбран адрес доставки';
    }
    if (email === '') {
      validatedInfo.email = 'Укажите емэил'
    } else if (!emailValidator.test(String(email).toLocaleLowerCase())) {
      validatedInfo.email = 'емэил введен некорректно'
    }
    if (phone === '') {
      validatedInfo.phone = 'Укажите телефон'
    } else if (!phoneValidator.test(String(phone))) {
      validatedInfo.phone = 'Телефон введен некорректно'
    }
    return validatedInfo;
  };

};