const Login = (props) => (
  <form onSubmit={props.handleLogin}>
    <h2>log in to application</h2>
    <p>username <input id="username" value={props.username} onChange={({ target }) => props.setUsername(target.value)} /></p>
    <p>password <input id="password" value={props.password} onChange={({ target }) => props.setPassword(target.value)} /></p>
    <button id="login-button">login</button>
  </form>
)

export default Login