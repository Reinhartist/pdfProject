import {Component} from "react";
import {Grid} from "react-bootstrap";
import TableComp from "../miniComps/tableComponent";
import React from "react";
import Navibar from "../miniComps/navbar";

export default class FileFinder extends Component {
    render() {
        return (
            <div>
                <Grid fluid>
                    <Navibar/>
                    <TableComp/>
                </Grid>
            </div>
        );
    }
}