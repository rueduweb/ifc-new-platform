import { Component, inject, OnInit } from '@angular/core';
import { Articles } from '../../data/services/articles';
import { ArticleCard } from '../../ui/article-card/article-card';

@Component({
  selector: 'app-article',
  imports: [ArticleCard],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class Article implements OnInit {
  readonly articlesService = inject(Articles);

  ngOnInit(): void {
    this.articlesService.loadArticles();
  }
  onEdit(event: any) {
    event.preventDefault();
  }
  onDelete(event: any) {
    event.preventDefault();
  }
}
