import React,{useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {showElement} from  './components/types';

import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import Home from './components/Home';
import TVShowProfile from './components/TVShowProfile';
import Favorites from './components/Favorites';
import {Context} from './context';
const API_POINT : string = (process.env.REACT_APP_TVMAZE_API as any) as string;

function App() {

  const [content,setContent] = useState<showElement[]|undefined>();
  const [searchRes,setSearchRes] = useState<showElement[]|undefined>();
  const [loading,setLoading] = useState<boolean>(true);
  const [favorites,setFavorites] = useState<showElement[]|undefined>();
  const [page,setPage] = useState<number>(0);


  const addFavorite = (el : showElement) : void =>{
      if(favorites === undefined){
        setFavorites([el]);
      }else{
        const newFavArr : showElement[] = Object.assign([],favorites);
        newFavArr.push(el);
        setFavorites(newFavArr);
      }
  }

  const removeFavorite = ( el : showElement) : void =>{
    if(favorites !== undefined){
    const newFavArr : showElement[] | [] = favorites.filter((e : showElement)=>(e.id !== el.id));
    setFavorites(newFavArr);
    }
  }


  ////////////////////////
  const fetchAPI = (page : number)=>{
    setLoading(true);
    setContent(undefined);
    setSearchRes(undefined);
    axios.get(API_POINT + '/shows?page=' + page)
      .then((res)=>{
        setContent(res.data)
        setLoading(false);
      })
      .catch(err=>console.log(err))
  };

  const searchTitle = (title : number)=>{
    setLoading(true);
    axios.get(API_POINT + '/search/shows?q=' + title)
      .then((res)=>{
        setSearchRes(res.data)
        setLoading(false);
      })
      .catch(err=>console.log(err))
  }



  const goBack = ()=>{
    if(page > 0){
      setPage(page - 1);
      fetchAPI(page - 1);
    }
  }

  const goForward = ()=>{
      setPage(page + 1);
      fetchAPI(page + 1);
  }

  ///////////////////////

  useEffect(()=>{
    if(localStorage.getItem('favorites') !== null){
      let lStorage : string;
      lStorage = (localStorage.getItem('favorites') as any) as string;
      setFavorites(JSON.parse(lStorage));
    }


  },[]);

  useEffect(()=>{

    if(favorites !== undefined ){
      localStorage.setItem('favorites',JSON.stringify(favorites));
    }
  },[favorites]);



  return (
    <>
      <CssBaseline />
      <Context.Provider value = {{content,setContent,favorites,addFavorite,removeFavorite,page,goBack,goForward,loading,setLoading,searchTitle,searchRes,setSearchRes}}>
        <Router>
          <Switch>
            <Route path = {'/favorites'} exact component = {Favorites} />
            <Route path = {'/shows/:id'} exact component = {TVShowProfile} />
            <Route path = {'/'} exact component = {Home} />

          </Switch>
        </Router>
      </Context.Provider>
    </>
  );
}

export default App;
