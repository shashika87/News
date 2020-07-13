import {
  FETCH_NEWS_BEGIN,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
  FETCH_ARTICLE_SELECTED,
  FETCH_ARTICLE_SELECTED_PREV,
  FETCH_ARTICLE_SELECTED_NEXT,
  ARTICLE_FAVORITE_ADD,
  ARTICLE_FAVORITE_UPDATE,
  ARTICLE_FAVORITE_GET,
} from '../actions/newsActions';

const initialState = {
  searchText: '',
  items: [],
  loading: false,
  error: null,
  selectedNEWS: {},
  prevSelectedNEWS: {},
  nextSelectedNEWS: {},
  favoriteArticles: [],
};

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NEWS_BEGIN:
      return {
        ...state,
        searchText: '',
        loading: true,
        error: null,
      };

    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.articles,
      };

    case FETCH_NEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        articles: [],
      };

    case FETCH_ARTICLE_SELECTED:
      return {
        ...state,
        selectedArticle: action.article,
      };

    case FETCH_ARTICLE_SELECTED_PREV:
      return {
        ...state,
        prevSelectedArticle: action.article,
      };

    case FETCH_ARTICLE_SELECTED_NEXT:
      return {
        ...state,
        nextSelectedArticle: action.article,
      };

    case ARTICLE_FAVORITE_ADD:
      return {
        ...state,
        favorites: state.favoriteArticles.push(action.article),
      };
    case ARTICLE_FAVORITE_GET:
      let favArticleGet = state.favoriteArticles.find(
        (item) => item.title === action.article.title,
      );
      return {
        ...state,
        favorite: favArticleGet ? favArticleGet.favorite : null,
      };
    case ARTICLE_FAVORITE_UPDATE:
      let favArticle = state.favoriteArticles.find(
        (item) => item.title === action.article.title,
      );
      favArticle.favorite = action.article.favorite;
      return {
        ...state,
        favorites: state.favoriteArticles,
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
