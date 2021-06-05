export function genereteCall(parcedCurl) {


    let environmentVariablesMap = {
        consultagedTeleportDocumentoUsername: "consultagedTeleportDocumentoUsername",
        consultagedTeleportDocumentoPassword: "consultagedTeleportDocumentoPassword"
    }

    let call = {
        requestUrl: parcedCurl.url,
        getRequestUrl() { return this.requestUrl.split('?')[0] },
        setRequestUrl(newRequestUrl) { this.requestUrl = newRequestUrl },
        method: parcedCurl.method,

        getMethod() { return this.method },
        setMethod(newMethod) { this.method = newMethod },

        body: parcedCurl.body.data,
        getBody() { this.body },
        setBody(newBody) { this.body = newBody },

        query: parcedCurl.query,
        getQuery() { this.query },
        setBody(newQuery) { this.query = newQuery },

        environmentVariables: environmentVariablesMap,
        getEnvironmentVariables() { this.environmentVariables }
    };




    return call;
};


// let call = {
//     request: request,
//     environmentVariables: environmentVariables,
//     tracer: tracer
// };


// let request = {
//     requestUrl: parcedCurl.url,
//     getRequestUrl() { return this.requestUrl.split('?')[0] },
//     setRequestUrl(newRequestUrl) { this.requestUrl = newRequestUrl },
//     method: parcedCurl.method,

//     getMethod() { return this.method },
//     setMethod(newMethod) { this.method = newMethod },

//     body: parcedCurl.body.data,

//     setString: function (newString, encoding) {
//         this.body = newString;

//     },
//     getBody: function () {
//         return this;
//     },

//     //getBody(string) { return this.body; },

//     //getBody() { return this.body },
//     //setBody(newBody) { this.body = newBody },
//     //setString(newString, encoding) { },
//     query: parcedCurl.query,
//     getQuery() { return this.query },
//     setBody(newQuery) { this.query = newQuery },

// };




//console.log(call.environmentVariables.get("consultagedTeleportDocumentoPassword"));

//test(call);

//$request.getBody().getString("utf-8")



//call.request.getBody().setString(JSON.stringify("authBody"), "utf-8");

//console.log(call.request.getBody("string"));

