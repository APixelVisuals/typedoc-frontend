const getModuleTarget = thisModule => {

    // Get module target
    let moduleTarget;
    if (thisModule.kindString === "Reference") moduleTarget = thisModule.target;
    else if ((thisModule.kindString === "Type alias") && (thisModule.type.type === "reference")) moduleTarget = thisModule.type.typeArguments ? thisModule.type.typeArguments[0].queryType.id : thisModule.type.id;

    // Return
    return moduleTarget;
};

export default getModuleTarget;