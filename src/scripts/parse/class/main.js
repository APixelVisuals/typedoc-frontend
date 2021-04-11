import parseConstructor from "./constructor";
import parseProperty from "./property";
import parseMethod from "./method";
import parseType from "../type";

const main = targetModule => {

    // Define data
    const data = {
        name: targetModule.name,
        extends: targetModule.extendedTypes && parseType(targetModule.extendedTypes[0]),
        properties: [],
        methods: []
    };

    // Loop through children
    targetModule.children.forEach(m => {

        // Parse
        if (m.kindString === "Constructor") data.classConstructor = parseConstructor(m);
        else if (m.kindString === "Property") {
            const property = parseProperty(m);
            if (property) data.properties.push(property);
        }
        else if (m.kindString === "Method") {
            const method = parseMethod(m);
            if (method) data.methods.push(method);
        }
    });

    // Return
    return data;
};

export default main;