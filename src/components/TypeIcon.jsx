import React from "react";
import "./typeIcon.scss";

const TypeIcon = props => (
    <div id="type-icon" className={props.large && "large"} style={{ backgroundColor: props.colors.background }}>
        <p className="letter" style={{ color: props.colors.accent }}>{props.letter}</p>
    </div>
);

export default TypeIcon;