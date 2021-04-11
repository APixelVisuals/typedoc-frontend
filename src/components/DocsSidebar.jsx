import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import TypeIcon from "./TypeIcon.jsx";

const DocsSidebar = props => {

    // Search query
    const [searchQuery, setSearchQuery] = useState("");

    // Search filter
    const searchFilter = item => {

        // Get names
        const itemName = item.name.toLowerCase().replace(/\s+/g, "");
        const searchQueryName = searchQuery.toLowerCase().replace(/\s+/g, "");

        // Return
        return itemName.includes(searchQueryName) || searchQueryName.includes(itemName);
    };

    // Get items
    const classes = props.docs && props.docs.classes.filter(searchFilter);
    const functions = props.docs && [{ name: "Functions" }].filter(searchFilter);
    const interfaces = props.docs && props.docs.interfaces.filter(searchFilter);
    const typeAliases = props.docs && [{ name: "Type Aliases" }].filter(searchFilter);

    return (
        <Sidebar
            title="Documentation"
            content={props.docs && (
                <>

                    {classes && classes.length && (
                        <>

                            <p className="sidebar-section-title">Classes</p>

                            {classes.map(c => (
                                <button onClick={() => props.setPath(`/classes/${c.name}`)}><div className="sidebar-item">
                                    <TypeIcon letter="C" />
                                    <p className="name">{c.name}</p>
                                </div></button>
                            ))}

                        </>
                    )}

                    {functions && functions.length && (
                        <>

                            <p className="sidebar-section-title">Functions</p>

                            <button onClick={() => props.setPath("/functions")}><div className="sidebar-item">
                                <TypeIcon letter="F" />
                                <p className="name">Functions</p>
                            </div></button>

                        </>
                    )}

                    {interfaces && interfaces.length && (
                        <>

                            <p className="sidebar-section-title">Interfaces</p>

                            {interfaces.map(i => (
                                <button onClick={() => props.setPath(`/interfaces/${i.name}`)}><div className="sidebar-item">
                                    <TypeIcon letter="I" />
                                    <p className="name">{i.name}</p>
                                </div></button>
                            ))}

                        </>
                    )}

                    {typeAliases && typeAliases.length && (
                        <>

                            <p className="sidebar-section-title">Type Aliases</p>

                            <button onClick={() => props.setPath("/typeAliases")}><div className="sidebar-item">
                                <TypeIcon letter="T" />
                                <p className="name">Type Aliases</p>
                            </div></button>

                        </>
                    )}

                </>
            )}
            search={setSearchQuery}
        />
    );
};

export default DocsSidebar;