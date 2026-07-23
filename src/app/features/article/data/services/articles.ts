import { computed, inject, Service, signal } from '@angular/core';
import { ArticlesApi } from './articles-api';
import { Article, ArticlesState } from '../models/article.model';

@Service()
export class Articles {
  private readonly api = inject(ArticlesApi);

  private readonly state = signal<ArticlesState>({ // the state stays in the signal
    articles: [],
    selectedArticle: null,
    loading: false,
    error: null
  });

  // Selectors
  readonly articles = computed(() => this.state().articles);

  readonly loading = computed(() => this.state().loading);

  readonly selectedArticle = computed(() => this.state().selectedArticle);

  readonly error = computed(() => this.state().error);

  readonly count = computed(() => this.articles().length);

  readonly sortedArticles = computed(() =>
    [...this.articles()]
        .sort((a,b)=>a.title.localeCompare(b.title))
  );

  // Actions
  loadArticles(): void {
    this.startLoading();
    this.api.getAll().subscribe({
      next: articles => {
        this.patchState({
          articles,
          loading: false
        });
      },
      error: () => this.setError('Error server occured.')
    });
  }

  loadOne(id: number): void {
    this.startLoading();
    this.api.getOneById(id).subscribe({
      next: article => {
        this.patchState(state => {
          const index = state.articles.findIndex(a => a.id === article.id);

          const articles = index === -1 ? [...state.articles, article] : state.articles.map(a =>
            a.id === article.id ? article : a
          );

          return {
            articles,
            selectedArticle: article,
            loading: false
          };
        });
      },
      error: () => this.setError('Error server occured.')
    });
  }

  create(article: Omit<Article,'id'>): void {
    this.startLoading();
    this.api.create(article).subscribe({
      next: article => {
        this.patchState(state => ({
          articles: [...state.articles, article],
          selectedArticle: article,
          loading: false
        }));
      },
      error: () => this.setError('Error server occured.')
    });
  }

  update(article: Article): void {
    this.startLoading();
    this.api.update(article).subscribe({
      next: article => {
        this.patchState(state => ({
          articles: state.articles.map(a => a.id === article.id ? article : a),
          selectedArticle: state.selectedArticle?.id === article.id ? article : state.selectedArticle,
          loading: false
        }));
      },
      error: () => this.setError('Error server occured.')
    });
  }

  delete(id: number): void {
    this.startLoading();
    this.api.delete(id).subscribe({
      next: () => {
      this.patchState(state => ({
        articles: state.articles.filter(a => a.id !== id),
        selectedArticle: state.selectedArticle?.id === id ? null : state.selectedArticle,
        loading: false
      }))
    },
      error: () => this.setError('Error server occured.')
    });
  }

  selectArticle(article: Article | null): void {
    this.patchState({
      selectedArticle: article
    });
  }

  clearSelection(): void {
    this.patchState({
      selectedArticle: null
    });
  }

  // function to simulate the patchState() of @ngrx/signals
  private patchState(
    patch:
      | Partial<ArticlesState>
      | ((state: ArticlesState) => Partial<ArticlesState>)
  ) {
    this.state.update(state => ({
      ...state,
      ...(typeof patch === 'function' ? patch(state) : patch)
    }));
  }
  // Helpers
  private startLoading() {
    this.patchState({
      loading: true,
      error: null
    });
  }

  private setError(message: string) {
    this.patchState({
      loading: false,
      error: message
    });
  }

}
