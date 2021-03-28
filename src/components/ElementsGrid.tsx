import React,{useContext,useEffect} from 'react';
import {Grid,makeStyles} from '@material-ui/core';
import {showElement} from './types';
import GridCard from './GridCard';
import {Context} from '../context';

const newStyle = makeStyles(()=>({
  container : {
    width : '100%',
    marginTop : 100,
    margin : 'auto',
    overflowY: 'hidden',
    scrollbarWidth : 'none',
  }
}))


interface iProps{
  content : any
}

const ElementsGrid = ({content} : iProps)=>{

  const style = newStyle();
  const {addFavorite,removeFavorite,favorites} = useContext(Context);

  const checkFavorite = (el : showElement) : boolean =>{
    if(favorites !== undefined){
      const res : showElement | undefined = favorites.find((e : showElement)=>(el.id === e.id));
      if(res !== undefined){
        return true
      }else{
        return false;
      }
    }else{
      return false
    }
  }

    const scrollToTop = () =>{
     window.scrollTo({
       top: 0,
       behavior: 'smooth'

     });
   };

   useEffect(()=>{
     scrollToTop();
   },[content])


  return(
    <Grid container
      className = {style.container}
      alignItems = 'center'
      justify = 'center'

    >

    {content.map((el : any )=>(<GridCard favorite = {checkFavorite(el)} data = {el} removeFavorite = {removeFavorite} addFavorite = {addFavorite} />))}

    </Grid>
  );
}


export default ElementsGrid;
