export const notFound = (param, name) => {
    if (!param) {
        throw new Error(`${name} not Found!`);
    };
}