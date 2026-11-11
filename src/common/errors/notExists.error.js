export const notExists = (param, name) => {
    if (param === undefined || param === null || !param) {
        throw new Error (`${name} does not exist`);
    };
    return param;
};