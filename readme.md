# sefaz-communicator

> Simple way to communicate with SEFAZ SOAP web services

## Install

```shell
npm install sefaz-communicator
```

## Usage

```js
const sefaz = require('sefaz-communicator')

const url = 'https://hnfe.sefaz.ba.gov.br/webservices/NFeStatusServico4/NFeStatusServico4.asmx'
const methodName = 'nfeStatusServicoNF'
const message = {
   $xml: `<consStatServ xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">
            <tpAmb>2</tpAmb>
            <cUF>29</cUF>
            <xServ>STATUS</xServ>
          </consStatServ>`
}

const certificate = Buffer.from('Pfx certificate in base64 string', 'base64')
const password = 'password'

const response = await sefaz.communicate(url, methodName, message, { certificate, password })
```

## API

### communicate(url, method, message, options)

#### url

Type: `string`

Web service URL

#### methodName

Type: `string`

Name of Wsdl Method

#### message

Type: `object`

Examples
> message: { $xml: '<?xml>...'}

or

> message: { nfeDadosMsg: '<?xml>...'}

#### options.certificate

Type: `Buffer`

Pfx Certificate as Buffer

#### options.password

Type: `string`

Certificate password

#### (optional) options.headers

Type: `string array`

Headers in xml

Example
> headers: ['`<cteCabecMsg>...</cteCabecMsg>`']

#### (optional) options.httpClient

Type: `http.HttpClient`

Custom node-soap HttpClient
