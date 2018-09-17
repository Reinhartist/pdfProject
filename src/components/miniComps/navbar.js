import React from 'react';
import { Link } from "react-router-dom";
import {Navbar, NavbarBrand} from 'reactstrap';

export default class Navibar extends React.Component {

    render() {
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand><Link to="/"> PDFManager </Link> </NavbarBrand>
                <NavbarBrand><Link to="/login"> Login </Link> </NavbarBrand>
            </Navbar>
        );
    }
}