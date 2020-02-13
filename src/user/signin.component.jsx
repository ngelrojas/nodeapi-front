import React from 'react'
import {Redirect} from 'react-router-dom'

class SignIn extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: '',
      redirectToReferer: false,
      loading: false,
    }
  }

  handleChange = name => event => {
    this.setState({error: ''})
    this.setState({
      [name]: event.target.value,
    })
  }

  signin = user => {
    return fetch('http://localhost:4001/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        return response.json()
      })
      .catch(err => console.log(err))
  }

  authenticate(jwt, next) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', JSON.stringify(jwt))
      next()
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({loading: true})
    const {email, password} = this.state
    const user = {
      email,
      password,
    }
    this.signin(user).then(data => {
      if (data.error) {
        this.setState({error: data.error, loading: false})
      } else {
        this.authenticate(data, () => {
          this.setState({redirectToReferer: true})
        })
      }
    })
  }

  render() {
    const {email, password, error, redirectToReferer, loading} = this.state

    if (redirectToReferer) {
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">SignIn</h2>
        <div
          className="alert alert-danger"
          style={{display: error ? '' : 'none'}}>
          {error}
        </div>
        {loading ? (
          <div className="jumbotron text-center">
            <h2>loading...</h2>
          </div>
        ) : (
          ''
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={this.handleChange('email')}
              type="email"
              value={email}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={this.handleChange('password')}
              type="password"
              value={password}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="signin"
              className="btn bt-raised btn-primary"
            />
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn
