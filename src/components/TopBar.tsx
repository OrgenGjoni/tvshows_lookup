import React,{useContext,useEffect,useState} from 'react';
import {InputBase,Tooltip,IconButton,Badge,AppBar,Toolbar,Grid,makeStyles} from '@material-ui/core';
import {RiMovie2Line} from 'react-icons/ri';
import {BsHeart,BsHeartFill} from 'react-icons/bs';
import {Context} from '../context';
import { useHistory } from "react-router-dom";

const newStyle : any = makeStyles(()=>({
  appBar : {
    position : 'fixed',
    width : '90%',
    backgroundColor : 'rgb(237, 246, 249,0.9)',
    borderRadius : 15,
    color : '#ef233c',
    padding : 5,
    marginTop : 5,
    marginLeft : '3%'
  },
  toolBar : {
    minWidth : '100%',
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center'
  },
  input : {
    backgroundColor : 'white',
    borderRadius : 25,
    padding : 5,
    height : '80%',
    color : '#3d405b'
  }
}));



const TopBar = ()=>{

  const history = useHistory();
  const [search,setSearch] = useState<string|undefined>();


  const NoFavorites = ()=>(
    <Tooltip title = {'Favorites list is empty...'}>
      <IconButton >
          <BsHeart size = {30} />
      </IconButton>
    </Tooltip>
  )

  const Favorites = ()=>(
    <IconButton onClick = {()=>{history.push('/favorites')}} >
      <Badge badgeContent = {favorites?.length} color = 'primary'>
        <BsHeartFill size = {30} color = {'red'} />
      </Badge>
    </IconButton>
  )

  const style = newStyle();
  const {favorites,searchTitle,setSearchRes} = useContext(Context);

  useEffect(()=>{

    if(search !== undefined && search.length > 3){
    const timeout = setTimeout(() => {

      searchTitle(search);

    }, 1000);
    document.title = 'Search';
    return ()=>{clearTimeout(timeout)};
  }else{
    setSearchRes(undefined);
  }

  },[search]);

  return(
    <AppBar position="static" className = {style.appBar}>
      <Toolbar className = {style.toolBar}>
      <Grid container
       direction = 'row'
       alignItems = 'center'
       >
         <IconButton onClick = {()=>{history.push('/');setSearch(undefined)}} >
          <RiMovie2Line color = {'#ef233c'} size = {45}/>
           <small>Home </small>
         </IconButton>

      </Grid>
      <Grid container
        direction = 'row'
        justify = 'flex-end'
      >
        <InputBase className = {style.input} onChange = {(e : any)=>{setSearch(e.target.value)}}/>
        {favorites !== undefined && favorites?.length > 0 ? <Favorites /> : <NoFavorites />}
      </Grid>
      </Toolbar>
    </AppBar>

  );
}

export default TopBar
