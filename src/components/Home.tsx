import React,{useEffect,useState,useContext} from 'react';
import{Grid,Container,CircularProgress,makeStyles} from '@material-ui/core';
import TopBar from './TopBar';
import axios from 'axios';
import {showElement} from './types';
import ElementsGrid from './ElementsGrid';
import SearchGrid from './SearchGrid';
import Pagination from './Pagination';
import {Context} from '../context';

const newStyle : any = makeStyles(()=>({
  container : {
    backgroundColor : '#98c1d9',
    minWidth : '99vw',
    maxWidth : '100vw',
    minHeight : '100vh',
    overflowY: 'hidden',
    scrollbarWidth : 'none',
  },
  loading : {
    width : '100%',
    minHeight : '80vh',
    marginTop : 100,
    margin : 'auto',
    overflowY: 'hidden',
    scrollbarWidth : 'none',
  }
}))

const API_POINT : string = (process.env.REACT_APP_TVMAZE_API as any) as string;


const Home = ()=>{

  const style : any = newStyle();
  const {content,setContent,page,loading,setLoading,searchRes} = useContext(Context);

  const LoadingON = ()=>(
    <Grid container
    direction = 'column'
    alignItems = 'center'
    justify = 'center'
    className = {style.loading}
    >

      <CircularProgress size = {80}/>
      <h2>Loading...</h2>

    </Grid>
  )

  useEffect(()=>{

    document.title = 'Home';

    if(content === undefined){

        axios.get(API_POINT + '/shows?page=' + page)
          .then((res)=>{
            setContent(res.data)
            setLoading(false);
          })
          .catch(err=>console.log(err))

    }else{
      setLoading(false);
    }

  },[])


  return(
    <Container component = {'main'} className = {style.container}>
      <TopBar />
      {loading && <LoadingON />}
      {(content !== undefined && searchRes === undefined) && <ElementsGrid content = {content}/>}
      {(content !== undefined && searchRes === undefined) && <Pagination />}
      {searchRes !== undefined && <SearchGrid />}
    </Container>

  );

}

export default Home;
