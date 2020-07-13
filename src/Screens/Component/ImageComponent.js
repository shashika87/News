import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {
  articleFavoriteGet,
  articleFavoriteAdd,
  articleFavoriteUpdate,
} from '../../actions/newsActions';
import ThumbsupIcon from './ThumbsupIcon';

const ImageComponent = (props) => {
  let article = props.article;
  const [count, setCount] = useState(0);

  //this.props.dispatch(articleFavoriteGet(this.props.article));
  let date = new Date(article.publishedAt);
  let formattedDate =
    (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
    '/' +
    (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
    '/' +
    date.getFullYear();
  let {selectedArticle, favorite} = props;
  //alert(selectedArticle);
  //article = selectedArticle?selectedArticle:article;
  // if(selectedArticle && selectedArticle.title==article.title){
  //   article = selectedArticle;
  // }

  props.navigation.addListener('focus', (payload) => {
    //props.dispatch(fetchNewsSuccess(props.articles));
    setCount(count + 1);
  });
  console.log(
    'article.favorite',
    article.favorite,
    'article.title',
    article.title,
  );
  return (
    <TouchableOpacity
      style={styles.imageHolder}
      key={'article' + article.title}
      onPress={() => {
        /* 1. Navigate to the Details route with params */
        props.navigation.navigate('Details', {
          article: article,
          updateArticles: props.updateArticles,
        });
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        {props.article.urlToImage == null ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              textAlign: 'center',
              textAlignVertical: 'center',
              alignItems: 'center',
              height:180,
            }}>
            <Text>No Preview</Text>
          </View>
        ) : (
          <Image
            source={{uri: props.article.urlToImage}}
            style={styles.image}
          />
        )}
        <View>
          <Text numberOfLines={4} style={styles.textOnImage}>
            {article.title}
            <Text style={styles.publishDateOnImage}> ({formattedDate})</Text>
          </Text>
        </View>
        <View flexDirection="row">
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => {
              setCount(count + 1);
              if (!article.favorite) {
                article.favorite = true;
                props.dispatch(articleFavoriteAdd(article));
              } else {
                article.favorite = true;
                props.dispatch(articleFavoriteUpdate(article));
              }
              props.dispatch(articleFavoriteGet(article));
            }}>
            <View style={{transform: [{scale: 0.8}]}}>
              <ThumbsupIcon
                fill={article.favorite == true ? '#157EFB' : 'none'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding: 5, marginTop: 5}}
            onPress={() => {
              setCount(count + 1);
              console.log(article);
              //alert(JSON.stringify(article));
              if (!article.favorite) {
                article.favorite = false;
                props.dispatch(articleFavoriteAdd(article));
              } else {
                article.favorite = false;
                props.dispatch(articleFavoriteUpdate(article));
              }
              console.log(article);
              props.dispatch(articleFavoriteGet(article));
            }}>
            <View style={{transform: [{rotate: '-180deg'}, {scale: 0.8}]}}>
              <ThumbsupIcon
                fill={
                  article.favorite == null || article.favorite == true
                    ? 'none'
                    : '#157EFB'
                }
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
    flex: 1,
    borderWidth: 1.0,
    borderColor: 'lightgray',
  },

  image: {
    height: 180,
  },

  textOnImage: {
    color: 'black',
    fontSize: 18,
    padding: 10,
  },

  publishDateOnImage: {
    fontSize: 12,
    color: 'black',
    marginTop: 10,
  },
});
const mapStateToProps = (state) => ({
  selectedArticle: state.news.selectedArticle,
});
export default connect(mapStateToProps)(ImageComponent);
