import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ToggleSwitch from "react-switch";
import DocsSidebar from "./DocsSidebar.jsx";
import TypeIcon from "./TypeIcon.jsx";
import fetchDocs from "../scripts/fetchDocs";
import "./docs.scss";

const Docs = props => {

    // Docs
    const [docs, setDocs] = useState();
    const [docsData, setDocsData] = useState();
    const [docsType, setDocsType] = useState();
    const [displayPrivateProperties, setDisplayPrivateProperties] = useState(false);

    // Set path
    const setPath = (path, parsedDocs = docs) => {

        // Default path
        if (path === "/") path = props.defaultPath;

        // Set url
        window.history.pushState(null, null, `/docs${path}`);

        // Get docs type
        let thisDocsType;
        if (path.startsWith("/classes/")) thisDocsType = "class";
        else if (path.startsWith("/functions")) thisDocsType = "functions";
        else if (path.startsWith("/interfaces/")) thisDocsType = "interface";
        else if (path.startsWith("/typeAliases")) thisDocsType = "typeAliases";

        // Get docs data
        let thisDocsData;
        let parsedPath = path.split("/")[2];
        if (parsedPath) parsedPath = parsedPath.split("#")[0];

        if (thisDocsType === "class") thisDocsData = parsedDocs.classes.find(c => c.name === parsedPath);
        else if (thisDocsType === "functions") thisDocsData = parsedDocs.functions;
        else if (thisDocsType === "interface") thisDocsData = parsedDocs.interfaces.find(i => i.name === parsedPath);
        else if (thisDocsType === "typeAliases") thisDocsData = parsedDocs.typeAliases;

        // No data
        if ((!thisDocsData) || (thisDocsData.length === 0)) return setPath("/", parsedDocs);

        // Set docs data
        setDocsData(thisDocsData);
        setDocsType(thisDocsType);

        // Jump
        const scrollToElement = document.querySelector(`[data-name="${path.split("#")[1]}"]`);
        if (scrollToElement) window.scrollTo({
            top: scrollToElement.getBoundingClientRect().top + window.pageYOffset - 100,
            behavior: "smooth"
        });
    };

    // Set jump
    const setJump = jump => {

        // Get path
        const path = (window.location.href.split("/docs")[1] || "/").split("#")[0];

        // Set path
        setPath(`${path}#${jump}`);
    };

    // Type link
    const typeLink = type => {

        // Built in type
        if (type === "string") return <a className="type-link" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank">string</a>;
        else if (type === "number") return <a className="type-link" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number" target="_blank">number</a>;
        else if (type === "boolean") return <a className="type-link" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank">boolean</a>;
        else if (type === "undefined") return <a className="type-link" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined" target="_blank">undefined</a>;
        else if (type === "null") return <a className="type-link" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null" target="_blank">null</a>;
        else if (type === "Array") return <a className="type-link" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank">Array</a>;
        else if (type === "Promise") return <a className="type-link" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank">Promise</a>;
        else if (type === "Buffer") return <a className="type-link" href="https://nodejs.org/api/buffer.html" target="_blank">Buffer</a>;
        else if (type === "this") return "this";

        // Parse reference
        if (docs.references[type]) type = docs.references[type];

        // Custom type
        if (docs.classes.find(c => c.name === type)) return <p className="type-link" onClick={() => setPath(`/classes/${type}`)}>{type}</p>;
        else if (docs.interfaces.find(c => c.name === type)) return <p className="type-link" onClick={() => setPath(`/interfaces/${type}`)}>{type}</p>;
        else if (docs.typeAliases.find(c => c.name === type)) return <p className="type-link" onClick={() => setPath(`/typeAliases#${type}`)}>{type}</p>;

        // None
        else return type;
    };

    // Type string
    const typeString = type => {

        // Type sorting order
        const typeOrder = ["string", "number", "boolean", "null", "undefined"];

        // Parse
        if (!type.type) return typeLink(type.data);
        else if (type.type === "array") return <p className="type-group">{typeString(type.data)}[]</p>;
        else if (type.type === "union") return <p className="type-group">{type.data.sort((a, b) => typeOrder.indexOf(a.data) < typeOrder.indexOf(b.data) ? -1 : 1).map(t => typeString(t)).reduce((e, acc) => [e, " | ", acc])}</p>;
        else if (type.type === "function") return <p className="type-group">({type.parameters.map(p => <p>{p.name}{p.optional ? "?" : ""}: {typeString(p.type)}</p>).reduce((e, acc) => [e, ", ", acc])}) =&gt; {typeString(type.returnType)}</p>;
        else if (type.type === "reference") return <p className="type-group">{type.arguments ? <span>{typeLink(type.data)}&lt;{type.arguments.map(t => typeString(t)).reduce((e, acc) => [e, ", ", acc])}&gt;</span> : typeLink(type.data)}</p>;
        else if (type.type === "conditional") return console.log(type.trueType, type.falseType) || <p className="type-group">{typeString(type.trueType)} | {typeString(type.falseType)}</p>;
        else if (type.type === "typeParameter") return <p className="type-group">{type.extends ? typeString(type.extends) : type.data}</p>;
        else if (type.type === "void") return "void";
        else if (type.type === "stringLiteral") return type.data;
        else if (type.type === "booleanLiteral") return type.data;
    };

    // Markdown renderers
    const renderers = {
        inlineCode: elementProps => (
            <code style={{ backgroundColor: props.colors.codeblockBackground }}>{elementProps.children}</code>
        )
    };

    // On load
    useEffect(() => {
        (async () => {

            // Fetch docs
            const fetchedDocs = await fetchDocs(props.url);

            // Set docs
            setDocs(fetchedDocs);

            // Set path
            setPath(window.location.href.split("/docs")[1] || "/", fetchedDocs);
        })();
    }, []);

    return (
        <div id="docs">

            <DocsSidebar docs={docs} setPath={setPath} colors={props.colors} />

            {(docsData && docsType) && (
                <div className="content">

                    <div className="title-wrapper">

                        <div className="title">

                            <TypeIcon letter={docsType.charAt(0).toUpperCase()} large={true} colors={props.colors} />

                            <div className="title-text">

                                {docsData.name && <h2 className="text" style={{ color: props.colors.accent }}>{docsData.name}</h2>}
                                {docsType === "functions" && <h2 className="text" style={{ color: props.colors.accent }}>Functions</h2>}
                                {docsType === "typeAliases" && <h2 className="text" style={{ color: props.colors.accent }}>Type Aliases</h2>}

                                {docsData.extends && (
                                    <p className="extends"><span>Extends</span> {typeString(docsData.extends)}</p>
                                )}

                            </div>

                        </div>

                        {["class", "interface"].includes(docsType) && (
                            <div className="private-properties">

                                <p className="text" style={{ color: props.colors.accent }}>Private Properties</p>
                                <ToggleSwitch
                                    checked={displayPrivateProperties}
                                    onChange={() => setDisplayPrivateProperties(!displayPrivateProperties)}
                                    onColor={props.colors.accent}
                                    offColor={props.colors.backgroundDark}
                                    onHandleColor="#000000"
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                    activeBoxShadow={null}
                                    className="toggle-switch"
                                />

                            </div>
                        )}

                    </div>

                    {docsData.comment && (
                        <ReactMarkdown source={docsData.comment} className="title-comment" renderers={renderers} />
                    )}

                    <div className="divider" style={{ backgroundColor: props.colors.background }} />

                    {docsType === "class" && (
                        <div className="class">

                            <div className="table-of-contents">

                                <div className="table-of-contents-section">

                                    <div className="name" style={{ backgroundColor: props.colors.background }} onClick={() => setJump("properties")}><p className="text" style={{ color: props.colors.accent }}>Properties</p></div>

                                    <div className="section-content" style={{ backgroundColor: props.colors.backgroundDark }}>

                                        {docsData.properties.filter(p => displayPrivateProperties || !p.private).map(p => (
                                            <p className="section-item" onClick={() => setJump(p.name)}>{p.name}</p>
                                        ))}

                                        {!docsData.properties.filter(p => displayPrivateProperties || !p.private).length && (
                                            <p className="section-no-items" style={{ color: props.colors.textLight }}>No Properties</p>
                                        )}

                                    </div>

                                </div>

                                <div className="table-of-contents-section">

                                    <div className="name" style={{ backgroundColor: props.colors.background }} onClick={() => setJump("methods")}><p className="text" style={{ color: props.colors.accent }}>Methods</p></div>

                                    <div className="section-content" style={{ backgroundColor: props.colors.backgroundDark }}>

                                        {docsData.methods.filter(m => displayPrivateProperties || !m.private).map(m => (
                                            <p className="section-item" onClick={() => setJump(m.name)}>{m.name}</p>
                                        ))}

                                        {!docsData.methods.filter(m => displayPrivateProperties || !m.private).length && (
                                            <p className="section-no-items" style={{ color: props.colors.textLight }}>No Methods</p>
                                        )}

                                    </div>

                                </div>

                                {docsData.events && (
                                    <div className="table-of-contents-section">

                                        <div className="name" style={{ backgroundColor: props.colors.background }} onClick={() => setJump("events")}><p className="text" style={{ color: props.colors.accent }}>Events</p></div>

                                        <div className="section-content" style={{ backgroundColor: props.colors.backgroundDark }}>

                                            {docsData.events.map(e => (
                                                <p className="section-item" onClick={() => setJump(e.name)}>{e.name}</p>
                                            ))}

                                            {!docsData.events.length && (
                                                <p className="section-no-items" style={{ color: props.colors.textLight }}>No Events</p>
                                            )}

                                        </div>

                                    </div>
                                )}

                            </div>

                            <div className="section" data-name="properties">

                                <p className="name" style={{ color: props.colors.accent }}>Properties</p>

                                {docsData.properties.filter(p => displayPrivateProperties || !p.private).map(p => (
                                    <div className="property" data-name={p.name}>

                                        <div className="property-name">
                                            <p className="section-item-name" onClick={() => setJump(p.name)}><span style={{ color: props.colors.textLight }}>{docsData.name}</span>.{p.name}{p.optional ? "?" : ""}</p>
                                            <p className="type">{typeString(p.type)}</p>
                                        </div>

                                        <div className="section-content">
                                            <ReactMarkdown source={p.comment} className="comment" renderers={renderers} />
                                        </div>

                                    </div>
                                ))}

                                {!docsData.properties.filter(p => displayPrivateProperties || !p.private).length && (
                                    <p className="section-no-items" style={{ color: props.colors.textLight }}>No Properties</p>
                                )}

                            </div>

                            <div className="section" data-name="methods">

                                <p className="name" style={{ color: props.colors.accent }}>Methods</p>

                                {docsData.methods.filter(m => displayPrivateProperties || !m.private).map(m => (
                                    <div className="method" data-name={m.name}>

                                        <p className="section-item-name" onClick={() => setJump(m.name)}><span style={{ color: props.colors.textLight }}>{docsData.name}</span>.{m.name}({m.parameters.length ? m.parameters.map(p => <span style={{ color: props.colors.textLighter }}>{p.name}{p.optional ? "?" : ""}</span>).reduce((e, acc) => [e, ", ", acc]) : null}) {m.private && <span className="tag" style={{ backgroundColor: props.colors.background }}>Private</span>} {m.static && <span className="tag" style={{ backgroundColor: props.colors.background }}>Static</span>}</p>

                                        <div className="section-content">

                                            <ReactMarkdown source={m.comment} className="comment" renderers={renderers} />

                                            <div className="parameters">
                                                {m.parameters.map(p => (
                                                    <div className="parameter">
                                                        <div className="parameter-title">
                                                            <p className="parameter-name" style={{ color: props.colors.textLighter }}>{p.name}{p.optional ? "?" : ""}</p>
                                                            <p className="type">{typeString(p.type)}</p>
                                                        </div>
                                                        <ReactMarkdown source={p.comment} className="comment small" renderers={renderers} />
                                                    </div>
                                                ))}
                                            </div>

                                            {typeString(m.returnType) !== "void" && (
                                                <div className="returns">
                                                    <p className="returns-text"><span style={{ color: props.colors.textLight }}>Returns</span> {typeString(m.returnType)}</p>
                                                    <ReactMarkdown source={m.returnComment} className="comment small" renderers={renderers} />
                                                </div>
                                            )}

                                        </div>

                                    </div>
                                ))}

                                {!docsData.methods.filter(m => displayPrivateProperties || !m.private).length && (
                                    <p className="section-no-items" style={{ color: props.colors.textLight }}>No Methods</p>
                                )}

                            </div>

                            {docsData.events && (
                                <div className="section" data-name="events">

                                    <p className="name" style={{ color: props.colors.accent }}>Events</p>

                                    {docsData.events.map(e => (
                                        <div className="method" data-name={e.name}>

                                            <p className="section-item-name" onClick={() => setJump(e.name)}><span style={{ color: props.colors.textLight }}>{docsData.name}</span>.on(<span style={{ color: props.colors.textLighter }}>"{e.name}"</span>, <span style={{ color: props.colors.textLighter }}>listener</span>)</p>

                                            <div className="section-content">

                                                <ReactMarkdown source={e.comment} className="comment" renderers={renderers} />

                                                <div className="parameters">
                                                    {e.parameters.map(p => (
                                                        <div className="parameter">
                                                            <div className="parameter-title">
                                                                <p className="parameter-name" style={{ color: props.colors.textLighter }}>{p.name}{p.optional ? "?" : ""}</p>
                                                                <p className="type">{typeString(p.type)}</p>
                                                            </div>
                                                            <ReactMarkdown source={p.comment} className="comment small" renderers={renderers} />
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>

                                        </div>
                                    ))}

                                    {!docsData.events.length && (
                                        <p className="section-no-items" style={{ color: props.colors.textLight }}>No Events</p>
                                    )}

                                </div>
                            )}

                        </div>
                    )}

                    {docsType === "functions" && (
                        <div className="functions">

                            <div className="section">

                                <p className="name" style={{ color: props.colors.accent }}>Functions</p>

                                {docsData.map(f => (
                                    <div className="method" data-name={f.name}>

                                        <p className="section-item-name" onClick={() => setJump(f.name)}>{f.name}({f.parameters.length ? f.parameters.map(p => <span style={{ color: props.colors.textLighter }}>{p.name}{p.optional ? "?" : ""}</span>).reduce((e, acc) => [e, ", ", acc]) : null})</p>

                                        <div className="section-content">

                                            <ReactMarkdown source={f.comment} className="comment" renderers={renderers} />

                                            <div className="parameters">
                                                {f.parameters.map(p => (
                                                    <div className="parameter">
                                                        <div className="parameter-title">
                                                            <p className="parameter-name" style={{ color: props.colors.textLighter }}>{p.name}{p.optional ? "?" : ""}</p>
                                                            <p className="type">{typeString(p.type)}</p>
                                                        </div>
                                                        <ReactMarkdown source={p.comment} className="comment small" renderers={renderers} />
                                                    </div>
                                                ))}
                                            </div>

                                            {typeString(f.returnType) !== "void" && (
                                                <div className="returns">
                                                    <p className="returns-text"><span style={{ color: props.colors.textLight }}>Returns</span> {typeString(f.returnType)}</p>
                                                    <ReactMarkdown source={f.returnComment} className="comment small" renderers={renderers} />
                                                </div>
                                            )}

                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>
                    )}

                    {docsType === "interface" && (
                        <div className="interface">

                            <div className="section">

                                <p className="name" style={{ color: props.colors.accent }}>Properties</p>

                                {docsData.properties.filter(p => displayPrivateProperties || !p.private).map(p => (
                                    <div className="property" data-name={p.name}>

                                        <div className="property-name">
                                            <p className="section-item-name" onClick={() => setJump(p.name)}><span style={{ color: props.colors.textLight }}>{docsData.name}</span>.{p.name}{p.optional ? "?" : ""}</p>
                                            <p className="type">{typeString(p.type)}</p>
                                        </div>

                                        <div className="section-content">
                                            <ReactMarkdown source={p.comment} className="comment" renderers={renderers} />
                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>
                    )}

                    {docsType === "typeAliases" && (
                        <div className="type-aliases">

                            <div className="section">

                                <p className="name" style={{ color: props.colors.accent }}>Type Aliases</p>

                                {docsData.map(ta => (
                                    <div className="property" data-name={ta.name}>

                                        <div className="property-name">
                                            <p className="section-item-name" onClick={() => setJump(ta.name)}><span style={{ color: props.colors.textLight }}>{ta.name}</span></p>
                                            <p className="type">{typeString(ta.type)}</p>
                                        </div>

                                        <div className="section-content">
                                            {ta.comment && (
                                                <ReactMarkdown source={ta.comment} className="comment" renderers={renderers} />
                                            )}
                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>
                    )}

                </div>
            )}

        </div>
    );
};

export default Docs;