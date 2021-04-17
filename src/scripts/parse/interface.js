import parseType from "./type";

const parseInterface = targetModule => {

    // Define data
    const data = {
        name: targetModule.name,
        comment: targetModule.comment && targetModule.comment.text && targetModule.comment.text.trim()
    };

    // Parse properties
    data.properties = targetModule.children.map(d => ({
        name: d.name,
        type: parseType(d.type),
        comment: d.comment && d.comment.text && d.comment.text.trim(),
        optional: d.flags.isOptional
    }));

    // Return
    return data;
};

export default parseInterface;