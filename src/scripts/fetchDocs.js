import fetch from "node-fetch";
import parseClass from "./parse/class/main";
import parseFunction from "./parse/function";
import parseInterface from "./parse/interface";
import parseTypeAlias from "./parse/typeAlias";
import getTarget from "./getTarget";

const fetchDocs = async url => {

    // Fetch docs
    let fetchedDocs = await fetch(url);
    fetchedDocs = await fetchedDocs.json();

    // Define data
    const data = {
        classes: [],
        functions: [],
        interfaces: [],
        typeAliases: [],
        references: {}
    };

    // Get `index.ts`
    const index = fetchedDocs.children.find(m => m.name === `"index"`);

    // Loop through exported modules
    index.children.forEach(m => {

        // Get target module
        const targetModule = getTarget(fetchedDocs, m);

        // Add to references
        if (m.name !== targetModule.name) data.references[m.name] = targetModule.name;

        // Parse
        if (targetModule.kindString === "Class") data.classes.push(parseClass(targetModule));
        else if (targetModule.kindString === "Function") data.functions.push(parseFunction(targetModule));
        else if (targetModule.kindString === "Interface") data.interfaces.push(parseInterface(targetModule));
        else if (targetModule.kindString === "Type alias") data.typeAliases.push(parseTypeAlias(targetModule));
    });

    // Return
    return data;
};

export default fetchDocs;