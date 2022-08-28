import {networkInterfaces} from 'os';

const myip = () => {
    const ipAddress = [];
    const nets = networkInterfaces();

    for (const attr in nets) {
        const item =nets[attr];

        item.map((v,i) => {
            if (v.family == 'IPv4' && v.address != '127.0.0.1'){
                ipAddress.push(v.address);
            }
        })
    }
    return ipAddress;
};

const urlFormat = (urlObject) => String(Object.assign(new URL("http://a.com"), urlObject));

export { myip, urlFormat };