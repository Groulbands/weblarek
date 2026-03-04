import './scss/styles.scss';

import { Cart } from './components/Models/Cart';
import { Products } from './components/Models/Catalog';
import { Buyer } from './components/Models/Buyer';
import { EventEmitter } from './components/base/Events';

import { CardBasket } from './components/views/Cards/CardBasket'; 
import { CardCatalog } from './components/views/Cards/CardCatalog'; 
import { CardPreview } from './components/views/Cards/CardPreview'; 
import { ContactsForm } from './components/views/Forms/ContactForm'; 
import { OrderForm } from './components/views/Forms/OrderForm'; 
import { Basket } from './components/views/Basket'; 
import { Gallery } from './components/views/Gallery'; 
import { Header } from './components/views/Header'; 
import { ModalWindow } from './components/views/ModalWindow'; 
import { OrderSuccess } from './components/views/SuccessedOrder'; 

import { ApiService } from './components/Models/ApiService';
import { API_URL } from './utils/constants';
import { ensureElement, cloneTemplate } from './utils/utils';
import { IBuyer, IProduct } from './types';

// Модели данных
const events = new EventEmitter();
const productsModel = new Products(events);
const cartModel = new Cart(events);
const buyerModel = new Buyer(events);
const apiService = new ApiService(API_URL);

// Элементы и темплейты
const headerElement = ensureElement<HTMLElement>(`.header`);
const galleryElement = ensureElement<HTMLElement>(`.gallery`);
const modalWindowElement = ensureElement<HTMLElement>(`.modal`);
const orderSuccessTemplate = ensureElement<HTMLTemplateElement>(`#success`);
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>(`#card-catalog`);
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>(`#card-preview`);
const cardBasketTemplate = ensureElement<HTMLTemplateElement>(`#card-basket`);
const basketTemplate= ensureElement<HTMLTemplateElement>(`#basket`);
const orderFormTemplate = ensureElement<HTMLTemplateElement>(`#order`);
const contactsFormTemplate = ensureElement<HTMLTemplateElement>(`#contacts`);

// Классы представления

const header = new Header(events, headerElement);
const gallery = new Gallery(galleryElement);
const modalWindow = new ModalWindow(events, modalWindowElement);
const orderSuccess = new OrderSuccess(events, cloneTemplate(orderSuccessTemplate));
const basket = new Basket(events, cloneTemplate(basketTemplate));
const orderForm = new OrderForm(events, cloneTemplate(orderFormTemplate));
const contactsForm = new ContactsForm(events, cloneTemplate(contactsFormTemplate));
const cardPreview = new CardPreview(events);

apiService.fetchProducts().then(products => {
  productsModel.setItems(products)
})
.catch(error => console.log(`Ошибка:`, error)) 

events.on(`catalog:changed`, () => {
  let products = productsModel.getItems();
  let cardArray = products.map(product => {
    let card = new CardCatalog(events);
    return card.render(product);
  })
  gallery.render({catalog: cardArray})
})

events.on(`basket:open`, () => {
  modalWindow.open(basket.render({
    items: cartModel.getProducts().map((product, index) => {
      let card = new CardBasket(events);
      return card.render({...product, index: index+=1});
    }),
    total: cartModel.getTotalPrice()
  }));
})

events.on(`basket:confirm`, () => {
  if (buyerModel.validateBuyerInfo().payment && buyerModel.validateBuyerInfo().address) {
    orderForm.formErrors = `${buyerModel.validateBuyerInfo().payment}, ` + `${buyerModel.validateBuyerInfo().address?.toLowerCase()}`
  }
  modalWindow.content = orderForm.render();
})

events.on(`basket:changed`, () => {
  basket.render({
    items: cartModel.getProducts().map((product, index) => {
      let card = new CardBasket(events);
      return card.render({...product, index: index+=1});
    }),
    total: cartModel.getTotalPrice()
  });
  header.render({counter: cartModel.getTotalCount()});
})

events.on(`product:select`, (product: IProduct) => {
  productsModel.setItem(product);
  if (cartModel.findProduct(product.id)) {
    cardPreview.inBasket = true;
    modalWindow.open(cardPreview.render(product))
  } else {
    cardPreview.inBasket = false;
    modalWindow.open(cardPreview.render(product))
  }
})

events.on(`selectedProduct:changed`, (product: IProduct) => {
  if (cartModel.findProduct(product.id)) {
    cardPreview.inBasket = true;
    modalWindow.open(cardPreview.render(product))
  } else {
    cardPreview.inBasket = false;
    modalWindow.open(cardPreview.render(product))
  }
})

events.on(`product:addToBasket`, (product: IProduct) => {
  cartModel.addProduct(product)
  cardPreview.inBasket = true;
})

events.on(`product:deleteFromBasket`, (product: IProduct) => {
  cartModel.deleteProduct(product);
  cardPreview.inBasket = false;
})

events.on(`paymentButton:card`, (data: Partial<IBuyer>) => {
  buyerModel.setBuyerInfo(data);
})

events.on(`paymentButton:cash`, (data: Partial<IBuyer>) => {
  buyerModel.setBuyerInfo(data);
})

events.on(`input:input`, (data: Partial<IBuyer>) => {
  buyerModel.setBuyerInfo(data)
})

events.on(`buyerInfo:update`, () => {
  if (buyerModel.validateBuyerInfo().payment && buyerModel.validateBuyerInfo().address){
    orderForm.formErrors = `${buyerModel.validateBuyerInfo().payment}, ` + `${buyerModel.validateBuyerInfo().address?.toLowerCase()}`
  } else if (buyerModel.validateBuyerInfo().payment) {
    orderForm.formErrors = `${buyerModel.validateBuyerInfo().payment}`;
  } else if (buyerModel.validateBuyerInfo().address) {
    orderForm.formErrors = `${buyerModel.validateBuyerInfo().address}`;
  } else if (!buyerModel.validateBuyerInfo().address && !buyerModel.validateBuyerInfo().address) {
    orderForm.formErrors = ``;
  }
  if (buyerModel.validateBuyerInfo().email && buyerModel.validateBuyerInfo().phone) {
    contactsForm.formErrors = `${buyerModel.validateBuyerInfo().email}, ` + `${buyerModel.validateBuyerInfo().phone?.toLowerCase()}`
  } else if (buyerModel.validateBuyerInfo().email) {
    contactsForm.formErrors = `${buyerModel.validateBuyerInfo().email}`
  } else if (buyerModel.validateBuyerInfo().phone) {
    contactsForm.formErrors = `${buyerModel.validateBuyerInfo().phone}`
  } else if (!buyerModel.validateBuyerInfo().email && !buyerModel.validateBuyerInfo().phone) {
    contactsForm.formErrors = ``;
  }
})

events.on(`orderButton:next`, (container: OrderForm | ContactsForm) => {
  if (container == orderForm) {
      ensureElement<HTMLFormElement>(`form[name=order]`).reset();
      modalWindow.content = contactsForm.render();
  } else if (container == contactsForm) {
    if (buyerModel.validateBuyerInfo().email && buyerModel.validateBuyerInfo().phone) {
      contactsForm.formErrors = `${buyerModel.validateBuyerInfo().email}` + `, ${buyerModel.validateBuyerInfo().phone?.toLowerCase()}`;
    }
    apiService.sendOrder({...buyerModel.getBuyerInfo(),  
      total: cartModel.getTotalPrice(), 
      items: cartModel.getProducts().map(product => {
      return product.id;
    })}).then(resolve => {
      ensureElement<HTMLFormElement>(`form[name=contacts]`).reset()
      orderSuccess.total = resolve.total;
      modalWindow.content = orderSuccess.render();
      cartModel.clearCart();
      buyerModel.clearBuyerInfo();
    }).catch(error => contactsForm.formErrors = error)
  }
})

events.on(`orderSuccess:close`, () => {
  modalWindow.close();
})