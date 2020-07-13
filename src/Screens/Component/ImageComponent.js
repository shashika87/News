import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchNews, articleFavoriteGet} from '../../actions/newsActions';
import ThumbsupIcon from './ThumbsupIcon';

const ImageComponent = (props) => {
  let article = props.article;
  //this.props.dispatch(articleFavoriteGet(this.props.article));
  //alert(article.title);
  let date = new Date(article.publishedAt);
  let formattedDate =
    (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
    '/' +
    (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
    '/' +
    date.getFullYear();

  return (
    <TouchableOpacity
      style={styles.imageHolder}
      onPress={() => {
        /* 1. Navigate to the Details route with params */
        props.navigation.navigate('Details', {
          article: article,
          updateArticles: props.updateArticles,
        });
      }}>
      {props.article.urlToImage == null ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            textAlign: 'center',
            textAlignVertical: 'center',
            alignItems: 'center',
          }}>
          <Text>No Preview</Text>
        </View>
      ) : (
        <Image source={{uri: props.article.urlToImage}} style={styles.image} />
      )}
      <View style={styles.textViewHolder}>
        <Text numberOfLines={2} style={styles.textOnImage}>
          {article.title}
        </Text>
        <Text style={styles.publishDateOnImage}>{formattedDate}</Text>
      </View>
      {article.favorite != null ? (
        <View style={styles.favViewHolder}>
          {article.favorite ? (
            <ThumbsupIcon style={styles.textOnImage} fill={'#157EFB'} />
          ) : (
            <View style={{transform: [{rotate: '-180deg'}]}}>
              <ThumbsupIcon fill={'#157EFB'} />
            </View>
          )}
        </View>
      ) : null}
    </TouchableOpacity>
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

  publishDateOnImage: {
    fontSize: 12,
    color: 'white',
    marginTop: 10,
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

export default ImageComponent;
