import React,{useEffect, useState} from 'react'
import memories from '../../images/memories.png'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material'
import decode from 'jwt-decode'
import './navbar.css'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Navbar = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userProfile')))
    console.log('User',user)

    const logout = ()=>{
        dispatch({ type:'LOGOUT'})

        history.push('/auth')
        setUser(null)
    }

    useEffect(()=>{

      const token = user?.token

      if(token){
        const decodedToken = decode(token)

        if( decodedToken.exp * 1000 < new Date().getTime() ) return logout()
      }

      setUser(JSON.parse(localStorage.getItem('userProfile')))
    },[location])

  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
    <AppBar position='static' color='inherit' style={{marginTop:'30px', width:'80vw',borderRadius:'26px'}}>

        <div className='appbar'>
         
         <div style={{display:'flex',flexWrap:'wrap', marginLeft:'27px'}}>
         <Typography className='heading' sx={{fontSize:{xs:'39px'}}}>Memories</Typography>
         &nbsp;&nbsp;
          <img className='image' src={memories} alt='#' height='60' />
          </div>

         <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
          <Toolbar style={{marginRight:'17px'}}>
            {user ? (
                <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',width:'290px'}}>
                  
                    <Avatar src={user?.GoogleLoginResult?.imageUrl}></Avatar>
                    <Typography style={{fontWeight:'500',fontFamily:'inherit'}}>{user?.result?.name}</Typography>
                    
                    <Button variant='contained' color='secondary' onClick={logout}>Log Out</Button>
                </div>
            ):(
                <Link to={'/auth'} style={{textDecoration:'none'}}>
                <Button variant='contained' style={{textTransform:'uppercase'}}>Sign In</Button>
                </Link>
            )}
          </Toolbar>
          </div>
          </div>
        </AppBar>
      </div>
  )
}

export default Navbar