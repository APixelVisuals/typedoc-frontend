import React from "react";
import highlightjs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/dracula.css";
import "./codeblock.scss";
highlightjs.registerLanguage("javascript", javascript);

const Codeblock = props => (
    <div id="codeblock" style={{ width: props.width }}>

        <div className="title-bar">

            <div className="title-bar-buttons">
                <div className="title-bar-button red" />
                <div className="title-bar-button yellow" />
                <div className="title-bar-button green" />
            </div>

            <p className="path">{props.path}</p>

        </div>

        <div className="codeblock-content" style={{ height: `calc(${props.height} - 45px)` }}>
            <pre className="codeblock-text" dangerouslySetInnerHTML={{ __html: highlightjs.highlight("javascript", props.content).value }} />
        </div>

    </div>
);

export default Codeblock;