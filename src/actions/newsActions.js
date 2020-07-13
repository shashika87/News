import APIClient from '../Http/APIClient';

export function fetchNews(searchText) {
  return (dispatch) => {
    dispatch(fetchNewsBegin(searchText));
    // return getNEWS(searchText)
    return APIClient(
      'GET',
      'http://newsapi.org/v2/top-headlines?country=us&apiKey=399a1059aa5848209f68ee4c9bfcbe61',
      null,
      parser,
    )
      .then((json) => {
        dispatch(fetchNewsSuccess(json.articles));
        return json.articles;
      })
      .catch((error) => dispatch(fetchNewsFailure(error)));
  };
}

function parser(res) {
  return res;
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_NEWS_BEGIN = 'FETCH_NEWS_BEGIN';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

export const FETCH_ARTICLE_SELECTED = 'FETCH_ARTICLE_SELECTED';
export const FETCH_ARTICLE_SELECTED_PREV = 'FETCH_ARTICLE_SELECTED_PREV';
export const FETCH_ARTICLE_SELECTED_NEXT = 'FETCH_ARTICLE_SELECTED_NEXT';
export const ARTICLE_FAVORITE_ADD = 'ARTICLE_FAVORITE_ADD';
export const ARTICLE_FAVORITE_UPDATE = 'ARTICLE_FAVORITE_UPDATE';
export const ARTICLE_FAVORITE_GET = 'ARTICLE_FAVORITE_GET';

export const fetchNewsBegin = (searchText) => ({
  type: FETCH_NEWS_BEGIN,
  searchText,
});

export const fetchNewsSuccess = (articles) => ({
  type: FETCH_NEWS_SUCCESS,
  articles,
});

export const fetchNewsFailure = (error) => ({
  type: FETCH_NEWS_FAILURE,
  payload: {error},
});

export const fetchArticleSelected = (article) => ({
  type: FETCH_ARTICLE_SELECTED,
  article,
});

export const fetchArticleSelectedPrev = (article) => ({
  type: FETCH_ARTICLE_SELECTED_PREV,
  article,
});

export const fetchArticleSelectedNext = (article) => ({
  type: FETCH_ARTICLE_SELECTED_NEXT,
  article,
});

export const articleFavoriteAdd = (article) => ({
  type: ARTICLE_FAVORITE_ADD,
  article,
});

export const articleFavoriteUpdate = (article) => ({
  type: ARTICLE_FAVORITE_UPDATE,
  article,
});

export const articleFavoriteGet = (article) => ({
  type: ARTICLE_FAVORITE_GET,
  article,
});
