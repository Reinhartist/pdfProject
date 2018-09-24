import React, {Component} from 'react';
import * as PdfJs from 'pdfjs-dist/webpack';
import './pdfCSS.css';

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'N/A',
            page: null,
            width: 0,
            height: 0
        };
        this.canvas = React.createRef();
        this.textLayer = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.pdf !== nextProps.pdf || this.state.status !== nextState.status;
    }

    componentDidUpdate(nextProps) {
        this._update(nextProps.pdf);
    }

    componentDidMount() {
        this._update(this.props.pdf);
    }

    _update(pdf) {
        pdf ? this._loadPage(pdf) : this.setState({status: 'loading'});
    };

    _loadPage(pdf) {
        if (this.state.status === 'rendering' || this.state.page !== null) return;

        pdf.getPage(this.props.index).then(
            (page) => {
                this.setState({status: 'rendering'});
                this._renderPage(page);
            }
        );
    }

    _renderPage(page) {
        let viewport = page.getViewport(this.props.scale);
        this.canvas.width = 2 * viewport.width;
        this.canvas.height = 2 * viewport.height;

        page.render({
            canvasContext: this.canvas.getContext('2d'),
            viewport
        });

        page.getTextContent().then(textContent => {
            PdfJs.renderTextLayer({
                textContent,
                container: this.textLayer,
                viewport,
                textDivs: []
            });
        });

        this.setState({status: 'rendered', page: page, width: viewport.width, height: viewport.height});
    }

    render() {
        return (
            <div className="page" style={{width: this.state.width, height: this.state.height}}>
                <div className="canvasWrapper">
                    <canvas ref={(canvas) => this.canvas = canvas}/>
                </div>
                <div className="textLayer" ref={(div) => this.textLayer = div}/>
            </div>
        );
    }
}