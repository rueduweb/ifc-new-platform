export type Article = {
  id: number;
  title: string;
  description: string;
  content: string;
  authorId: number;
}

export type ArticlesState = {
  articles: Article[];
  selectedArticle: Article | null;
  loading: boolean;
  error: string | null;
}
