import React from 'react';
import Details from '../Screens/Details';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducer/rootReducer';
import thunk from 'redux-thunk';
import {
  fetchNewsBegin,
  fetchNewsSuccess,
  fetchNewsailure,
} from '../actions/newsActions';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import items from './MockData/SearchResult';
import {TouchableOpacity, Image, View, TextInput} from 'react-native';
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

const mockStore = configureStore([thunk]);

let store;
describe('Details', () => {
  let instance;
  var component;
  beforeEach(() => {
    // Simulate fetching a user from an API and loading it into state.
    var articles = {};
    store = mockStore({
      news: {
        searchText: '',
        items: [],
        loading: false,
        error: null,
        selectedArticle: items[1],
        prevSelectedArticle: items[0],
        nextSelectedArticle: items[2],
      },
    });

    //store.dispatch = jest.fn();
    let route = {params:{selectedArticle:items[1]}}
    component = renderer.create(
      <Provider store={store}>
        <Details route={route} />
      </Provider>,
    );
  });

  it('should render Details', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
