import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Service()
export class ArticlesApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/api/articles';

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  getOneById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  create(article: Omit<Article, 'id'>): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  update(article: Article): Observable<Article> {
    return this.http.put<Article>(
      `${this.apiUrl}/${article.id}`,
      article
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
