import React from 'react';
import Home from '../Screens/Home';
import ImageComponent from '../Screens/Component/ImageComponent';
import {shallow} from 'enzyme';
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

const mockStore = configureStore([thunk]);

let store;
describe('Home', () => {
  let instance;
  var component;
  beforeEach(() => {
    // Simulate fetching a user from an API and loading it into state.
    store = mockStore({
      news: {
        searchText: '',
        items: [],
        articles: items,
        loading: true,
        error: null,
        selectedNEWS: {},
        prevSelectedNEWS: {},
        nextSelectedNEWS: {},
        favoriteArticles: [],
      },
    });

    //store.dispatch = jest.fn();
    component = renderer.create(
      <Provider store={store}>
        <Home test={true} articles={items} loading={false} />
      </Provider>,
    );
  });

  it('should render initial state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('FETCH_NEWS_BEGIN (action equal)', () => {
    const searchAction = fetchNewsBegin('');
    store.dispatch(searchAction);

    expect(store.getActions()).toEqual([searchAction]);
  });

  it('FETCH_NEWS_SUCCESS (action equal)', () => {
    const resultAction = fetchNewsSuccess(items);
    store.dispatch(resultAction);
    expect(store.getActions()).toEqual([resultAction]);
  });

  let componentImage = renderer.create(
    items.map(function (element, index) {
      return <ImageComponent key={'key' + index} article={element} />;
    }),
  );
  it('should render state with data from Redux store', () => {
    expect(componentImage.toJSON()).toMatchSnapshot();
  });

  test('ImageItem component counts=' + items.length, () => {
    //console.log(componentMusic.root.children.length);
    expect(componentImage.root.children.length).toEqual(items.length);
  });
});
