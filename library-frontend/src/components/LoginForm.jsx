import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries/auth"
import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom"

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const userData = JSON.stringify(result.data.login)
      setToken(userData)
      localStorage.setItem('library-user-data', userData)
      navigate('/books')
    }
  }, [result.data, setToken, navigate])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  setError: PropTypes.func,
  setToken: PropTypes.func
}

export default LoginForm