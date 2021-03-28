import React,{useContext,useEffect} from 'react';
import{Grid,Container,CircularProgress,makeStyles} from '@material-ui/core';
import TopBar from './TopBar';
import ElementsGrid from './ElementsGrid';
import {Context} from '../context';

const newStyle : any = makeStyles(()=>({
  container : {
    backgroundColor : '#98c1d9',
    minWidth : '99vw',
    maxWidth : '100vw',
    minHeight : '100vh',
    overflowY: 'hidden',
    scrollbarWidth : 'none'
  },
  emptyAlert : {
    minWidth : '100vw',
    minHeight : '100vh'
  }
}))

const Favorites = ()=>{

  const style = newStyle();
  const {favorites} = useContext(Context);

  const EmptyAlert = ()=>(
    <Grid container
      justify = 'center'
      alignItems = 'center'
      className = {style.empty}
    >
      <h2> Favorites list is empty!</h2>
    </Grid>
  )

  useEffect(()=>{
    document.title = 'Favorites';
  },[]);

  return(
    <Container component = {'main'} className = {style.container}>
      <TopBar />
      {favorites !== undefined && <ElementsGrid content = {favorites} />}
      {favorites === undefined || favorites.length === 0 && <EmptyAlert />}
    </Container>
  );
}

export default Favorites;
