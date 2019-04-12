import fetchIntercept from 'fetch-intercept';
import { auth } from './index'
const { getAccessToken, getIdToken } = auth;
// intercept the fetch
const unregister = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        console.log(getAccessToken());
        console.log(getIdToken());
       const headers = {
         authorization : 'Bearer '+ getAccessToken()
       }
       config.headers = headers
      console.log(config);
        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        // Modify the reponse object
        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
});
