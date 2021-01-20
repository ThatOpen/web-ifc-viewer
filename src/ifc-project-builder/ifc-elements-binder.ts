function bindElements(finder: any, type: any, relating: any, related: any, property: any) {
    const relations = finder.findByType(type);
    Object.values(relations).forEach((relation) => {
        return isArray((relation as any)[relating])
            ? bindMultiple(relation, relating, related, property)
            : bindSingle(relation, relating, related, property);
    });
}
function bindSingle(relation: any, relating: any, related: any, property: any) {
    if (!relation[relating][property])
        relation[relating][property] = [];
    bind(relation[relating][property], relation, related);
}
function bindMultiple(relation: any, relating: any, related: any, property: any) {
    relation[relating].forEach((e: any) => {
        if (!e[property])
            e[property] = [];
        bind(e[property], relation, related);
    });
}
function bind(property: any, relation: any, related: any) {
    return isArray(relation[related])
        ? property.push(...relation[related])
        : property.push(relation[related]);
}
function isArray(item: any) {
    return item.constructor === Array;
}
export { bindElements };
