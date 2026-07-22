import { Component, inject, OnInit } from '@angular/core';
import { Articles } from '../../data/services/articles';

@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class Article implements OnInit {
  readonly articlesService = inject(Articles);

  ngOnInit(): void {
    this.articlesService.loadArticles();
  }
}
