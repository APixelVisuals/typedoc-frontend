import parseParameters from "./parameters";
import parseType from "./type";

const parseFunction = targetModule => {

    // Define data
    const data = {
        name: targetModule.name,
        parameters: [],
        returnType: parseType(targetModule.signatures[0].type)
    };

    // Parse parameters
    if (targetModule.signatures[0].parameters) data.parameters = parseParameters(targetModule.signatures[0].parameters);

    // Return
    return data;
};

export default parseFunction;