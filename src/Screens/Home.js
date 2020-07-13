/* eslint-disable react/no-string-refs */
/* eslint-disable react-native/no-inline-styles */
/* global __DEV__ */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchNews,
  fetchNewsSuccess,
  articleFavoriteGet,
} from '../actions/newsActions';
import ImageComponent from './Component/ImageComponent';
import ListIcon from './Component/ListIcon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = (props) => {
  const [listView, setListView] = useState(true);
  useEffect(() => {
    //if (!props.test) {
    props.dispatch(fetchNews(''));
    //}
  }, []);

  const updateArticles = (article) => {};
  Dimensions.addEventListener('change', () => {
    props.dispatch(fetchNewsSuccess(props.articles));
  });

  const {error, loading, articles} = props;

  props.navigation.setOptions({
    headerRight: () => (
      <View flexDirection="row">
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => {
            setListView(!listView);
          }}>
          <View style={{transform: [{scale: 0.9}]}}>
            <ListIcon listView={!listView} />
          </View>
        </TouchableOpacity>
      </View>
    ),
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Please Wait...</Text>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              keyExtractor={(item) => item.id}
              key={'key_flatlist' + Math.round(new Date().getTime() / 1000)}
              numColumns={listView === true ? 1 : 2}
              data={articles}
              renderItem={({item}) => (
                <ImageComponent
                  ref={'imageComponent' + item.title}
                  key={'item' + item.title}
                  article={item}
                  updateArticles={updateArticles}
                  navigation={props.navigation}
                />
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  imageHolder: {
    margin: 5,
    height: 160,
    flex: 1,
    position: 'relative',
    borderWidth: 1.0,
    borderColor: 'lightgray',
  },

  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },

  textViewHolder: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },

  favViewHolder: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  textOnImage: {
    color: 'white',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    paddingTop: 10,
    fontSize: 18,
    color: 'black',
  },

  Btn: {
    padding: 15,
    backgroundColor: '#5cb85c',
  },

  btnText: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'stretch',
  },
});

//export default {Home, MusicItem}
const mapStateToProps = (state) => ({
  articles: state.news.articles,
  loading: state.news.loading,
  error: state.news.error,
});

export default connect(mapStateToProps)(Home);
