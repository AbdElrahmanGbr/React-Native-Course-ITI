import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {getMovieList} from '../../api/movie';
import {Header, Input, MovieCard} from '../../components';
import {COLORS} from '../../theme';
import styles from './styles';

export const SearchScreen = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [page, setPage] = useState(1);

  const onPressSearch = async () => {
    const _data = await getMovieList({searchValue: value, page: page});
    setData(_data);
    setfilteredData(_data);
    setPage(page+1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onPressSearch();
    }, 600);
    return () => clearTimeout(timer);
  }, [value]);
  
  const searchFilter = _value => {
    setValue(_value);
    const newData = data?.filter(item => {
      const itemData = item.Title.toUpperCase();
      const textData = _value.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (_value.length === 0) {
      setfilteredData([]);
    } else {
      setfilteredData(newData);
    }
  };
  
  const renderLoader = () => {
    return (
      <View style={styles.loaderContainer}>
        <Text size="large" color="#aaa">
          Loading...
        </Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <MovieCard
        title={item.Title}
        releaseDate={item.Year}
        imageUrl={item.Poster}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredData}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Input
              value={value}
              onChangeText={searchFilter}
              placeholder="Search"
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
            <Header text={'Search Result'} />
          </>
        }
        onEndReached={onPressSearch}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderLoader}
        />
    </SafeAreaView>
  );
};


// ===========================Was trying debounce lodash from meduium and debounce input from freecodecamp==========================
// import debounce from 'lodash.debounce';
// export const SearchScreen = () => {
//   const [value, setValue] = useState('');
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const navigation = useNavigation();
//   const _state = useSelector(state => state); // STATE
//   const dispatch = useDispatch();

//   const debounce = (func) => {
//     let timer;
//     return function (...args) {
//       const context = this;
//       if(timer) {
//         clearTimeout(timer);
//       }
//       timer = setTimeout(() => {
//         func.apply(context, args);
//       }, 500);
//     }
//   }
//   const [search, setSearch] = useState([]);
//   const handleChange = (event) => {
//     const {value} = event.target;
//     fetch(`http://www.omdbapi.com/?s=${value}&apikey=cf8233a2`)
//       .then(res => res.json())
//       .then(json => setSearch(json.data.items));
//   };

//   const optimisedVersion = useCallback(debounce(handleChange), []);

  // const [searchTerm, setSearchTerm] = useState("");

  // let listToDisplay = fruits;

  // const handleChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const renderFruitList = () => {
  //   return listToDisplay.map((fruit, i) => <p key={i}>{fruit}</p>);
  // };

  // if (searchTerm !== "") {
  //   listToDisplay = fruits.filter((fruit) => {
  //     return fruit.includes(searchTerm);
  //   });
  // }





  // const updateDebounceText = debounce(async (text) => {
  //   const _data = await getMovieList({
  //     query: text,
  //     page,
  //   });
  //   setData(_data);
  // }, 500);

  // input.addEventListener('input', e => {
  //   defaultText.textContent=e.target.value;
  //   updateDebounceText(e.target.value);
  // });

  // function debounce(cd, delay=1000){
  //   let timeout
  //   return function(...args){
  //     clearTimeout(timeout)
  //     timeout = setTimeout(() => {
  //       cd(...args)
  //     }, delay)
  //   }
  // }
  // console.log(_state);

  // function debounce ( cb , delay = 1000 ) {
  //   return ( ... args )
  // }

