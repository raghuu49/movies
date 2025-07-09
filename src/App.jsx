import React, { useEffect, useState } from 'react'
import Search from './assets/components/search'
import Spinner from './assets/components/Spinner';
import MovieCard from './assets/components/MovieCard';
import { useDebounce } from 'use-debounce';
import { getTrending, updateSearchCount } from './appwrite';

function App() {
  const [searchTerm,setSearchTerm]=useState('');
  const [errorMessage,setErrorMessage]=useState('')
  const [moviesList,setMoviesList]=useState([])
  const [isLoading,setLoading]=useState(true)
  const [trendingMovies,setTrendingMovies]=useState([]);

  const API_BASE_URL='https://api.themoviedb.org/3'
  const API_KEY=import.meta.env.VITE_TMDB_API_KEY
  const API_OPTIONS={
    method:'GET',
    headers:{
      accept:'application/json' ,// to return a json file
      Authorization:`Bearer ${API_KEY}` // to authorize
    }
  }

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const fetchMovies=async (query='')=>{
    setLoading(true);
    setErrorMessage('');
    try{
      const endpoint=query?
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        :`${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
      const response=await fetch(endpoint,API_OPTIONS);
      // response.json()
      if(!response.ok){
        throw new Error('API Request Failed')
      }
      const data=await response.json();
      if(data.response==='False'){
        setErrorMessage(data.Error || 'Failed to Fetch Movies')
        setMoviesList([])
        return;
      }
      console.log(data);
      setMoviesList(data.results||[]);
      if(query && data.results.length>0){
        await updateSearchCount(query,data.results[0]);
      }

    }
    catch(error){
      console.error(`error fetching movies:${error}`)
      setErrorMessage('Sorry Unable to fetch Movies!!!')
    }
    finally{
      setLoading(false);
    }
  }

  const loadTrendingMovies=async()=>{
    try{
      const movies=await getTrending();
      setTrendingMovies(movies);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchMovies(debouncedSearchTerm);
  },[debouncedSearchTerm])

  useEffect(()=>{
    loadTrendingMovies();
  })
  return (

   <main>
    <div className='pattern'/>
    <div className='wrapper'>

      <header>
        <img src='./hero.png' alt='Hero Banner'/>
        <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </header>

      {trendingMovies.length>0 && (
        <section className='trending'>
          <h2>Trending Movies</h2>
          <ul>
            {trendingMovies.map((movie,index)=>(
              <li key={movie.id}>
                <p>{index+1}</p>
                <img src={movie.poster_url} alt={movie.title}/>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className='all-movies'>
        <h2>All Movies</h2>
        {
          isLoading?(
            <Spinner/>
          ):
          errorMessage?(
            <p className='text-red-500'>{errorMessage}</p>
          ):
          (
            <ul>
              {moviesList.map((movie)=>(
              <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )
        }
      </section>
     
    </div>
   </main>
  )
}

export default App
