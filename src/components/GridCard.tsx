import React from 'react';
import {Tooltip,Grid,Chip,Card,CardActionArea,CardActions,CardContent,CardMedia,Button,makeStyles} from '@material-ui/core';
import {showElement} from './types';
import { useHistory } from "react-router-dom";
import {RiHeartAddLine} from 'react-icons/ri';
import {BsFillHeartFill} from 'react-icons/bs'

const antonFont : string = "'Anton', sans-serif";

const newStyle = makeStyles(()=>({
  card : {
    width : '20%',
    minWidth : 250,
    padding : 5,
    margin : 20
  },
  favorite : {
    cursor : 'pointer',
    '&:hover': {
      color : 'red'
    }
  },
  content : {
    fontFamily : antonFont,
    fontWeight : 900
  }
}))

interface iProps{
  data : any,
  addFavorite(el : showElement) : void,
  removeFavorite(el : showElement) : void,
  favorite : boolean
}

const GridCard = ({data,addFavorite,removeFavorite,favorite} : iProps)=>{

  const style = newStyle();
  const history = useHistory();
  const goTo = (id : number)=>{
    history.push('/shows/' + id);
  }



  const FavSelected = ()=> (
    <Tooltip title="Remove from favorites" placement="right-end" enterDelay = {500}>
    <a>
      <BsFillHeartFill size = {25} color = {'red'} className = {style.favorite} onClick = {()=>{removeFavorite(data)}}/>
    </a>
    </Tooltip>
  )

  const FavUnSelected = ()=> (
    <Tooltip title="Add to favorites" placement="right-end" enterDelay = {500}>
    <a>
      <RiHeartAddLine size = {25} className = {style.favorite} onClick = {()=>{addFavorite(data)}}/>
    </a>
    </Tooltip>
  )

  return(
    <Card className = {style.card}>
      <CardActionArea onClick = {()=>{goTo(data.id)}}>
        <CardMedia
            component="img"
            alt={data.name}
            height="250"
            image={data!.image === null ? './image.jpg' : data?.image.medium }

            title={data.name}
            />

            <CardContent className = {style.content}>
              <h2>{data.name}</h2>
              <b>{data.genres.map((e : string)=>(<Chip size="small" label = {e} />))}</b>
            </CardContent>

      </CardActionArea>
      <CardActions>
        <Grid container
          direction = 'row'
          alignItems = 'flex-end'
          justify = 'flex-end'
        >
          {!favorite ? <FavUnSelected />  : <FavSelected />}
        </Grid>
      </CardActions>
    </Card>

  );

}

export default GridCard
