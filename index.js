import { CURLParser } from 'parse-curl-js';
import axios from 'axios';

const curlCmd = `curl --location --request POST 'https://apigate.hondaservicosfinanceiros.com.br/dev/repositorio/v1/documentos?codCliente=934583&certApolice=651729&codTipoDocumento=1a' \
--header 'Content-Type: application/json' \
--header 'client_id: 212df16f-d798-31af-a5f2-ba98e264a4f3' \
--header 'access_token: MjEyZGYxNmYtZDc5OC0zMWFmLWE1ZjItYmE5OGUyNjRhNGYzOjBkNWI1NWIwLWU0OWQtM2JkZi1iMzk5LWVjY2IyMTQ4MzllYQ==' \
--header 'Authorization: Bearer MjEyZGYxNmYtZDc5OC0zMWFmLWE1ZjItYmE5OGUyNjRhNGYzOjBkNWI1NWIwLWU0OWQtM2JkZi1iMzk5LWVjY2IyMTQ4MzllYQ==' \
--data-raw '{
    "seguradoraCodigo": 5177,
    "apoliceNumero": "40425250"  
}'`;

const cURLParser = new CURLParser(curlCmd.replace('--data-raw', '--data'));

let parcedCurl = cURLParser.parse();


let environmentVariablesMap = {
    consultagedTeleportDocumentoUsername: "1",
    consultagedTeleportDocumentoPassword: "2"
};

let environmentVariables = {
    get(key) { return environmentVariablesMap[key] }
};

let tracer = {
    trace(trace) { console.log(trace) }
}


class Body {
    constructor(bodyFromCurl) {
        this.bodyString = bodyFromCurl
    }

    getString(encoding) {
        return this.bodyString;
    }

    setString(newBodyString, encoding) {
        this.bodyString = newBodyString;
    }

}

let body = new Body(parcedCurl.body.data);


class Request {

    constructor(parcedCurl, body) {
        this.queryParams = parcedCurl.query,
            this.headers = parcedCurl.headers,
            this.method = parcedCurl.method,
            this.body = body;

    }

    // headers
    getHeader(name) { return this.headers[name] }
    getAllHeaders() { return this.headers }
    setHeader(name, value) { return this.headers[name] = value }

    // query params
    getQueryParam(name) { return this.queryParams[name] }
    getAllQueryParam() { return this.queryParams }
    setQueryParam(name, value) { return this.queryParams[name] = value }

    // body
    setBody(newQuery) { this.query = newQuery }
    getBody() { return this.body }
    setBody(newBody) { this.body = newBody }

    getMethod() { return this.method }
    setMethod(newMethod) { this.method = newMethod }

}


class Response {

    constructor(parcedCurl, body, status) {
        this.headers = parcedCurl.headers,
            this.status = status,
            this.method = parcedCurl.method,
            this.body = body;
    }

    // headers
    getHeader(name) { return this.headers[name] }
    getAllHeaders() { return this.headers }
    setHeader(name, value) { return this.headers[name] = value }

    // body
    setBody(newQuery) { this.query = newQuery }
    getBody() { return this.body }
    setBody(newBody) { this.body = newBody }

    getMethod() { return this.method }
    setMethod(newMethod) { this.method = newMethod }

    getStatus() { return this.status }
    setStatus(newStatus) { this.status = newStatus }
}


class Call {
    constructor(destinationUri, request, response, environmentVariables, tracer) {
        this.destinationUri = destinationUri,
            this.request = request,
            this.response = response,
            this.environmentVariables = environmentVariables,
            this.tracer = tracer
    }

    getDestinationUri() { return this.destinationUri.split('?')[0] }
    setDestinationUri(newRequestUrl) { this.destinationUri = newRequestUrl }
}


class HTTP {
    constructor() {

    }

    async get(uri) {
        return await axios.get(uri);
    };

    post(uri, header, body) { };
}



let request = new Request(parcedCurl, body);

let response = new Response(parcedCurl, body, "200");

let $call = new Call(parcedCurl.url, request, response, environmentVariables, tracer)



//call.setDestinationUri("https://apigate.hondaservicosfinanceiros.com.br/dev/");
///console.log(call.getDestinationUri());
//console.log(call.request.getHeader("name"));

test($call);


function test($call) {

    let $request = $call.request;

    try {

        let errorMessage = "O campo {nome} deve conter apenas numeros";

        const customerCodeValue = $request.getQueryParam('codCliente');
        const certPolicyValue = $request.getQueryParam('certApolice');
        const documentTypeCodeValue = $request.getQueryParam('codTipoDocumento');

        let errorResponseBody = [];

        if (isEmpty(customerCodeValue) && isEmpty(certPolicyValue)) {
            errorResponseBody.push({
                code: "400.001",
                message: "Por favor informa pelo menos codCliente ou certApolice"
            });

        } else {

            if (customerCodeValue && !customerCodeValue.match(/^\d+$/)) {

                errorResponseBody.push({
                    code: "400.002",
                    message: errorMessage.replace('{nome}', 'codCliente')
                });

            }

            if (certPolicyValue && !certPolicyValue.match(/^\d+$/)) {
                errorResponseBody.push({
                    code: "400.002",
                    message: errorMessage.replace('{nome}', 'certApolice')
                });
            }

            if (documentTypeCodeValue && !documentTypeCodeValue.match(/^\d+$/)) {
                errorResponseBody.push({
                    code: "400.002",
                    message: errorMessage.replace('{nome}', 'codTipoDocumento')
                });
            }
        }

        if (Array.isArray(errorResponseBody) && errorResponseBody.length) {
            badRequestHandler(errorResponseBody);
        }

    } catch (e) {
        $call.tracer.trace(e);
        throw e;
    }
}


function badRequestHandler(errorMessages) {
    //$call.stopFlow = true;
    //$call.decision.setAccept(false);

    //$call.response = new com.sensedia.interceptor.externaljar.dto.ApiResponse();
    $call.response.setStatus(400);
    //$call.response.addHeader("Content-Type", "application/json");
    $call.response.getBody().setString(JSON.stringify(errorMessages), "utf-8");


    $call.tracer.trace($call.response);
}

function isEmpty(str) {
    return (!str || str == undefined || str == "");
}