import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from "../context"

const uniqid = require('uniqid');

const Animation = posed.div({

    visible : {
        opacity:1,
        applyAtStart : {
        display : "block"
        }
    },
    hidden:{
        opacity:0,
        applyAtEnd : {
        display : "none"
        }
    }
});

class AddUser extends Component {

    state = {
        visible : false ,
        name : "" ,
        department : "" ,
        salary : ""
    };

    changeVisibility = (e) => {

        this.setState({
            visible : !this.state.visible
        })
    }

    addUser = (dispatch,e) => {

        e.preventDefault()
        const {name,department,salary} = this.state;
        const newUser = {
            id : uniqid(),
            name,
            department,
            salary,   
        }
        dispatch ({type :"ADD_USER",payload:newUser})
        
    }

    changeInput = (e) => {

        this.setState ({

            [e.target.name] : e.target.value

        })


    }

    render() {
        const {visible,name,salary,department} = this.state;

        return (
        
        <UserConsumer>
            {
                value => {
                    const {dispatch} = value ;
                    console.log(value)
                    return (
                        <div className="col-md-8 mb-4">
            
                            <button onClick = {this.changeVisibility} className ="bt btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form"}</button>
                            <Animation pose = {visible ? "visible" : "hidden"}>
                                <div className ="card">
                                    <div className ="card-header">
                                        <h4>Add User From</h4>
                                    </div>
                                    <div className ="card-body">
                                        <form onSubmit = {this.addUser.bind(this,dispatch)}>
            
                                            <div className ="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input 
                                                type ="text" 
                                                className ="form-control" 
                                                name ="name" 
                                                id ="id" 
                                                placeholder ="Enter Name"
                                                value = {name}
                                                onChange = {this.changeInput}
                                                ></input>
                                                
            
                                            </div>
            
                                            <div className ="form-group">
            
                                                <label htmlFor="department">Departman</label>
                                                <input 
                                                type ="text" 
                                                className ="form-control" 
                                                name ="department" 
                                                id ="department" 
                                                placeholder ="Enter Department"
                                                value = {department}
                                                onChange = {this.changeInput}
                                                ></input>
            
                                            </div>
            
                                            <div className ="form-group">
            
                                                <label htmlFor="salary">Maaş</label>
                                                <input 
                                                type ="text" 
                                                className ="form-control" 
                                                name ="salary" id ="salary" 
                                                placeholder ="Enter Salary"
                                                value = {salary}
                                                onChange = {this.changeInput}
                                                ></input>
            
                                            </div>
                                            <button type ="submit" className ="btn btn-danger btn-block">Add User</button>
            
                                        </form>
                                    </div>
                                </div>
                            </Animation>
                        </div>
                    )

                }


            }



        </UserConsumer>

        )
        
    }
}

export default AddUser;
