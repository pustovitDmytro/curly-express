import { URL } from 'url';
import { assert } from 'chai';
import { build } from '../../src/utils';

suite('Unit: cURL');

test('cURL: Get request', function () {
    assert.equal(
        build({ url: new URL('http://lon.co/imoma') }),
        'curl -X GET http://lon.co/imoma'
    );
});

test('cURL: headers', function () {
    assert.equal(
        build({
            url     : new URL('http://lon.co/imoma'),
            headers : {
                'API_KEY' : 'oUHvzb'
            }
        }),
        "curl -X GET -H 'API_KEY: oUHvzb' http://lon.co/imoma"
    );
});
