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
    const functions = props.docs && props.docs.functions.length && [{ name: "Functions" }].filter(searchFilter);
    const interfaces = props.docs && props.docs.interfaces.filter(searchFilter);
    const typeAliases = props.docs && props.docs.typeAliases.length && [{ name: "Type Aliases" }].filter(searchFilter);

    return (
        <Sidebar
            title="Documentation"
            content={props.docs && (
                <>

                    {(classes && classes.length) ? (
                        <>

                            <p className="sidebar-section-title" style={{ color: props.colors.text }}>Classes</p>

                            {classes.map(c => (
                                <button onClick={() => props.setPath(`/classes/${c.name}`)}><div className="sidebar-item">
                                    <TypeIcon letter="C" colors={props.colors} />
                                    <p className="name">{c.name}</p>
                                </div></button>
                            ))}

                        </>
                    ) : null}

                    {(functions && functions.length) ? (
                        <>

                            <p className="sidebar-section-title" style={{ color: props.colors.text }}>Functions</p>

                            <button onClick={() => props.setPath("/functions")}><div className="sidebar-item">
                                <TypeIcon letter="F" colors={props.colors} />
                                <p className="name">Functions</p>
                            </div></button>

                        </>
                    ) : null}

                    {(interfaces && interfaces.length) ? (
                        <>

                            <p className="sidebar-section-title" style={{ color: props.colors.text }}>Interfaces</p>

                            {interfaces.map(i => (
                                <button onClick={() => props.setPath(`/interfaces/${i.name}`)}><div className="sidebar-item">
                                    <TypeIcon letter="I" colors={props.colors} />
                                    <p className="name">{i.name}</p>
                                </div></button>
                            ))}

                        </>
                    ) : null}

                    {(typeAliases && typeAliases.length) ? (
                        <>

                            <p className="sidebar-section-title" style={{ color: props.colors.text }}>Type Aliases</p>

                            <button onClick={() => props.setPath("/typeAliases")}><div className="sidebar-item">
                                <TypeIcon letter="T" colors={props.colors} />
                                <p className="name">Type Aliases</p>
                            </div></button>

                        </>
                    ) : null}

                </>
            )}
            search={setSearchQuery}
            colors={props.colors}
        />
    );
};

export default DocsSidebar;