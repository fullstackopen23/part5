import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({})

  const createFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if(loggedInUser) {
      setUser(JSON.parse(loggedInUser))
      blogService.setToken(JSON.parse(loggedInUser).token)
    }
  }, [])

  const sort = () => {
    const test = blogs.sort((a, b) => {
      return b.likes - a.likes
    })

    console.log(test)
  }

  const handleLikeBtn = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      await blogService.put(updatedBlog)
      const res = await blogService.getAll()
      setBlogs(res)
      console.log(res)
    } catch(error) {
      console.log("Error by handling like", error)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      console.log(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername(null)
      setPassword(null)
    } catch (exception) {
      console.log('error wrong credentials')
      setMessage({ message: 'wrong username or password', error: true })
      setTimeout(() => {
        setMessage({ message: '', error: false })
      }, '3000')
    }
  }

  const handleLogOut = async (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const createBlog = async (blog) => {
    return blogService.post(blog)
  }


  if(user === null) {
    return (
      <>
        {message.message}
        <Login username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword}/>
      </>
    )
  } else {
    return (
      <>
        <h2>blogs</h2>
        {message.message}
        <p>{user.name} logged in <button onClick={handleLogOut}>log out</button></p>

        <Togglable buttonLabel={'new blog'} ref={createFormRef}>
          <CreateBlogForm createBlog={createBlog} createFormRef={createFormRef} setMessage={setMessage} setBlogs={setBlogs} user={user}/>
        </Togglable>

        <div className='blogs'>
          {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
            <Blog handleLikeBtn={handleLikeBtn} setBlogs={setBlogs} user={user} key={blog.id} blog={blog} />
          )}
        </div>

        <button onClick={sort}>sort</button>
      </>
    )
  }
}


export default App