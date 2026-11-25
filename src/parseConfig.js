import Parse from 'parse';

console.log('Variáveis do Vite:', import.meta.env);

const applicationId = import.meta.env.VITE_PARSE_APPLICATION_ID;
const javascriptKey = import.meta.env.VITE_PARSE_JAVASCRIPT_KEY;
const serverURL = import.meta.env.VITE_PARSE_SERVER_URL;

console.log('Application ID:', !!applicationId);
console.log('JavaScript Key:', !!javascriptKey);
console.log('Server URL:', serverURL);

Parse.initialize(applicationId, javascriptKey);
Parse.serverURL = serverURL;

export default Parse;