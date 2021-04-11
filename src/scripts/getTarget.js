import getModuleTarget from "./getModuleTarget";

const getTarget = (docs, thisModule) => {

    // Get module target
    const moduleTarget = getModuleTarget(thisModule);

    // Get target module
    let targetModule;
    for (let d of docs.children) {

        const target = d.children.find(dd => dd.id === moduleTarget);
        if (target) {
            targetModule = target;
            break;
        }
    }

    // Nested target
    if (getModuleTarget(targetModule)) targetModule = getTarget(docs, targetModule);

    // Return
    return targetModule;
};

export default getTarget;