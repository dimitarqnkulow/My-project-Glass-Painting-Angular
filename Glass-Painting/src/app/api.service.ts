import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from './types/article';
import { environment } from 'src/environments/environment.development';
import { Order } from './types/order';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllItems() {
    const { apiURL } = environment;
    return this.http.get<Article[]>(`${apiURL}/data/items`);
  }

  getArticle(articleId: string) {
    const { apiURL } = environment;
    return this.http.get<Article>(`${apiURL}/data/items/${articleId}`);
  }
  getTrending() {
    const { apiURL } = environment;
    return this.http.get<Article[]>(`${apiURL}/data/items/trending`);
  }

  orderArticle(
    name: string,
    sureName: string,
    phone: string,
    description: string
  ) {
    const { apiURL } = environment;
    return this.http
      .post<Order>(`${apiURL}/orders`, {
        name: name,
        sureName: sureName,
        phone: phone,
        description: description,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
