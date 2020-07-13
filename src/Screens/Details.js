import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchArticleSelected,
  fetchArticleSelectedNext,
  fetchArticleSelectedPrev,
  articleFavoriteGet,
  articleFavoriteAdd,
  articleFavoriteUpdate,
} from '../actions/newsActions';
import {nextIndex, prevIndex} from '../Utils/Utils';
import ThumbsupIcon from './Component/ThumbsupIcon';

const Details = (props) => {
  useEffect(() => {
    const {article} = props.route.params;
    articleIndex(article);
  }, []);

  const articleIndex = (article) => {
    props.dispatch(fetchArticleSelected(article));
    props.dispatch(articleFavoriteGet(article));
    const selectedIndex = props.articles.findIndex(
      (element) => element.title === article.title,
    );
    const selectedNextIndex = nextIndex(selectedIndex, props.articles.length);
    const selectedNextArticle = props.articles[selectedNextIndex];
    props.dispatch(fetchArticleSelectedNext(selectedNextArticle));
    const selectedPrevIndex = prevIndex(selectedIndex, props.articles.length);
    const selectedPrevArticle = props.articles[selectedPrevIndex];
    props.dispatch(fetchArticleSelectedPrev(selectedPrevArticle));
    //alert(props.navigation.state);
    props.navigation.setOptions({title: article.source.name});
  };

  let {selectedArticle, prevSelectedArticle, nextSelectedArticle} = props;
  selectedArticle = selectedArticle ? selectedArticle : props.route.params;
  const {updateArticles} = props.route.params;
  if (props.navigation) {
    props.navigation.setOptions({
      headerRight: () => (
        <View flexDirection="row">
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => {
              if (selectedArticle.favorite == null) {
                selectedArticle.favorite = true;
                props.dispatch(articleFavoriteAdd(selectedArticle));
              } else {
                selectedArticle.favorite = true;
                props.dispatch(articleFavoriteUpdate(selectedArticle));
              }
              props.dispatch(articleFavoriteGet(selectedArticle));
              updateArticles(selectedArticle);
            }}>
            <View style={{transform: [{scale: 0.8}]}}>
              <ThumbsupIcon
                fill={props.favorite ? '#157EFB' : 'none'}
                style={{width: 25, height: 25}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding: 5, marginTop: 5}}
            onPress={() => {
              if (selectedArticle.favorite == null) {
                selectedArticle.favorite = false;
                props.dispatch(articleFavoriteAdd(selectedArticle));
              } else {
                selectedArticle.favorite = false;
                props.dispatch(articleFavoriteUpdate(selectedArticle));
              }
              props.dispatch(articleFavoriteGet(selectedArticle));
              updateArticles(selectedArticle);
            }}>
            <View style={{transform: [{rotate: '-180deg'}, {scale: 0.8}]}}>
              <ThumbsupIcon
                style={{width: 25, height: 25}}
                fill={
                  props.favorite == null || props.favorite == true
                    ? 'none'
                    : '#157EFB'
                }
              />
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          {selectedArticle.urlToImage == null ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
                height: 180,
                width: 300,
              }}>
              <Text
                style={{
                  marginTop: 50,
                  textAlign: 'center',
                }}>
                No Preview
              </Text>
            </View>
          ) : (
            <Image
              style={({height: 180}, styles.image)}
              source={{uri: selectedArticle.urlToImage}}
            />
          )}
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{fontSize: 20, margin: 10}}>
              {selectedArticle.title}
              {selectedArticle.author ? '(' + selectedArticle.author + ')' : ''}
            </Text>
            <Text style={{fontSize: 16, margin: 10}}>
              {selectedArticle.description}
            </Text>
            <Text style={{fontSize: 16, margin: 10}}>
              {selectedArticle.content}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.prevNext}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            articleIndex(prevSelectedArticle);
          }}>
          <View style={styles.TriangleShapeCSSPrevSide} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            articleIndex(nextSelectedArticle);
          }}>
          <View style={styles.TriangleShapeCSS} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  prevNext: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'lightgray',
    width: '100%',
    padding: 20,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  TriangleShapeCSS: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    transform: [{rotate: '90deg'}],
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black',
  },

  TriangleShapeCSSPrevSide: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    transform: [{rotate: '-90deg'}],
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black',
  },

  SquareShapeCSS: {
    width: 20,
    height: 20,
    transform: [{rotate: '90deg'}],
    borderStyle: 'solid',
    backgroundColor: 'black',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#00BCD4',
  },
  image: {
    height: 180,
    width: '100%',
    borderWidth: 1.0,
    borderColor: 'lightgray',
  },
  imageHolder: {
    margin: 5,
    height: 160,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  articles: state.news.articles,
  selectedArticle: state.news.selectedArticle,
  prevSelectedArticle: state.news.prevSelectedArticle,
  nextSelectedArticle: state.news.nextSelectedArticle,
  favorite: state.news.favorite,
});

export default connect(mapStateToProps)(Details);
