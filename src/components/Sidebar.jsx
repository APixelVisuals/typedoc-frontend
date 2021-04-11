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

            <div className={`sidebar-content ${sidebarOpen && "open"}`}>

                <p className={`sidebar-title ${props.onTitleClick && "clickable"}`} onClick={props.onTitleClick}>{props.title}</p>

                <div className="divider" />

                <div className="search">
                    <p className="search-title">Search</p>
                    <input type="text" className="search-bar" onInput={e => props.search(e.target.value)} />
                </div>

                <div className="pages">
                    {props.content}
                </div>

            </div>

        </div>
    );
};

export default Sidebar;