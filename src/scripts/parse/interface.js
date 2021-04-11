import parseType from "./type";

const parseInterface = targetModule => {

    // Define data
    const data = {
        name: targetModule.name
    };

    // Parse properties
    data.properties = targetModule.children.map(d => ({
        name: d.name,
        optional: d.flags.isOptional,
        type: parseType(d.type)
    }));

    // Return
    return data;
};

export default parseInterface;