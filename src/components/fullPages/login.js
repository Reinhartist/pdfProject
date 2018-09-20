import React, { Component } from 'react';
import {Button, Form, FormControl, FormGroup, Table, ControlLabel} from 'react-bootstrap';
import axios from 'axios';
import BASE_URL from '../constants'

export default class Login extends Component{
    searchUser() {
        //TODO: axios setup
        document.getElementById("username");
    }

    render(){
        var padding = {
            padding: 40,
            maxWidth: 500
        }

        var minPadding = {
            padding: 15
        }
        return(
            <div style={padding}>
                <Form action="/login" method="post">
                    <ControlLabel>Username:</ControlLabel>
                    <FormControl
                        id="username"
                        type="text"
                    />
                    <ControlLabel>Password:</ControlLabel>
                    <FormControl
                        id="password"
                        type="text"
                    />
                    <br></br>
                    <Button style={minPadding} type="submit">Log in</Button>
                </Form>
            </div>
        );
    }
}