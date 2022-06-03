import {client} from './client';

export const getMovieList = async ({searchValue, page}) => {
  try {
    const response = await client.get('/', {
      params: {
        s: searchValue,
        page,
      },
    });
    const {data} = response;
    if (data.Response === 'True') {
      return data.Search;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMovieDetails = async ({id}) => {
  try {
    const response = await client('/', {
      params: {
        i: id,
        plot: 'full',
      },
    });
    const {data} = response;
    if (data.Response === 'True') {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};
