import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../data/models/article.model';

@Component({
  selector: 'app-article-detail',
  imports: [RouterLink],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.css',
})
export class ArticleDetail {

  readonly article = input.required<Article>();

  readonly editable = input(false);

  readonly edit = output<Article>();

  readonly remove = output<Article>();

}
