import { computed, inject, Service, signal } from '@angular/core';
import { ArticlesApi } from './articles-api';
import { Article } from '../models/article.model';

@Service()
export class Articles {
  private readonly api = inject(ArticlesApi);

  private readonly state = signal({ // the state stays in the signal
    articles: [] as Article[],
    loading: false,
    error: null as string | null
  });


  readonly articles = computed(() => this.state().articles);

  readonly loading = computed(() => this.state().loading);

  readonly error = computed(() => this.state().error);

  readonly count = computed(() => this.articles().length);

  readonly sortedArticles = computed(() =>
    [...this.articles()]
        .sort((a,b)=>a.title.localeCompare(b.title))
  );

  // From API Service
  loadArticles(): void {
    this.state.update(state => ({
      ...state,
      loading: true,
      error: null
    }));

    this.api.getAll().subscribe({
      next: articles => {
        this.state.update(state => ({
          ...state,
          articles,
          loading: false
        }));
      },
      error: () => {
        this.state.update(state => ({
          ...state,
          loading: false,
          error: 'Error server occured.'
        }));
      }
    });
  }

  loadOne(id: number): void {

    this.state.update(state => ({
      ...state,
      loading: true,
      error: null
    }));

    this.api.getOneById(id).subscribe({

      next: article => {

        this.state.update(state => {

          const index = state.articles.findIndex(a => a.id === article.id);

          if (index === -1) {
            return {
              ...state,
              articles: [...state.articles, article],
              loading: false
            };
          }

          const articles = [...state.articles];
          articles[index] = article;

          return {
            ...state,
            articles,
            loading: false
          };
        });
      },

      error: () => {
        this.state.update(state => ({
          ...state,
          loading: false,
          error: 'Erreur serveur'
        }));
      }
    });
  }

  create(article: Omit<Article,'id'>): void {
    this.state.update(state => ({
      ...state,
      loading: true,
      error: null
    }));
    this.api.create(article).subscribe({
    next: article => {
      this.state.update(state => ({
      ...state,
      articles: [...state.articles, article],
      loading: false
      }));
    },
    error: () => {
      this.state.update(state => ({
          ...state,
          loading: false,
          error: 'Error server occured.'
        }));
      }
    });
  }

  update(article: Article): void {
    this.state.update(state => ({
      ...state,
      loading: true,
      error: null
    }));
    this.api.update(article).subscribe({
    next: article => {
      this.state.update(state => ({
        ...state,
      articles: state.articles.map(a => a.id === article.id ? article : a),
      loading: false
      }));
    },
    error: () => {
        this.state.update(state => ({
          ...state,
          loading: false,
          error: 'Error server occured.'
        }));
      }
    });
  }

  delete(id: number): void {
    this.state.update(state => ({
      ...state,
      loading: true,
      error: null
    }));
    this.api.delete(id).subscribe({
      next: () => {
      this.state.update(state => ({
        ...state,
      articles: state.articles.filter(a => a.id !== id),
      loading: false
      }))
    },
      error: () => {
        this.state.update(state => ({
          ...state,
          loading: false,
          error: 'Error server occured.'
        }));
      }
    });
  }

}
