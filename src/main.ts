//import './scss/styles.scss';

import { Cart } from './components/Models/Cart';
import { Products } from './components/Models/Catalog';
import { Buyer } from './components/Models/IBuyer';

import { apiProducts } from './utils/data';
import { ApiService } from './components/base/ApiService';
import { API_URL } from './utils/constants';

const catalogModel = new Products();
const apiService = new ApiService(API_URL);

apiService.fetchProducts().then(products => {
  console.log(products)
  catalogModel.setItems(products)
  console.log(catalogModel.getItems())
})
