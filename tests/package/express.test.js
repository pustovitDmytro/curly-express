import fs from 'fs';
import path from 'path';
import jsonServer from 'json-server';
import { assert } from 'chai';
import axios from 'axios';
import FormData from 'form-data';
import busboy from  'connect-busboy';
import bodyParser from 'body-parser';
import { cURL } from '../entry';

const port = 21356;
const users = [ {
    'id'    : 1,
    'name'  : 'Leigh',
    'email' : 'helvy0@feedburner.com'
}, {
    'id'    : 2,
    'name'  : 'Ancell',
    'email' : 'pancell1@gravatar.com'
} ];

const server = jsonServer.create();
const router = jsonServer.router({ users });
const requests = [];

suite('Express');

before(async () => {
    const middleware = cURL({
        log    : curl => requests.push(curl),
        attach : true
    });

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(busboy());
    server.use(middleware);
    server.post('/answer_with_curl', (req, res) => res.send(req._curl));
    // server.use('/multiparty', busboy());
    server.use('/jsonServer', router);
    await new Promise(res => {
        server.listen(port, res);
    });
});

test('Get all users', async function () {
    assert.deepEqual(
        await axios({
            method : 'GET',
            url    : `http://localhost:${port}/jsonServer/users?limit=5`
        }).then(r => r.data),
        users
    );

    assert.exists(requests.find(r => r === "curl -X GET -H 'accept: application/json, text/plain, */*' -H 'user-agent: axios/0.21.1' -H 'host: localhost:21356' -H 'connection: close' http://localhost:21356/jsonServer/users?limit=5"));
});


test('Add user', async function () {
    const user = {
        'name'  : 'Ortega',
        'email' : 'lujnipwob@eve.sn'
    };

    assert.deepEqual(
        await axios({
            method : 'POST',
            url    : `http://localhost:${port}/jsonServer/users`,
            data   : user
        }).then(r => r.data),
        { ...user, id: 3 }
    );

    assert.exists(requests.find(r => r === "curl -X POST -H 'accept: application/json, text/plain, */*' -H 'content-type: application/json;charset=utf-8' -H 'user-agent: axios/0.21.1' -H 'content-length: 44' -H 'host: localhost:21356' -H 'connection: close' -d '{\"name\":\"Ortega\",\"email\":\"lujnipwob@eve.sn\"}' http://localhost:21356/jsonServer/users"));
});

test('busboy Formdata', async function () {
    const bodyFormData = new FormData();

    bodyFormData.append('name', 'Fred');
    bodyFormData.append('age', 25);
    bodyFormData.append('images', fs.createReadStream(path.join(__dirname, '../files/liverpool.png')));
    bodyFormData.append('images', fs.createReadStream(path.join(__dirname, '../files/liverpool.png')));
    bodyFormData.append('logo', fs.createReadStream(path.join(__dirname, '../files/liverpool.png')));
    const response = await axios({
        method  : 'POST',
        url     : `http://localhost:${port}/answer_with_curl`,
        data    : bodyFormData,
        headers : bodyFormData.getHeaders()
    });

    assert.equal(
        response.data,
        `curl -X POST -H 'accept: application/json, text/plain, */*' -H 'content-type: multipart/form-data; boundary=${bodyFormData.getBoundary()}' -H 'user-agent: axios/0.21.1' -H 'host: localhost:21356' -H 'connection: close' -H 'transfer-encoding: chunked' -F 'name=Fred' -F 'age=25' -F 'images=@liverpool.png' -F 'images=@liverpool.png' -F 'logo=@liverpool.png' http://localhost:21356/answer_with_curl`
    );
});


test('Attach to request', async function () {
    assert.equal(
        await new Promise((resolve, reject) => {
            server.use('/check_attach', (req, res) => {
                try {
                    assert.exists(req._curl);
                    res.sendStatus(200);
                    resolve(req._curl);
                } catch (error) {
                    reject(error);
                }
            });
            axios(`http://localhost:${port}/check_attach`);
        }),
        'curl -X GET -H \'accept: application/json, text/plain, */*\' -H \'user-agent: axios/0.21.1\' -H \'host: localhost:21356\' -H \'connection: close\' http://localhost:21356/check_attach'
    );
});


test('Attach without log', async function () {
    const key = '_CUSTOM_CURL_ATTACH_KEY';

    await new Promise((resolve, reject) => {
        server.use(
            '/test_path',
            cURL({ log: null, attach: key }),
            (req, res) => {
                try {
                    assert.exists(req[key]);
                    res.sendStatus(200);
                    resolve(1);
                } catch (error) {
                    reject(error);
                }
            }
        );
        axios(`http://localhost:${port}/test_path`);
    });
});


test('Basic auth', async function () {
    assert.deepEqual(
        await axios({
            method : 'GET',
            url    : `http://localhost:${port}/jsonServer/users?limit=5`,
            auth   : { username: 'admin', password: 'password' }
        }).then(r => r.data),
        users
    );

    assert.exists(requests.find(r => r === "curl -X GET -H 'accept: application/json, text/plain, */*' -H 'user-agent: axios/0.21.1' -H 'host: localhost:21356' -H 'authorization: Basic YWRtaW46cGFzc3dvcmQ=' -H 'connection: close' --user admin:password http://localhost:21356/jsonServer/users?limit=5"));
});

test('data urlencoded', async function () {
    const params = new URLSearchParams();

    params.append('name', 'Akexorcist');
    params.append('age', '28');
    params.append('position', 'Android Developer');
    params.append('description', 'birthdate=25-12-1989&favourite=coding%20coding%20and%20coding&company=Nextzy%20Technologies&website=http://www.akexorcist.com/');
    params.append('awesome', true);

    const response = await axios({
        method  : 'POST',
        url     : `http://localhost:${port}/answer_with_curl`,
        data    : params,
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    });

    assert.equal(
        response.data,
        'curl -X POST -H \'accept: application/json, text/plain, */*\' -H \'content-type: application/x-www-form-urlencoded\' -H \'user-agent: axios/0.21.1\' -H \'content-length: 231\' -H \'host: localhost:21356\' -H \'connection: close\' --data-urlencode \'name=Akexorcist\' --data-urlencode \'age=28\' --data-urlencode \'position=Android Developer\' --data-urlencode \'description=birthdate=25-12-1989&favourite=coding%20coding%20and%20coding&company=Nextzy%20Technologies&website=http://www.akexorcist.com/\' --data-urlencode \'awesome=true\' http://localhost:21356/answer_with_curl'
    );
});

