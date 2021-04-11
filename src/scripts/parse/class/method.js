import parseParameters from "../parameters";
import parseType from "../type";

const parseMethod = targetModule => {

    // Inherited
    if (targetModule.inheritedFrom) return;

    // Define data
    const data = {
        name: targetModule.name,
        comment: targetModule.comment.text && targetModule.comment.text.trim(),
        parameters: [],
        private: targetModule.name.startsWith("_"),
        returnType: parseType(targetModule.signatures[0].type),
        returnComment: targetModule.comment.returns && targetModule.comment.returns.trim()
    };

    // Parse parameters
    if (targetModule.signatures[0].parameters) data.parameters = parseParameters(targetModule.signatures[0].parameters);

    // Return
    return data;
};

export default parseMethod;