import React from "react";
import "./typeIcon.scss";

const TypeIcon = props => (
    <div id="type-icon" className={props.large && "large"}>
        <p className="letter">{props.letter}</p>
    </div>
);

export default TypeIcon;