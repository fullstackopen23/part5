import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setBlogs, handleLikeBtn }) => {

  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  function toggleShowDetails(e) {
    setShowDetails(!showDetails)
  }

  const handleRemove = async(blog) => {
    await blogService.remove(blog)
    const res = await blogService.getAll()
    setBlogs(res)
    console.log(res)
  }

  const showRemoveBtn = (blog) => {
    console.log(blog, user)
    if(blog.user.id === user.id) {
      return <button onClick={() => { handleRemove(blog) }}>remove</button>
    } else {
      return null
    }
  }

  if(showDetails) {
    return (
      <div className="blog" style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleShowDetails}>hide</button>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button id="likeBtn" onClick={() => { handleLikeBtn(blog) }}>like</button></p>
        <p>{blog.user.name}</p>
        {showRemoveBtn(blog)}
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className='blog'>
        {blog.title} {blog.author}
        <button id="viewBtn" onClick={toggleShowDetails}>view</button>
      </div>
    )
  }
}

export default Blog