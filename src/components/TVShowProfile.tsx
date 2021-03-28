import React,{useEffect,useState} from 'react';
import {useParams} from "react-router-dom";
import{Container,makeStyles} from '@material-ui/core';
import TopBar from './TopBar';
import axios from 'axios';
import {showElement} from './types';
import ProfileCard from './ProfileCard';
import ErrorMsg from './ErrorMsg';


const newStyle : any = makeStyles(()=>({
  container : {
    backgroundColor : '#98c1d9',
    minWidth : '99vw',
    maxWidth : '100vw',
    minHeight : '100vh',
    overflowY: 'hidden',
    scrollbarWidth : 'none',
  }
}))

const API_POINT : string = (process.env.REACT_APP_TVMAZE_API as any) as string;


const TVShowProfile = ()=>{

  const params : {[index : string] : string | undefined} = useParams();
  const style = newStyle();
  const [content,setContent] = useState<showElement|undefined>();
  const [error,setError] = useState<boolean>(false);

  useEffect(()=>{

    axios.get(API_POINT + '/shows/' + params?.id)
      .then((res)=>{
        setContent(res.data);
      })
      .catch((err)=>{setError(true)})

  },[])

  return(
    <Container component = {'main'} className = {style.container}>
      <TopBar />
      {content !== undefined && <ProfileCard data = {content} />}
      {error && <ErrorMsg />}
    </Container>
  );
}

export default TVShowProfile;
