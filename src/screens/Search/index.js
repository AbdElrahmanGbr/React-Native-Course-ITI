import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, SafeAreaView, Pressable, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getMovieList} from '../../api/movie';
import {Header, Input, MovieCard} from '../../components';
import {storeMovie} from '../../store/actions';
import {COLORS} from '../../theme';
import styles from './styles';

export const SearchScreen = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]); // API
  const navigation = useNavigation();
  const _state = useSelector(state => state); // STATE
  const dispatch = useDispatch();

  console.log(_state);

  const onPressSearch = async () => {
    const _data = await getMovieList({searchValue: value});
    setData(_data);
  };

  const renderItem = ({item}) => {
    return (
      <MovieCard
        title={item.Title}
        releaseDate={item.Year}
        imageUrl={item.Poster}
        onPress={() => {
          dispatch(storeMovie(item));
          navigation.navigate('MovieScreen', {
            id: item.imdbID,
          });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.length !== 0 && value !== '' ? data : _state.movies}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.noResultView}>
            <MaterialIcon
              name="emoticon-sad-outline"
              color={COLORS.hitGrey}
              size={80}
            />
            <Text style={styles.noSearchText}>{'No Search Result'}</Text>
          </View>
        }
        ListHeaderComponent={
          <>
            <Input
              value={value}
              onChangeText={_value => setValue(_value)}
              right={
                <Pressable
                  style={styles.searchIconContainer}
                  onPress={onPressSearch}>
                  <Icon
                    name="magnifying-glass"
                    size={30}
                    color={COLORS.sun}
                    style={styles.icon}
                  />
                </Pressable>
              }
            />
            <Header
              text={
                data.length !== 0 && value !== ''
                  ? 'Search Result'
                  : 'Recent Searches'
              }
            />
          </>
        }
      />
    </SafeAreaView>
  );
};
