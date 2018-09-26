import { HttpHeaders } from "@angular/common/http";

export const conf = {
    PRODUCTION: false,

    IMG_PLACEHOLDER_URL: 'https://via.placeholder.com/116x150',

    HTTP_OPTIONS_JSON: {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    },
    /* Ovo ne treba nigdje jer sjebava pregledničko pogađanje ispravnih zaglavlja!
    HTTP_OPTIONS_FORMDATA: {
        headers: new HttpHeaders(
            { 
                'Content-Type': 'multipart/form-data', 
                'Accept': 'application/json' 
            },
        ),
    },
    */

    REST_AUTH_URL: 'http://localhost:8000/rest-auth/',
    // https://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html
    RA_LOGIN: 'login/',
    RA_LOGOUT: 'logout/',
    RA_PWD_RESET: 'password/reset/',              // POST: email
    RA_PWD_RESET_CONFIRM: 'password/reset/confirm/',   // POST: uid, token, new_password1, new_password2
    RA_PWD_CHANGE: 'password/change/',            // POST: new_password1, new_password2, old_password
    RA_USER: 'user/',                             // GET, PUT, PATCH: username, first_name, last_name; pk, username, first_name, last_name
    RA_REGISTER: 'registration/',
    REFRESH_TOKEN_URL: 'http://localhost:8000/refresh-token/',

    HVK_WEB_API_URL: "http://localhost:8000/api/",
}