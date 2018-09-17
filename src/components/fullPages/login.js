import React, { Component } from 'react';

export default class Login extends Component{
    render(){
        return(
            <div>
                <form action="/login">
                    <input type="text" name="name" placeholder="Enter name" />
                    <input type="text" name="password" placeholder="Enter Password" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}