import parseType from "../type";

const parseProperty = targetModule => {

    // Inherited
    if (targetModule.inheritedFrom) return;

    // Return
    return {
        name: targetModule.name,
        comment: targetModule.comment.text.trim(),
        type: parseType(targetModule.type),
        optional: targetModule.flags.isOptional,
        private: targetModule.name.startsWith("_")
    };
};

export default parseProperty;