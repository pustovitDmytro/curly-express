import { URL } from 'url';
import { build } from './utils';

export function cURL({ log, attach }) {
    return function (req, res, next) {
        const obj = {
            url     : new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`),
            method  : req.method,
            headers : req.headers
        };

        if (req._body) {
            obj.json =  req.body;
        }

        const curl = build(obj);

        if (log) {
            log(curl);
        }
        if (attach) {
            const attachKey = attach === true ? '_curl' : attach;

            req[attachKey] = curl; // eslint-disable-line no-param-reassign
        }
        next();
    };
}


export default cURL({ log: console.log });
