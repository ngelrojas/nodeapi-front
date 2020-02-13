import React from 'react'

class SignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      error: '',
      open: false,
    }
  }

  handleChange = name => event => {
    this.setState({error: ''})
    this.setState({
      [name]: event.target.value,
    })
  }

  signup = user => {
    return fetch('http://localhost:4001/signup', {
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

  handleSubmit = event => {
    event.preventDefault()
    const {name, email, password} = this.state
    const user = {
      name,
      email,
      password,
    }
    this.signup(user).then(data => {
      if (data.error) this.setState({error: data.error})
      else
        this.setState({
          error: '',
          name: '',
          email: '',
          password: '',
          open: true,
        })
    })
  }

  render() {
    const {name, email, password, error, open} = this.state
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">signup</h2>
        <div
          className="alert alert-danger"
          style={{display: error ? '' : 'none'}}>
          {error}
        </div>
        <div className="alert alert-info" style={{display: open ? '' : 'none'}}>
          New account is successfully created. Please Sign In.
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={this.handleChange('name')}
              type="text"
              value={name}
              className="form-control"
            />
          </div>
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
              value="signup"
              className="btn bt-raised btn-primary"
            />
          </div>
        </form>
      </div>
    )
  }
}

export default SignUp
