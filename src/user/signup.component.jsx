import React from 'react'

class SignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      error: '',
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const {name, email, password} = this.state
    const user = {
      name,
      email,
      password,
    }
    fetch('http://localhost:4001/signup', {
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

  render() {
    const {name, email, password} = this.state
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">signup</h2>
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
