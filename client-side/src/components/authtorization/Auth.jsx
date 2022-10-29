import React,{useEffect, useState} from 'react'
import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import Input from './Input';
import './auth.css'
import { GoogleLogin } from 'react-google-login'
import Icon from './Icon';
import { gapi } from 'gapi-script'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signIn, signUp } from '../../actions/auth';

const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}

const Auth = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLogin, setisLogin] = useState(false)
    const [formData, setFormData] = useState(initialState)
    

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(formData)
        
        if(isLogin){
            dispatch(signUp(formData, history))
        }else{
            dispatch(signIn(formData, history))
        }
    }
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSwitchMode = ()=>{
        setisLogin((prevIsLogin)=> !prevIsLogin)
    }

    const clientId = '231447497618-l2ecm53aci7c1r0f9vpqkhfp1lpff55t.apps.googleusercontent.com'

    useEffect(()=>{
        gapi.load("client:auth2",()=>{
            gapi.auth2.init({clientId:clientId})
        })
    },[])

    const googleSuccess = async (res)=>{
        const result = res?.profileObj;
        const token = res?.tokenId

//IN THIS CASE OUR PAYLOAD IS DATA(data)
        try {
            dispatch({type:'AUTH', data: { result, token }})
            history.push('/')
            
            
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailed = (err)=>{
        console.log(err)
        console.log('Google Login Failed')
    }

  return (
    <Container className='main' component="main" maxWidth="xs">
        <Paper className='paper' elevation={3}>
            <div style={{display:'flex', alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <Avatar className='avatar'>
                <LockIcon/>
            </Avatar>&nbsp;&nbsp;
            <Typography variant='h5' color='gray'>{isLogin ? 'Sign Up' : 'Sign In'}</Typography>
            </div>
            &nbsp;&nbsp;
            <form className='form' onSubmit={handleSubmit}>
                <Grid>
                    {isLogin && (
                        <>
                        <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus/>&nbsp;
                        <Input name='lastName' label='Last Name' handleChange={handleChange}/>
                        </>
                    )}
                    &nbsp;
                    <Input name='email' label='Email Address' handleChange={handleChange} type='email'/>&nbsp;
                    <Input name='password' label='Password' handleChange={handleChange} type='password'/>&nbsp;
                    {isLogin && (
                        <Input name='confirmPassword' type='password' label='Confirm Password' handleChange={handleChange}/>
                    )}
                </Grid><br/>

{/*--------------------------- SIGN IN-OUT BUTTONS--------------------- */}

                <Button variant='contained' fullWidth type='submit' color='secondary' style={{padding:'10px 0'}}>
                    {isLogin ? 'Sign Up' : 'Sign In'}
                </Button>

                <span style={{fontSize:'19px',fontWeight:'500',padding:'5px 0',display:'flex',justifyContent:'center'}}>OR</span>
                <GoogleLogin
                  clientId= {clientId}
                  render={(renderProps)=>(
                    <Button
                      color='primary'
                      fullWidth
                      style={{padding:'10px 0'}}
                      variant='contained'
                      startIcon={<Icon/>}
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}>
                        Google 
                    </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailed}
                  cookiePolicy="single_host_origin"/>
                  
                <Grid container style={{display:'flex',justifyContent:'center',paddingTop:'5px'}}>
                    <Grid item>
                        <Button onClick={handleSwitchMode}>{isLogin ? 'Already have an account? Sign In':"Don't have an account? Sign Up "}</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth