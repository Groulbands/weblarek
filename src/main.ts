import './scss/styles.scss';

import { Cart } from './components/Models/Cart';
import { Products } from './components/Models/Catalog';
import { Buyer } from './components/Models/Buyer';
import { IEvents, EventEmitter } from './components/base/Events';

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

import { apiProducts } from './utils/data';
import { ApiService } from './components/Models/ApiService';
import { API_URL } from './utils/constants';
import { ensureElement, cloneTemplate } from './utils/utils';
import { IProduct } from './types';

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

apiService.fetchProducts().then(products => {
  productsModel.setItems(products)
  console.log(`Массив товаров из каталога сервера: `, productsModel.getItems()) 
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
  let items = cartModel.getProducts().map((product, index) => {
    let card = new CardBasket(events);
    return card.render({...product, index: index+=1});
  });
  modalWindow.open(basket.render({items: items}));
})

events.on(`basket:clear`, () => {
  cartModel.clearCart();
  basket.render();
})

events.on(`basket:confirm`, () => {
  modalWindow.close();
  modalWindow.open(orderForm.render());
})

events.on(`modalWindow:close`, () => {
})

events.on(`orderButton:next`, () => {
})

events.on(`orderSuccess:close`, () => {
  modalWindow.close();
})

events.on(`product:select`, (product: IProduct) => {
  productsModel.setItem(product);
  let card = new CardPreview(events);
  modalWindow.open(card.render(product))
})

events.on(`product:addToBasket`, (product: IProduct) => {
  cartModel.addProduct(product);
  header.render({counter: cartModel.getTotalCount()})
})

events.on(`product:deleteFromBasket`, (product: IProduct) => {
  console.log(cartModel.getProducts())
  cartModel.deleteProduct(product);
  console.log(cartModel.getProducts())
  basket.render();
  header.render({counter: cartModel.getTotalCount()});
})

events.on(`paymentButton:card`, () => {
})

events.on(`paymentButton:cash`, () => {
})

/*  
 `catalog:changed`,
  `basket:open`,
  `basket:clear`,
  `basket:confirm`,
  `modalWindow:close`,
  `orderButton:next`,
  `orderSuccess:close`,
  `product:select`,
  `product:addToBasket`,
  `product:deleteFromBasket`,
  `paymentButton:card`,
  `paymentButton:cash`,
  `input:input`,
  `formErrors:true`,
  `formErrors:false`,
  `buyerInfo:update`,
  `buyerInfo:clear`,
  `data:received`
]
*/