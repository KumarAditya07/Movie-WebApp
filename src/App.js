import React,{useState} from 'react';
import MovieList from './components/MovieList';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect } from 'react';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox.jsx';
import AddFavourite from './components/AddFavourite';
import RemoveFavourites from './components/RemoveFavourites.Jsx';


const App=()=> {
  const [movies,setMovie] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');


  //using fetch we are geting http response for data and converting it into JSon s
 const getMovieRequest=async  (searchValue)=>{
    const url = `https://www.omdbapi.com/?apikey=727bbdc1&s=${searchValue}`

    const response = await fetch(url);
    const responseJson  = await response.json();
   if(responseJson.Search){
    setMovie(responseJson.Search);
   }
 }


 useEffect(() => {
    getMovieRequest(searchValue);
}, [searchValue]);

useEffect(() => {
  const movieFavourites = JSON.parse(
    localStorage.getItem('react-movie-app-favourites')
  );

  if (movieFavourites) {
    setFavourites(movieFavourites);
  }
}, []);


const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

  const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

  

  return (
   
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourite}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
  );
}

export default App;
