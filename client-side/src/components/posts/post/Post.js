import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from '@mui/material'
import moment from 'moment'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import './post.css'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';


const Post = ({post}) => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('userProfile'))

  const LikeLogic = ()=>{
    if(post.likes.length > 0){
      return post.likes.find((like)=> like === (user?.result?.googleId || user?.result?._id) ) ?
      (
        <>
        <ThumbUpIcon/>&nbsp;{`${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ):(
        <>
        <ThumbUpAltOutlinedIcon/>&nbsp;{post.likes.length}
        </>
      )
    }
    return <><ThumbUpAltOutlinedIcon/>&nbsp;Like</>
  }
  

  return (
    <Card className='card' sx={{width:{xs:'100%', md:'100%', lg:'100%',sm:'100%'}}}>
      
      <CardMedia >
        <h3 style={{color:'gray', padding:'0 20px', textTransform:'capitalize'}}>{post.name}</h3>
      <img src={post.selectedFile} width='100%' style={{}}/>
      </CardMedia>
      <div style={{display:'flex', justifyContent:'space-between', padding:'10px 10px 0 10px'}}>
      <div className='overlay'>
        <Typography variant='h5' style={{fontFamily:'cursive', textTransform:'capitalize'}}>{post.title}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className='overlay2'> 
        <Button onClick={()=>{ }} size='small' style={{color:'black'}}>
          <MoreHorizIcon fontSize='medium'/>
        </Button>
      </div>
      </div>
      <div className='details'>
        <Typography variant='body2' color='textSecondary'>{post.tags.map(tag => `#${tag} `)}</Typography>
      </div>
      <CardContent>
        <Typography variant='body2' color='gray' gutterBottom>{post.message}</Typography>
      </CardContent>
      <CardActions className='actions'>

        <Button size='small' color='primary' disabled={!user?.result} 
        onClick={()=>{ dispatch(likePost(post._id)) }}>  
          <LikeLogic/>
        </Button>

        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) ? 
        
        (<Button size='small' color='primary'
         onClick={()=>{ dispatch(deletePost(post._id))}}>
          <DeleteIcon fontSize='small'/> Delete
        </Button>) :
        (
          <Button size='small' disabled={true}
         onClick={()=>{ dispatch(deletePost(post._id))}}>
          <DeleteIcon fontSize='small'/> Delete
        </Button>
        )}
      </CardActions>
      
    </Card>
  )
}

export default Post