import React,{useEffect} from 'react'
import { AppBar, Container, Grid, Grow, Typography } from '@mui/material'
import Form from '../form/Form'
import Posts from '../posts/Posts'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
import './home.css'

const Home = () => {
    const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPosts())
  },[dispatch])
  return (
    <>
    <Grow in>
          <Container style={{paddingBottom:'30px'}}>
            <Grid container justifyContent='space-between' alignItems='stretch' style={{display:'flex',justifyContent:'space-between'}}>

              <Grid item xs={12} sm={4} style={{marginTop:'20px'}}>
                <Form/>
              </Grid>

              <Grid item xs={12} sm={7}>
                
                <Posts/>
                
              </Grid>

            </Grid>
          </Container>
          
        </Grow>

        <div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',color:'#98AFC7',fontFamily:'sans-serif',fontSize:'1.4rem', fontWeight:'600', textAlign:'center'}}>
          <p> Mudassir</p>
          <span style={{fontFamily:'sans-serif',color:'black',fontSize:'1rem',fontWeight:'400',marginBottom:'30px'}}>- Copyright &nbsp;© 2022-2023 eMemories Inc. All Rights Reserved</span>

        </div>
      </>
  )
}

export default Home