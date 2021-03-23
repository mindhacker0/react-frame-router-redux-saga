function checkStatus(response) {
    if (response.status === 400) {
        const err = new Error(response.statusText);
        err.name = response.status;
        err.response = response;
        throw err;
    }
    return response;
}

async function errorHandler(error) {
    const { response } = error;
    const { url } = response;
    const errMsg = await response.text();
    console.log(errMsg);
    if (url.includes('refreshtoken')) {
        return {
        status: 'fail',
        data: null,
        };
    }
    return {
        errors: errMsg,
        isSuccess: false,
        result: null,
    };
}

function toJson(response) {
 return response.json();
}

function createHeaders() {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    const token = localStorage.getItem('access_token');
    token && headers.append('Authorization', `Bearer ${token}`);
    return headers;
};

const request = (url, options) => fetch(url, { mode: 'cors', headers: createHeaders(), ...options }).then(checkStatus).then(toJson).catch(errorHandler);

export const GET = (url) => request(url, { method: 'GET' });

export const POST = (url, body) => request(url, { method: 'POST', body: JSON.stringify(body) });

export const PUT = (url, body) => request(url, { method: 'PUT', body: JSON.stringify(body) });

export const DELETE = (url) => request(url, { method: 'DELETE' });

export default {
    GET,
    POST,
    PUT,
    DELETE,
};
  