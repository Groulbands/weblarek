//import './scss/styles.scss';

import { Cart } from './components/Models/Cart';
import { Products } from './components/Models/Catalog';
import { Buyer } from './components/Models/IBuyer';

import { apiProducts } from './utils/data';
import { ApiService } from './components/Models/ApiService';
import { API_URL } from './utils/constants';

const productsModel = new Products();
productsModel.setItems(apiProducts.items); 
console.log(`Массив товаров из каталога: `, productsModel.getItems()) 
productsModel.setItem(apiProducts.items[2])
console.log(`Выбранный товар для подробного отображения: `, productsModel.getItem())
console.log(`Товар, найденный по id: `, productsModel.getItemById(`c101ab44-ed99-4a54-990d-47aa2bb4e7d9`)) 

const cartModel = new Cart();
cartModel.addProduct(apiProducts.items[3]);
cartModel.addProduct(apiProducts.items[2]);
console.log('Массив товаров из корзины: ', cartModel.getProducts());
console.log('Общая сумма товаров в корзине: ', cartModel.getTotalPrice());
console.log('Общее количество товаров в корзине: ', cartModel.getTotalCount());
console.log('Есть ли товар в корзине: ', cartModel.findProduct(apiProducts.items[3].id));
cartModel.deleteProduct(apiProducts.items[3]);
console.log('Массив товаров из корзины после удаления одного из них: ', cartModel.getProducts());
cartModel.clearCart();
console.log('Массив товаров из корзины после ее очистки: ', cartModel.getProducts());

const buyerModel = new Buyer();
buyerModel.setBuyerInfo({payment:`cash`})
console.log('Данные о покупателе: ', buyerModel.getBuyerInfo());
console.log('Валидация данных покупателя', buyerModel.validateBuyerInfo())
buyerModel.clearBuyerInfo();
console.log('Данные о покупателе после очистки: ', buyerModel.getBuyerInfo());
buyerModel.setBuyerInfo({
  payment:`cash`,
  address:`Pushkina st.`,
  email:`ivanov@example.com`,
  phone:`+71234567890`
})
console.log('Данные о покупателе: ', buyerModel.getBuyerInfo());
console.log('Валидация данных покупателя', buyerModel.validateBuyerInfo())


const apiService = new ApiService(API_URL);

apiService.fetchProducts().then(products => {
  productsModel.setItems(products)
  console.log(`Массив товаров из каталога сервера: `, productsModel.getItems()) 
})
.catch(error => console.log(`Ошибка:`, error)) 
