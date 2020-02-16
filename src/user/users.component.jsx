import React from 'react'
import {list} from './apiUser.component'
import DefaultProfile from '../images/avatar.png'

class Users extends React.Component {
  constructor() {
    super()
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    list().then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({users: data})
      }
    })
  }

  renderUsers = users => (
    <div className="row">
      {users.map((user, i) => (
        <div key={i} className="card col-md-4" style={{width: '18rem'}}>
          <img
            className="card-img-top"
            src={DefaultProfile}
            style={{width: '100%', height: '15vw', objectFit: 'cover'}}
          />
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">{user.email}</p>
            <a href="#" class="btn btn-raised btn-small btn-primary">
              View Profile
            </a>
          </div>
        </div>
      ))}
    </div>
  )

  render() {
    const {users} = this.state
    return (
      <div className="container">
        <div className="mt-5 mb-5">Users</div>
        {this.renderUsers(users)}
      </div>
    )
  }
}

export default Users
