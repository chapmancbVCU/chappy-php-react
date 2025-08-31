export default function route(path, params = []) {
    console.log(`Params: ${params}`);

    const parts = path.split('.');
    const controller = parts[0];
    console.log(`Controller: ${controller}`);

    const action = (parts.length == 2) ? parts[1] : 'index';
    console.log(`Action: ${action}`);
}