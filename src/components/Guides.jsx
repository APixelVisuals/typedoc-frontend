import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import GuidesSidebar from "./GuidesSidebar.jsx";
import Codeblock from "./Codeblock.jsx";
import Guide from "./Guide.jsx";
import "./guides.scss";

const Guides = props => {

    // Guide
    const [guide, setGuide] = useState();
    const [guideContent, setGuideContent] = useState();

    // Select guide
    const selectGuide = async guide => {

        // Set url
        window.history.pushState(null, null, `/guides/${guide.slug}`);

        // Set guide
        setGuide(guide);

        // Fetch guide
        let fetchedGuide = await fetch(guide.url);
        fetchedGuide = await fetchedGuide.text();

        // Set guide content
        setGuideContent(fetchedGuide);
    };

    // Reset guide
    const resetGuide = () => {

        // Set url
        window.history.pushState(null, null, "/guides");

        // Set guide
        setGuide(null);
    };

    // On load
    useEffect(() => {

        // Get slug
        const slug = window.location.href.split("/guides")[1].substring(1);

        // Get guide
        let guide;
        props.sections.forEach(s => {

            // Find guide
            const thisGuide = s.guides.find(g => g.slug === slug);

            // Set guide
            if (thisGuide) guide = thisGuide;
        });

        // Select guide
        guide ? selectGuide(guide) : resetGuide();
    }, []);

    return (
        <div id="guides">

            <GuidesSidebar sections={props.sections} select={selectGuide} onTitleClick={resetGuide} colors={props.colors} />

            <div className="content">

                {guide ?
                    (
                        <div>

                            <div className="title">
                                <img className="icon" src={guide.icon} />
                                <p className="text" style={{ color: props.colors.accent }}>{guide.name}</p>
                            </div>

                            <div className="divider" style={{ backgroundColor: props.colors.background }} />

                            <ReactMarkdown
                                source={guideContent}
                                className="guide-content"
                                linkTarget="_blank"
                                renderers={{
                                    heading: elementProps => {
                                        if (elementProps.level === 1) return <h1 style={{ color: props.colors.accent }}>{elementProps.children}</h1>;
                                        else if (elementProps.level === 2) return <h2 style={{ color: props.colors.accent }}>{elementProps.children}</h2>;
                                        else if (elementProps.level === 3) return <h3 style={{ color: props.colors.accent }}>{elementProps.children}</h3>;
                                        else if (elementProps.level === 4) return <h4 style={{ color: props.colors.accent }}>{elementProps.children}</h4>;
                                        else if (elementProps.level === 5) return <h5 style={{ color: props.colors.accent }}>{elementProps.children}</h5>;
                                        else if (elementProps.level === 6) return <h6 style={{ color: props.colors.accent }}>{elementProps.children}</h6>;
                                    },
                                    link: elementProps => (
                                        <a style={{ color: props.colors.text }} href={elementProps.href} target="_blank">{elementProps.children}</a>
                                    ),
                                    code: elementProps => (
                                        <div className="guide-codeblock">
                                            <Codeblock
                                                path="Sample Code"
                                                content={elementProps.value}
                                            />
                                        </div>
                                    ),
                                    thematicBreak: () => (
                                        <hr style={{ backgroundColor: props.colors.background }} />
                                    )
                                }}
                            />

                        </div>
                    ) :
                    (
                        <div>

                            <div className="title">
                                <img className="icon" src={props.icon} />
                                <p className="text" style={{ color: props.colors.accent }}>Guides</p>
                            </div>

                            <div className="divider" style={{ backgroundColor: props.colors.background }} />

                            {props.sections.map(s => (
                                <div>

                                    <p className="guide-section-title" style={{ color: props.colors.accent }}>{s.name}</p>

                                    <div className={`guide-section ${s.className}`}>

                                        {s.guides.map(g => (
                                            <Guide data={g} select={() => selectGuide(g)} colors={props.colors} />
                                        ))}

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

            </div>

        </div>
    );
};

export default Guides;