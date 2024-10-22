/**
 * Represents the interface for a Syfetch request.
 *
 * @property {string} apiPath - The path to the API endpoint.
 * @property {Object<string, any>} [data] - The data to be sent with the request.
 * @property {Object} [options] - Additional options for the request.
 * @property {string} [options.endpoint] - The base URL for the API endpoint.
 * @property {Object<string, any>} [options.headers] - The headers to be sent with the request.
 * @property {string} [options.apiErrorMessagePath] - The path to the error message in the API response.
 * @property {(result: { response: Response; error: null } } | { response: null; error: Error }) => void} [options.onFinish] - A callback function to be called when the request is complete.
 */
export interface SyfetchInterface {
    apiPath: string;
    data?: { [key: string]: any };
    options?: {
        endpoint?: string;
        headers?: { [key: string]: any };
        apiErrorMessagePath?: string;
        onFinish?: (response: Response) => void;
    };
}

export interface SyfetchResponseInterface {
    ok: boolean;
    status: number;
    response: Response | null;
    data: { [key: string]: any } | null;
    error?: Error;
}
