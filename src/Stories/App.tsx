import React, {useRef, useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const {CubeNavigationHorizontal} = require('react-native-3dcube-navigation');
import styles from './styles';
import StoryContainer from './StoryContainer';
import {AppContext, useAppContext} from '../Context/AppContext';
import Loader from '../Components/Loader';

const Stories = props => {
  const [isModelOpen, setModel] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const [storyColor, setStoryColor] = useState('green');
  const {storyLoader, setStoryLoader} = useAppContext(AppContext);
  const modalScroll = useRef(null);

  useEffect(() => {
    if (storyLoader) {
      setTimeout(() => {
        setStoryLoader(false);
      }, 1500);
    }
  }, [storyLoader, setStoryLoader]);

  const onStorySelect = index => {
    setStoryLoader(true);
    setCurrentUserIndex(index);
    setModel(true);
  };

  const onStoryClose = () => {
    setModel(false);
  };

  const onStoryNext = (isScroll = false) => {
    const newIndex = currentUserIndex + 1;
    if (props.data.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll?.current?.scrollTo?.(newIndex, true);
      }
    } else {
      setModel(false);
    }
  };

  const onStoryPrevious = (isScroll = false) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll?.current?.scrollTo?.(newIndex, true);
      }
    }
  };

  const onScrollChange = scrollValue => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious(false);
      setCurrentScrollValue(scrollValue);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        horizontal
        keyExtractor={item => item.title}
        renderItem={({item, index}) => {
          if (item.title) {
            const titles = item.title
              .split(' ')
              .filter(title => title !== 'null');
            const renderedTitles = titles.join(' ');

            return (
              <View style={styles.boxStory}>
                <TouchableOpacity
                  onPress={() => {
                    if (props.setColorFun) {
                      props.setColorFun('grey');
                    }
                    onStorySelect(index);
                    setStoryColor('grey');
                  }}>
                  <View
                    style={[
                      styles.superCircle,
                      props.containerAvatarStyle,
                      {borderColor: props.color ? props.color : storyColor},
                    ]}>
                    <Image
                      style={[styles.circle, props.avatarStyle]}
                      source={{uri: item.profile}}
                    />
                  </View>

                  <Text style={[styles.title, props.titleStyle]}>
                    {renderedTitles}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
          return null;
        }}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll?.current?.scrollTo?.(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}>
        {storyLoader ? (
          <Loader />
        ) : (
          <CubeNavigationHorizontal
            callBackAfterSwipe={onScrollChange}
            ref={modalScroll}
            style={styles.container}>
            {props.data.map((item, index) => (
              <StoryContainer
                key={item.title}
                onClose={onStoryClose}
                onStoryNext={onStoryNext}
                onStoryPrevious={onStoryPrevious}
                dataStories={item}
                isNewStory={index !== currentUserIndex}
                textReadMore={props.textReadMore}
                deleteFunc={props.deleteFunc}
                navigation={props.navigation}
              />
            ))}
          </CubeNavigationHorizontal>
        )}
      </Modal>
    </View>
  );
};

export default Stories;
