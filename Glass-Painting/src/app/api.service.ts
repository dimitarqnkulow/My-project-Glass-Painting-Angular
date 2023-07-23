import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from './types/article';
import { environment } from 'src/environments/environment.development';

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
}
