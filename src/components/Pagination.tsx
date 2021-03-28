import React,{useContext} from 'react';
import {Grid,IconButton,makeStyles} from '@material-ui/core';
import {Context} from '../context';
import {FaArrowCircleRight,FaArrowCircleLeft} from 'react-icons/fa';

const newStyle = makeStyles(()=>({
  container : {
    marginBottom : 0
  }
}))

const Pagination = ()=>{

  const style = newStyle();
  const {content,page,goBack,goForward} = useContext(Context);

  return(
    <Grid container
    direction = 'row'
    justify = 'space-between'
    alignItems = 'center'
    className = {style.container}
    >
      <Grid>
        <IconButton style = {{display : (page === 0 ? 'none' : 'block')}} onClick = {goBack}>
          <FaArrowCircleLeft size = {50} />Back
        </IconButton>
      </Grid>

      <Grid>
        <IconButton  onClick = {goForward} style = {{display : (content !== undefined && content.length < 100 ? 'none' : 'block')}}>
          Next<FaArrowCircleRight size = {50} />
        </IconButton>
      </Grid>

    </Grid>
  )
}

export default Pagination;
