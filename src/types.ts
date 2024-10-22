import { SyfetchInterface, SyfetchResponseInterface } from "./handlers/types";

export interface SyfetchInstance {
    post: (apiPath: SyfetchInterface['apiPath'], data?: SyfetchInterface['data'], options?: SyfetchInterface['options']) => Promise<SyfetchResponseInterface>;
    put: (apiPath: SyfetchInterface['apiPath'], data?: SyfetchInterface['data'], options?: SyfetchInterface['options']) => Promise<SyfetchResponseInterface>;
    get: (apiPath: SyfetchInterface['apiPath'], queries?: SyfetchInterface['data'], options?: SyfetchInterface['options']) => Promise<SyfetchResponseInterface>;
    delete: (apiPath: SyfetchInterface['apiPath'], queries?: SyfetchInterface['data'], options?: SyfetchInterface['options']) => Promise<SyfetchResponseInterface>;
}

export type SyfetchEntryPoint = {
    /**
     * The base URL of the API endpoint to which requests will be sent.
     * 
     * This property should contain the root URL of the API, which will be used
     * as the foundation for constructing full request URLs for various API operations.
     * 
     * For example, if your API is hosted at `http://localhost:80/api`, you would set
     * the endpoint as follows:
     * 
     * ```javascript
     * endpoint: 'http://localhost:80/api'
     * ```
     * 
     * All subsequent API requests (GET, POST, PUT, DELETE) will be made relative to
     * this base URL.
     * 
     * @type {string}
    */
    endpoint: string;
    /**
     * An object representing the default HTTP headers to be sent with each API request.
     * 
     * This property allows you to specify any headers that should be included in the
     * requests made to the API. Common headers include `Content-Type`, `Accept`, and
     * authentication tokens. These headers will be merged with any headers specified
     * in individual requests, allowing for customization on a per-request basis.
     * 
     * For example, to set the `Content-Type` to `application/json` and accept JSON
     * responses, you can configure the headers as follows:
     * 
     * ```javascript
     * headers: {
     *     'Content-Type': 'application/json',
     *     'Accept': 'application/json'
     * }
     * ```
     * 
     * **Note:** If you pass a third `options` argument with one of the CRUD methods,
     * the headers can be overwritten by specifying the `headers` property within the
     * `options` object. This allows for more granular control over the headers for
     * specific requests.
     * 
     * @type {{ [key: string]: any }}
    */
    headers?: { [key: string]: any };
    /**
     * A callback function that is invoked when an error occurs during an API request.
     * 
     * This function receives two parameters: an error message and the error object.
     * You can use this callback to handle errors in a way that suits your application,
     * such as logging the error or displaying a user-friendly message.
     * 
     * When `apiErrorMessagePath` is specified, the error message passed to this callback
     * will be the error message extracted from the API response based on the provided path.
     * For example, if `apiErrorMessagePath` is set to 'details.message' and the server
     * response contains an error message at that path, the `onError` callback will receive
     * that specific message.
     * 
     * @param {string} message - The error message to be handled.
     * @param {Error} error - The error object containing additional error information.
    */
    onError?: (message: string, error: Error) => void
    /**
     * The path to extract the error message from the API response.
     * 
     * This property allows you to specify a nested path in the response object
     * where the error message can be found. For example, if the server response
     * is structured as `{..., details: { message: 'some message' }}`, you can
     * set `apiErrorMessagePath: 'details.message'` to retrieve the error message.
     * 
     * If not specified, a default error message will be used when an error occurs.
     * 
    */
    apiErrorMessagePath?: string
}