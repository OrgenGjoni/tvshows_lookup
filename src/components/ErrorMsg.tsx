import React,{useEffect} from 'react';
import {Grid,makeStyles} from '@material-ui/core';

import {ImSad} from 'react-icons/im';

const newStyle = makeStyles(()=>({
  container : {
    minWidthwidth : '100vw',
    minHeight : '100vh'
  }
}))

const ErrorMsg = ()=>{

  const style = newStyle();

  useEffect(()=>{
    document.title = 'Error!';
  })

  return(
    <Grid container
    direction = 'column'
    justify = 'center'
    alignItems = 'center'
    className = {style.container}>
      <ImSad size = {'10%'}/>
      <h3>Opps something went wrong!</h3>
    </Grid>

  );
}

export default ErrorMsg;
