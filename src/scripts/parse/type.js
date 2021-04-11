const type = typeData => {

    // Parse
    if (typeData.type === "intrinsic") {
        if (typeData.name === "void") return undefined;
        if ((typeData.name === "true") || (typeData.name === "false")) return { type: "booleanLiteral", data: typeData.name };
        else return { data: typeData.name };
    }
    else if (typeData.type === "array") return { type: "array", data: type(typeData.elementType) };
    else if (typeData.type === "union") return { type: "union", data: typeData.types.map(t => type(t)) };
    else if (typeData.type === "reference") return { type: "reference", data: typeData.name, arguments: typeData.typeArguments && typeData.typeArguments.map(t => type(t)) };
    else if (typeData.type === "typeParameter") return { type: "typeParameter", data: typeData.name, extends: typeData.constraint && type(typeData.constraint) };
    else if (typeData.type === "stringLiteral") return { type: "stringLiteral", data: `"${typeData.value}"` };
};

export default type;