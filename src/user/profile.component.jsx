import React from 'react'
import {isAuthenticated} from '../auth/auth.component'
import {Redirect, Link} from 'react-router-dom'
import {read} from './apiUser.component'

class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      user: '',
      redirectToSignin: false,
    }
  }

  init = userId => {
    const token = isAuthenticated().token
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({redirectToSignin: true})
      } else {
        this.setState({user: data})
      }
    })
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.init(userId)
  }

  render() {
    const {redirectToSignin, user} = this.state
    if (redirectToSignin) {
      return <Redirect to="/signin" />
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mt-5 mb-5">Profile</h2>
            <p>hello: {isAuthenticated().user.name}</p>
            <p>email: {isAuthenticated().user.email}</p>
            <p>{`Joined ${new Date(
              this.state.user.created,
            ).toDateString()}`}</p>
          </div>
          <div className="col-md-6">
            {isAuthenticated().user && isAuthenticated().user._id == user._id && (
              <div className="d-inline-block mt-5">
                <Link
                  className="btn btn-raised btn-success mr-5"
                  to={`/user/edit/${user._id}`}>
                  Edit Profile
                </Link>
                <button className="btn btn-raised btn-danger">
                  Delete Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
