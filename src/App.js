import React, { Component } from 'react';
import FileFinder from './components/fullPages/fileListPage';
import Login from './components/fullPages/login';
import demo from './components/fullPages/demoPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Switch from "react-router-dom/es/Switch";

export default class App extends Component {
    render() {
        return (
            <div>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
                      integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
                      crossOrigin="anonymous"/>
                <Router>
                    <Switch>
                        <Route path="/" exact component = {FileFinder} />
                        <Route path="/login" component = {Login} />
                        <Route path="/fileRead/:id" component = {demo} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

