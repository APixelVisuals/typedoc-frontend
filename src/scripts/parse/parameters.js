import parseType from "./type";

const parseParameters = inputParameters => {

    // Define parameters
    const parameters = [];

    // Loop through parameters
    inputParameters.forEach(p => {

        if (!parseType(p.type)) console.log(p.type) || console.log(parseType(p.type));

        // Parse
        parameters.push({
            name: p.name,
            type: parseType(p.type),
            comment: p.comment && (p.comment.text || p.comment.shortText),
            optional: p.flags.isOptional
        });
    });

    // Return
    return parameters;
};

export default parseParameters;