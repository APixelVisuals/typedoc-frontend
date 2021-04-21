import parseParameters from "../parameters";
import parseType from "../type";

const parseMethod = (targetModule, method) => {

    // Define data
    const data = {
        name: targetModule.name,
        comment: targetModule.comment && targetModule.comment.text && targetModule.comment.text.trim(),
        parameters: [],
        private: targetModule.flags.isPrivate,
        static: method && method.flags.isStatic,
        returnType: parseType(targetModule.type),
        returnComment: targetModule.comment.returns && targetModule.comment.returns.trim()
    };

    // Parse parameters
    if (targetModule.parameters) data.parameters = parseParameters(targetModule.parameters);

    if (data.parameters.find(p => !p.type)) console.log(data) || console.log(targetModule);

    // Return
    return data;
};

export default parseMethod;