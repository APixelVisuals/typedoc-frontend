import parseConstructor from "./constructor";
import parseProperty from "./property";
import parseMethod from "./method";
import parseEvent from "./event";
import parseType from "../type";

const main = targetModule => {

    // Define data
    const data = {
        name: targetModule.name,
        extends: targetModule.extendedTypes && parseType(targetModule.extendedTypes[0]),
        properties: [],
        methods: []
    };
    if ((data.extends) && (data.extends.data === "EventEmitter")) data.events = [];

    // Loop through children
    targetModule.children.forEach(m => {

        // Parse
        if (m.kindString === "Constructor") data.classConstructor = parseConstructor(m);
        else if (m.kindString === "Property") {
            const property = parseProperty(m);
            if (property) data.properties.push(property);
        }
        else if (m.kindString === "Method") {

            // Inherited
            if (m.inheritedFrom) return;

            // Event
            if ((data.events) && (m.signatures[0].name === "on")) data.events.push(...m.signatures.map(s => parseEvent(s)));

            // Method
            else data.methods.push(parseMethod(m.signatures[0]));
        }
    });

    // Return
    return data;
};

export default main;