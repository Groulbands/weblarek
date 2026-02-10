import { IProduct, IOrderRequest, IOrderResponse } from "../../types";
import { Api } from "../base/Api";

export class ApiService extends Api {
  constructor(baseUrl: string, options: RequestInit = {}) {
    super(baseUrl, options);
  }

  async fetchProducts(): Promise<IProduct[]>{
    const response = await this.get<{ items: IProduct[] }>(`/product`);
    return response.items;
  }

  async sendOrder(order: IOrderRequest): Promise<IOrderResponse> {
    return await this.post<IOrderResponse>(`/order/`, order);
  }
}