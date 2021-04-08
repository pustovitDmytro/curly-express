import { URL } from 'url';
import basicAuth from 'basic-auth';
import { build } from './utils';

export function cURL({ log, attach }) {
    return async function (req, res, next) {
        const user  = basicAuth(req);
        const obj = {
            url     : new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`),
            method  : req.method,
            headers : req.headers,
            user
        };

        if (req.busboy) {
            obj.form = [];
            await new Promise(async (resolve) => {
                req.busboy.on('file', function (fieldname, file, filename) {
                    obj.form.push({ key: fieldname, value: `@${filename}` });
                    file.on('data', () => {});
                });
                req.busboy.on('field', function (key, value) {
                    obj.form.push({ key, value });
                });
                req.busboy.on('finish', resolve);

                req.pipe(req.busboy);
            });
        }
        let isJSON = req._body;

        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            isJSON = false;
            obj.urlencoded = req.body;
        }

        if (isJSON) obj.json =  req.body;
        const curl = build(obj);

        if (log) log(curl);

        if (attach) {
            const attachKey = attach === true ? '_curl' : attach;

            req[attachKey] = curl; // eslint-disable-line no-param-reassign
        }
        next();
    };
}


export default cURL({ log: console.log });
