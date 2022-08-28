import {urlFormat} from '../helper/UtilHelper.js';

const url1 = urlFormat({
    protocol: 'https:',
    hostname: 'example.com',
    pathname: 'somepath'
})
console.log('url1:', url1);

const url2 = urlFormat({
    protocol: 'https:',
    host: 'example.com',
    pathname: '/somepath'
})
console.log('url2:', url2);

const url3 = urlFormat({
    protocol: 'https:',
    host: 'example.com:8080',
    pathname: '/somepath'
});
console.log('url3:', url3);

const url4 = urlFormat({
    protocol: 'https:',
    hostname: 'example.com',
    port: 8080,
    pathname: '/somepath'
});
console.log('url4:', url4);

const url5 = urlFormat({
    protocol: 'https:',
    hostname: 'example.com',
    port: 8080,
    pathname: '/somepath',
    username : 'john',
    password: 'abc',
    search: 'item=bike'
});
console.log('url5:', url5);

// url1: https://example.com/somepath
// url2: https://example.com/somepath
// url3: https://example.com:8080/somepath
// url4: https://example.com:8080/somepath
// url5: https://john:abc@example.com:8080/somepath?item=bike