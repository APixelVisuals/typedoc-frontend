import parseType from "./type";

const parseTypeAlias = targetModule => {

    // Return
    return {
        name: targetModule.name,
        type: parseType(targetModule.type),
        comment: targetModule.comment && targetModule.comment.text && targetModule.comment.text.trim()
    };
};

export default parseTypeAlias;