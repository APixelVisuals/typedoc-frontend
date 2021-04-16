import parseParameters from "./parameters";

const type = typeData => {

    // Parse
    if (typeData.type === "intrinsic") {
        if (typeData.name === "void") return { type: "void" };
        if ((typeData.name === "true") || (typeData.name === "false")) return { type: "booleanLiteral", data: typeData.name };
        else return { data: typeData.name };
    }
    else if (typeData.type === "array") return { type: "array", data: type(typeData.elementType) };
    else if (typeData.type === "union") return { type: "union", data: typeData.types.map(t => type(t)) };
    else if (typeData.type === "reflection") return { type: "function", parameters: typeData.declaration.signatures[0].parameters ? parseParameters(typeData.declaration.signatures[0].parameters) : [], returnType: type(typeData.declaration.signatures[0].type) };
    else if (typeData.type === "reference") return { type: "reference", data: typeData.name, arguments: typeData.typeArguments && typeData.typeArguments.map(t => type(t)) };
    else if (typeData.type === "conditional") return { type: "conditional", trueType: type(typeData.trueType), falseType: type(typeData.falseType) };
    else if (typeData.type === "typeParameter") return { type: "typeParameter", data: typeData.name, extends: typeData.constraint && type(typeData.constraint) };
    else if (typeData.type === "stringLiteral") return { type: "stringLiteral", data: `"${typeData.value}"` };
    else if (typeData.type === "query") return type(typeData.queryType);
};

export default type;