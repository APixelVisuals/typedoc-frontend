import React, { useState } from "react";
import "./sidebar.scss";

const Sidebar = props => {

    // Sidebar open
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div id="sidebar">

            <div className={`sidebar-menu-button ${sidebarOpen && "open"}`} onClick={() => setSidebarOpen(!sidebarOpen)}>
                <div className="line" />
                <div className="line" />
                <div className="line" />
            </div>

            <div className={`sidebar-content ${sidebarOpen && "open"}`} style={{ backgroundColor: props.colors.backgroundDark }}>

                <p className={`sidebar-title ${props.onTitleClick && "clickable"}`} style={{ color: props.colors.accent }} onClick={props.onTitleClick}>{props.title}</p>

                <div className="divider" style={{ backgroundColor: props.colors.background }} />

                <div className="search">
                    <p className="search-title" style={{ color: props.colors.text }}>Search</p>
                    <input type="text" className="search-bar" style={{ backgroundColor: props.colors.background }} onInput={e => props.search(e.target.value)} />
                </div>

                <div className="pages">
                    {props.content}
                </div>

            </div>

        </div>
    );
};

export default Sidebar;