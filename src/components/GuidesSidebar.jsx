import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";

const SidebarItem = props => (
    <button onClick={props.select}><div className="sidebar-item">
        <img src={props.data.icon} className="icon" />
        <p className="name">{props.data.name}</p>
    </div></button>
);

const GuidesSidebar = props => {

    // Search query
    const [searchQuery, setSearchQuery] = useState("");

    // Get guides
    let sections = JSON.parse(JSON.stringify(props.sections));

    sections.forEach(s => s.guides = s.guides.filter(g => {

        // Get names
        const itemName = g.name.toLowerCase().replace(/\s+/g, "");
        const searchQueryName = searchQuery.toLowerCase().replace(/\s+/g, "");

        // Return
        return itemName.includes(searchQueryName) || searchQueryName.includes(itemName);
    }));

    sections = sections.filter(s => s.guides.length);

    return (
        <Sidebar
            title="Guides"
            onTitleClick={props.onTitleClick}
            content={sections.map(s => (
                <>

                    <p className="sidebar-section-title" style={{ color: props.colors.text }}>{s.name}</p>

                    {s.guides.map(g => <SidebarItem data={g} select={() => props.select(g)} />)}

                </>
            ))}
            search={setSearchQuery}
            colors={props.colors}
        />
    );
};

export default GuidesSidebar;