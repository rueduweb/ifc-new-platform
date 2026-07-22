export type Article = {
  id: number;
  title: string;
  description: string;
  content: string;
  authorId: number;
}

export interface ArticlesState { // prepare the store
  articles: Article[];
  selectedArticle: Article | null;
  loading: boolean;
  error: string | null;
}
