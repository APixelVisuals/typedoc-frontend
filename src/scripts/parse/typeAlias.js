import parseType from "./type";

const parseTypeAlias = targetModule => {

    // Return
    return {
        name: targetModule.name,
        type: parseType(targetModule.type)
    };
};

export default parseTypeAlias;