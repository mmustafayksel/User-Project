import React, { Component } from 'react'
// import User from './component/User';

const UserContext = React.createContext();

const reducer = (state,action) => {
  switch(action.type){
    case "DELETE_USER" :
      return {
        ...state,
        users: state.users.filter(user => action.payload !== user.id)
      }
    case "ADD_USER":
      return{
        ...state,
        users : [...state.users,action.payload]
      }
    default:
      return state;
    
  }
}

export class UserProvider extends Component {

  state = {

      users:[
  
        {
          id:1,
          name:"Mustafa Murat Coşkun",
          salary:"4000",
          department:"Bilişim",
        },
        {
          id:2,
          name:"Mustafa Yüksel",
          salary:"2000",
          department:"İnşaat Mühendisi"
        },
        {
          id:3,
          name:"İrem Mazharoğlu",
          salary:"7000",
          department:"Pazarlama"
        }
      ],
      dispatch : action => {
        this.setState(state =>reducer(state,action))
      }
    }

  render() {
    return (

      <UserContext.Provider value = {this.state}>

        {this.props.children} 

      </UserContext.Provider>

    )
  }
}

const UserConsumer = UserContext.Consumer ;

export default UserConsumer ; 