import test from 'ava'
import { communicate } from '.'

test('TypeError', async t => {
    t.plan(7)

    const options = {}

    await t.throwsAsync(communicate(123), {
        instanceOf: TypeError,
        message: 'Expected a string for url, got number',
    })

    await t.throwsAsync(communicate('string', 123), {
        instanceOf: TypeError,
        message: 'Expected a string for methodName, got number',
    })

    await t.throwsAsync(communicate('string', 'methodName', 'message'), {
        instanceOf: TypeError,
        message: 'Expected a object for message, got string',
    })

    options.certificate = 'string'
    await t.throwsAsync(communicate('string', 'methodName', { $xml: 'message' }, options), {
        instanceOf: TypeError,
        message: 'Expected a Buffer for certificate, got string',
    })

    options.certificate = Buffer.from('string')
    options.password = 123
    await t.throwsAsync(communicate('string', 'methodName', { $xml: 'message' }, options), {
        instanceOf: TypeError,
        message: 'Expected a string for password, got number',
    })

    options.password = '123'
    options.headers = [123]
    await t.throwsAsync(communicate('string', 'methodName', { $xml: 'message' }, options), {
        instanceOf: TypeError,
        message: 'Expected a string for header, got number',
    })

    options.headers = ['header']
    options.httpClient = Buffer.from('hello')
    await t.throwsAsync(communicate('string', 'methodName', { $xml: 'message' }, options), {
        instanceOf: TypeError,
        message: 'Expected a http.HttpClient for options.httpClient',
    })
})

test('buildSoapOptions - no forceSoap12Headers and contentType', t => {
    const res = buildSoapOptions({
        escapeXml: false,
        httpClient: 'httpClient',
        certificate: 'pfx',
        password: 'password'
    })

    t.deepEqual(res, {
        escapeXML: false,
        returnFault: true,
        disableCache: true,
        forceSoap12Headers: true,
        httpClient: 'httpClient',
        headers: { 'Content-Type': 'application/soap+xml' },
        wsdl_options: { pfx: 'pfx', passphrase: 'password' },
    })
})

test('buildSoapOptions - with forceSoap12Headers and contentType', t => {
    const res = buildSoapOptions({
        escapeXml: false,
        httpClient: 'httpClient',
        certificate: 'pfx',
        password: 'password',
        forceSoap12Headers: false,
        contentType: 'contentType'
    })

    t.deepEqual(res, {
        escapeXML: false,
        returnFault: true,
        disableCache: true,
        forceSoap12Headers: false,
        httpClient: 'httpClient',
        headers: { 'Content-Type': 'contentType' },
        wsdl_options: { pfx: 'pfx', passphrase: 'password' },
    })
})
