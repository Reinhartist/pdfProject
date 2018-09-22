import React, {Component} from 'react';
import * as PdfJs from 'pdfjs-dist/webpack';
import Viewer from '../pdfHandling/pdfViewer';
import Navibar from "../miniComps/navbar";

const BASE_URL = 'http://localhost:8000/';

export default class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pdf: null,
            scale: 1.5,
            results: []
        };
    }
    componentDidMount() {
        this.setState({pdf: null});
        PdfJs.getDocument(BASE_URL + "read/" + this.props.match.params.id)
            .then((pdf) => this.setState({pdf: pdf}));
    }

    render() {
        return (
            <div>
                <Navibar/>
                <Viewer pdf={this.state.pdf} scale={this.state.scale}/>
            </div>
        );
    }
}