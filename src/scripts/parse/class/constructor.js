import parseParameters from "../parameters";

const parseConstructor = targetModule => {

    // Define data
    const data = {
        parameters: []
    };

    // Parse parameters
    if (targetModule.signatures[0].parameters) data.parameters = parseParameters(targetModule.signatures[0].parameters);

    // Return
    return data;
};

export default parseConstructor;