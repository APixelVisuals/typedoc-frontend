import parseType from "./type";

const parseParameters = inputParameters => {

    // Define parameters
    const parameters = [];

    // Loop through parameters
    inputParameters.forEach(p => {

        // Parse
        parameters.push({
            name: p.name,
            type: parseType(p.type),
            comment: p.comment && p.comment.shortText,
            optional: p.flags.isOptional
        });
    });

    // Return
    return parameters;
};

export default parseParameters;