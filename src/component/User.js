import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from "../context"
import { Popover, Button } from 'antd'

class User extends Component {
    
    state = {

        isVisible : false,
        isEditClicked: false,
        currentSalary: '',
        currentDepartment: ''

    };

    static defaultProps = {

        name : "Bilgi Yok",
        department : "Bilgi Yok",
        salary : "Bilgi Yok"
    
    };

    onClickEvent = (e) => {

        this.setState({
            isVisible : !this.state.isVisible,
            isEditClicked: false
        })

    }

    onDeleteUser = (dispatch,e) => {

        const {id} = this.props;


        dispatch({type : "DELETE_USER",payload:id});

        // Consumer Dispash
    }

    onEditUser = () => {
        if (!this.state.isVisible) {
            this.onClickEvent()
        } 
        this.toggleEditState()

    }

    toggleEditState = () => {
        this.setState(prevState => ({
            isEditClicked: !prevState.isEditClicked
        }))
    }

    saveEditedUser = (dispatch) => {
        dispatch({type: 'EDIT_USER', payload: {id: this.props.id, salary: this.state.currentSalary, department: this.state.currentDepartment}})
        this.toggleEditState()
    }

    onDepartmentChange = (e) => {
        this.setState({
            currentDepartment: e.target.value
        })
    }

    onSalaryChange = (e) => {
        this.setState({
            currentSalary: e.target.value
        })
    }

    render() {

        //Destructing
        const {name,department,salary} = this.props;
        const {isVisible, isEditClicked} = this.state;
        const popoverContent = (dispatch) => (<div>
            <p>Silmek istediğinizden emin misiniz?</p>
            <Button type="danger" onClick = {this.onDeleteUser.bind(this, dispatch)}>Evet</Button>
        </div>)

        return (
        <UserConsumer>


            {
                value => 
                {
                    const {dispatch} = value ;

                    return (
                        <div className = "col-md-8 mb-4" >
                            <div className ="card" style = {isVisible ? {backgroundColor : "#b2d0e8" , color : "white"} : null}>
                                <div className ="card-header d-flex justify-content-between">

                                    <h4 className = "d-inline" onClick = {this.onClickEvent}>{name}</h4>
                                    <div>
                
                                        <Button style = {{cursor : "pointer", marginRight: '1rem'}} onClick = {this.onEditUser.bind(this,dispatch)} icon="edit"></Button>
                                        <Popover content={popoverContent(dispatch)} title="Title" trigger="click">
                                            <Button type="danger" style = {{cursor : "pointer"}} icon="delete"></Button>
                                        </Popover>

                                    </div>
                                                                        
                                </div>
                                {isVisible ? 
                                <div className = "card-body">
                                    <p className ="card-text">Maaş : {isEditClicked ? <input onChange={this.onSalaryChange} placeholder={salary} /> : salary}</p>
                                    <p className ="card-text">Departman : {isEditClicked ? <input onChange={this.onDepartmentChange} placeholder={department} /> : department}</p>
                                    {isEditClicked ? <button onClick={this.saveEditedUser.bind(this, dispatch)}>Kaydet</button> : null}

                                </div>:null
                                
                                }
                                    
                            </div>        
                        </div>
                        ) 

                }
            }

        </UserConsumer>
        )
       
    }
}

User.propTypes = {

    name : PropTypes.string.isRequired,
    department : PropTypes.string.isRequired,
    salary : PropTypes.string.isRequired,
    

}


export default User;