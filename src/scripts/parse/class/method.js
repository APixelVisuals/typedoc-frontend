import parseParameters from "../parameters";
import parseType from "../type";

const parseMethod = targetModule => {

    // Inherited
    if (targetModule.inheritedFrom) return;

    // Get signature
    const signature = targetModule.signatures[0];

    // Define data
    const data = {
        name: signature.name,
        comment: signature.comment.text && signature.comment.text.trim(),
        parameters: [],
        private: signature.name.startsWith("_"),
        returnType: parseType(signature.type),
        returnComment: signature.comment.returns && signature.comment.returns.trim()
    };

    // Parse parameters
    if (signature.parameters) data.parameters = parseParameters(signature.parameters);

    if (data.parameters.find(p => !p.type)) console.log(data) || console.log(targetModule);

    // Return
    return data;
};

export default parseMethod;