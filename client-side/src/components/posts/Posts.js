
import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import Post from './post/Post'
import { CircularProgress, Grid } from '@mui/material'
import './posts.css'
import Pagination from '@mui/material/Pagination'


const Posts = () => {
    const posts = useSelector((state)=> state.posts)
    console.log('Post Data',posts)

    const [currentPage, setCurrentPage] = useState(1);

    const postsPerpage = 8;

    const indexOflastProduct = currentPage * postsPerpage;
    const indexOfFirstProduct = indexOflastProduct - postsPerpage;
    const currentPosts = posts?.slice(indexOfFirstProduct, indexOflastProduct)

    const paginate =(e, value)=>{
        setCurrentPage(value)
    }

  return (
    <div className='posts'>
    {posts?.length === 0 ? <CircularProgress/>:(
      <Grid container  sx={{flexDirection:{xs:'column-reverse',md:'row', lg:'row'}}}>
        {currentPosts?.map(post =>(
        
        <Grid item  xs={12}  sm={12} md={6} key={post._id} style={{padding:'5px 10px'}}>
          <Post post={post}/>
        </Grid>
        ))}
      </Grid>
    )}
    
    <div style={{margin:'30px 0', display:'flex', justifyContent:'center'}}>
           <Pagination
             count={Math.ceil(posts?.length / postsPerpage)}
             
             size='large'
             page={currentPage}
             onChange={paginate}/>
            </div>
    </div>
  )
}

export default Posts