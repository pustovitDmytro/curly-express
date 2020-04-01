/* eslint-disable more/no-then */
import jsonServer from 'json-server';
import { assert } from 'chai';
import axios from 'axios';
import FormData from 'form-data';
import { cURL } from '../entry';

const bodyParser = require('body-parser');

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
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cURL({
        log : curl => requests.push(curl)
    }));
    server.use(router);
    await new Promise(res => {
        server.listen(port, res);
    });
});

test('Get all users', async function () {
    assert.deepEqual(
        await axios({
            method : 'GET',
            url    : `http://localhost:${port}/users?limit=5`
        }).then(r => r.data),
        users
    );

    assert.exists(
        requests.find(r => r === "curl -X GET -H 'accept: application/json, text/plain, */*' -H 'user-agent: axios/0.19.2' -H 'host: localhost:21356' -H 'connection: close' http://localhost:21356/users?limit=5")
    );
});


test('Add user', async function () {
    const user = {
        'name'  : 'Ortega',
        'email' : 'lujnipwob@eve.sn'
    };

    assert.deepEqual(
        await axios({
            method : 'POST',
            url    : `http://localhost:${port}/users`,
            data   : user
        }).then(r => r.data),
        { ...user, id: 3 }
    );

    assert.exists(
        requests.find(r => r === "curl -X POST -H 'accept: application/json, text/plain, */*' -H 'content-type: application/json;charset=utf-8' -H 'user-agent: axios/0.19.2' -H 'content-length: 44' -H 'host: localhost:21356' -H 'connection: close' -d '{\"name\":\"Ortega\",\"email\":\"lujnipwob@eve.sn\"}' http://localhost:21356/users")
    );
});

test('Formdata', async function () {
    const bodyFormData = new FormData();

    bodyFormData.append('name', 'Fred');
    bodyFormData.append('image', '/tehuker/bejdig.jpeg');
    await axios({
        method  : 'POST',
        url     : `http://localhost:${port}/users`,
        data    : bodyFormData,
        headers : { 'Content-Type': 'multipart/form-data' }
    });
});
