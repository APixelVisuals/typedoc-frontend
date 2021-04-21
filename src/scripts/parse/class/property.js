import parseType from "../type";

const parseProperty = targetModule => {

    // Inherited
    if (targetModule.inheritedFrom) return;

    // Return
    return {
        name: targetModule.name,
        comment: targetModule.comment && targetModule.comment.text && targetModule.comment.text.trim(),
        type: parseType(targetModule.type),
        optional: targetModule.flags.isOptional,
        private: targetModule.flags.isPrivate
    };
};

export default parseProperty;