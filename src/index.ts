import deleteHandler from "./handlers/deleteHandler";
import getHandler from "./handlers/getHandler";
import postHandler from "./handlers/postHandler";
import putHandler from "./handlers/putHandler";
import { SyfetchInterface } from "./handlers/types";
import refetchGetHandler from "./refetchHandlers/refetchGetHandler";
import { SyfetchEntryPoint, SyfetchInstance } from "./types";
import UniversalState from "./universalState";

const initialConfig: Required<SyfetchEntryPoint> = {
    endpoint: 'http://localhost:80/',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
    },
    onError: async () => { },
    apiErrorMessagePath: ''
};

/**
 * A global state object that holds the initial configuration for the Syfetch API.
 */
export const universalState = new UniversalState(initialConfig);

/**
 * Provides a Syfetch API that exposes methods for making HTTP requests.
 * @param props - The initial configuration for the Syfetch API.
 * @returns An object with methods for making POST, PUT, GET, and DELETE requests.
 */
export function Syfetch(props: SyfetchEntryPoint): SyfetchInstance {
    Object.assign(universalState, props);
    return {
        post: (apiPath: SyfetchInterface['apiPath'], data?: SyfetchInterface['data'], options?: SyfetchInterface['options']) => {
            return postHandler({ apiPath, data, options })
        },
        put: (apiPath: SyfetchInterface['apiPath'], data?: SyfetchInterface['data'], options?: SyfetchInterface['options']) => {
            return putHandler({ apiPath, data, options })
        },
        get: (apiPath: SyfetchInterface['apiPath'], queries?: SyfetchInterface['data'], options?: SyfetchInterface['options']) => {
            return getHandler({ apiPath, data: queries, options })
        },
        delete: (apiPath: SyfetchInterface['apiPath'], queries?: SyfetchInterface['data'], options?: SyfetchInterface['options']) => {
            return deleteHandler({ apiPath, data: queries, options })
        }
    };
}

/**
 * Exprimental
 * 
 * Provides a refetch functionality for fetching data.
 * @returns An object with a `get` method that can be used to refetch data.
 */
export function Refetch() {
    return {
        get: refetchGetHandler
    }
}