import parseMethod from "./method";

const parseEvent = targetModule => {

    // Parse method
    const method = parseMethod(targetModule);

    // Return
    return {
        name: method.parameters[0].type.data.substring(1, method.parameters[0].type.data.length - 1),
        comment: method.comment,
        parameters: method.parameters
    };
};

export default parseEvent;