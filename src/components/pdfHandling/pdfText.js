import React, { Component } from 'react';
let PDFJS = require('pdfjs-dist');

export default class PdfViewer extends Component{
    constructor(){
        super();
        this.state = {
            txt: null
        };
        this.getpdftext = this.getpdftext.bind(this);
    }
    gettext(pdfUrl){
        let pdf = PDFJS.getDocument(pdfUrl);
        return pdf.then(function(pdf) { // get all pages text
            let maxPages = pdf.pdfInfo.numPages;
            let countPromises = []; // collecting all page promises
            for (let j = 1; j <= maxPages; j++) {
                let page = pdf.getPage(j);
                let txt = "";
                countPromises.push(page.then(function(page) { // add page promise
                    let textContent = page.getTextContent();
                    return textContent.then(function(text){ // return content promise
                        return text.items.map(function (s) { return s.str; }).join(''); // value page text
                    });
                }));
            }
            // Wait for all pages and join text
            return Promise.all(countPromises).then(function (texts) {
                return texts.join('');
            });
        });
    }
    getpdftext(){this.gettext("http://localhost:8000/read/5b97c812547361151081d1c9").then(text => {
        console.log('parse ' + text);
        this.setState({ txt: text });
    }, function (reason) {
        console.error(reason);
    })};
    render(){
        this.getpdftext();
        return(
            <div>
                {this.state.txt}
            </div>
        )
    }
}