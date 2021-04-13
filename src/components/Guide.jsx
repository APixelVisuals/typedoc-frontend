import React from "react";
import "./guide.scss";

const Guide = props => (
    <div id="guide-component" className={props.data.className} style={{ backgroundColor: props.colors.backgroundDark }} onClick={props.select}>

        <div className="guide-title">
            <img className="guide-title-icon" src={props.data.icon} />
            <p className="guide-title-text">{props.data.name}</p>
        </div>
        <p className="guide-description">{props.data.description}</p>

    </div>
);

export default Guide;