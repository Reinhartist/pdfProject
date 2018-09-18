import React, {Component} from 'react';
import axios from 'axios';
import {Button, Form, FormControl, FormGroup, Table} from 'react-bootstrap';
import { Link } from "react-router-dom";

const BASE_URL = 'http://localhost:8000/';
export default class tableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pdf: null,
            scale: 1.5,
            results: []
        };
        this.fileSearch = this.fileSearch.bind(this);
        this.fileDelete = this.fileDelete.bind(this);
        this.filePost = this.filePost.bind(this);
    }
    filePost() {
        let formData = new FormData();
        formData.append("load", document.getElementById("int").files[0]);
        formData.append("filename", document.getElementById("filename").value);
        axios.post(BASE_URL + "create", formData).then(res => {
            this.state.results.unshift(res.data);
            this.setState({results: this.state.results});
        });
        document.getElementById("int").value = null;
        document.getElementById("filename").value = "";
    }
    fileSearch() {
        axios.get(BASE_URL + "find/filename/" + document.getElementById("fileSearch").value + "/forever")
            .then(res => this.setState({results: res.data}));
    }
    fileDelete(id, index) {
        axios.delete(BASE_URL + "delete/" + id).then(res => {
            this.state.results.splice(index, 1);
            this.setState({results: this.state.results});
        });
    }
    render() {
        return (
            <div className = "table">
                <Form inline>
                    <FormGroup>
                        <FormControl id="int" type="file" accept = ".pdf" />
                        <FormControl id="filename" placeholder="File name"/>
                        <Button onClick={this.filePost}>Create</Button>
                    </FormGroup>
                </Form>
                <div className="input-group mb-3">
                    <input id = "fileSearch" type = "text" placeholder = "Search for a file"/>
                    <Button bsSize = "small" bsStyle = "primary"
                            onClick = {this.fileSearch}>Search</Button>
                </div>
                    <Table responsive striped bordered hover>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>File Size</th>
                        <th>Upload Date</th>
                        <th>Tags</th>
                        <th>View</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.results.map((result, index) =>
                            <tr key={index}>
                                <td>
                                    {result.filename}
                                </td>
                                <td>
                                    {result.chunkSize}
                                </td>
                                <td>
                                    {(new Date(result.uploadDate)).toString()}
                                </td>
                                <td>
                                    {JSON.stringify(result.meta)}
                                </td>
                                <td>
                                    <Link to={"/fileRead/" + result._id} > View </Link>
                                </td>
                                <td>
                                    <button onClick={() => this.fileDelete(result._id, index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}
