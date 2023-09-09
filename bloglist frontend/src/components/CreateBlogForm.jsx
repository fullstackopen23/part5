import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlogForm = ({createBlog, createFormRef, setBlogs, setMessage}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await createBlog({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      createFormRef.current.toggleVisibility()
      const res = await blogService.getAll()
      setBlogs(res)
      setMessage({ message: `a new blog ${title} by ${author} added`, error: false })
      setTimeout(() => {
        setMessage({ message: '', error: false })
      }, '3000')
    } catch(error) {
      console.log(error)
      setMessage({ message: 'error', error: true })
      setTimeout(() => {
        setMessage({ message: '', error: false })
      }, '3000')
    }
  }

  return (
    <form onSubmit={handleCreate}>
      <h2>create new</h2>
      <p>title: <input id="title" placeholder="title..." value={title} onChange={({ target }) => setTitle(target.value)}/></p>
      <p>author: <input id="author" placeholder="author..." value={author} onChange={({ target }) => setAuthor(target.value)}/></p>
      <p>url: <input id="url" placeholder="url..." value={url} onChange={({ target }) => setUrl(target.value)}/></p>
      <button id="createBtn">create</button>
    </form>
  )
}

export default CreateBlogForm