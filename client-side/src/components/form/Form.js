import React,{useState} from 'react'
import { Button, Paper, TextField, Typography, Avatar } from '@mui/material'
import './form.css'
import LockIcon from '@mui/icons-material/Lock';
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost } from '../../actions/posts'

const Form = () => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('userProfile'))

    const [postData, setPostData] = useState({
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    })



    const handleSubmit = (e)=>{
        e.preventDefault()

        if(postData.title === '' || postData.message === '' ){
            alert('Please fill in the details properly .!!!')
            dispatch('')

        } else {

        dispatch(createPost({ ...postData, name: user?.result?.name }))

        }
        setPostData({
            title:'',
            message:'',
            tags:'',
            selectedFile:''
        })
    }

    const clear = ()=>{
      setPostData({
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    })
    }

    
    if(!user){
      return (
        <Paper className='paper'>
          <div style={{display:'flex',justifyContent:'center'}}>
          <Avatar className='avatar'>
            <LockIcon color='secondary'/>
          </Avatar>
          </div>&nbsp;
          <Typography variant='h6' align='center'>
            Please Sign In or Sign Up to create your own memories...
          </Typography>
        </Paper>
      )
    }
  return (
    <Paper className='paper'>
        <form className='form' autoComplete='off' noValidate onSubmit={handleSubmit}>
            <Typography variant='h6' color='gray'>Create Memories</Typography>
            <br/>
          
            <TextField 
              label='Title' 
              variant='outlined' 
              fullWidth 
              value={postData.title} 
              onChange={(e)=> setPostData({...postData, title: e.target.value})}/> &nbsp;

            <TextField 
              label='Caption' 
              variant='outlined' 
              fullWidth 
              multiline
              rows={4}
              value={postData.message} 
              onChange={(e)=> setPostData({...postData, message: e.target.value})}/> &nbsp;

            <TextField 
              label='#tags' 
              variant='outlined' 
              fullWidth 
              value={postData.tags} 
              onChange={(e)=> setPostData({...postData,tags: e.target.value.split(',')})}/> &nbsp;

              
              <div className='fileInput'>
                <FileBase
                  type='file'
                  multiple={false}
                  onDone={({base64})=> setPostData({...postData, selectedFile: base64})}/>
              </div>
              <br/>
            <Button color='primary' variant='contained' size='large' type='submit' fullWidth>Create</Button>&nbsp;
            <Button color='secondary' variant='contained' size='large' onClick={clear} fullWidth>Clear</Button>
            
        </form>
    </Paper>
  )
}

export default Form