export default (input) => {
    return input.replace(/^\/|\/$/g, '').replace(/\//g, ' ').replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}