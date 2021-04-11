import React, { useState } from "react";
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

    return (
        <div id="guides">

            <GuidesSidebar sections={props.sections} select={selectGuide} onTitleClick={resetGuide} />

            <div className="content">

                {guide ?
                    (
                        <div>

                            <div className="title">
                                <img className="icon" src={guide.icon} />
                                <p className="text">{guide.name}</p>
                            </div>

                            <div className="divider" />

                            <ReactMarkdown
                                source={guideContent}
                                className="guide-content"
                                linkTarget="_blank"
                                renderers={{
                                    code: props => (
                                        <div className="guide-codeblock">
                                            <Codeblock
                                                path="Sample Code"
                                                content={props.value}
                                            />
                                        </div>
                                    )
                                }}
                            />

                        </div>
                    ) :
                    (
                        <div>

                            <div className="title">
                                <img className="icon" src={props.icon} />
                                <p className="text">Guides</p>
                            </div>

                            <div className="divider" />

                            {props.sections.map(s => (
                                <div>

                                    <p className="guide-section-title">{s.name}</p>

                                    <div className={`guide-section ${s.className}`}>

                                        {s.guides.map(g => (
                                            <Guide data={g} select={() => selectGuide(g)} />
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