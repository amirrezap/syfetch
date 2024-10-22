import convertArrayToQueryString from "@/utils/convertArrayToQueryString";
import { SyfetchInterface, SyfetchResponseInterface } from "./types";
import apiPathHandler from "@/utils/apiPathHandler";
import { universalState } from "..";
import getNestedValue from "@/utils/getNestedValue";
import { queryState } from "@/states/queryState";

export default async function getHandler({ ...properties }: SyfetchInterface): Promise<SyfetchResponseInterface> {

    const { apiPath, data: queries, options } = properties;

    try {
        const params = new URLSearchParams();

        if (queries) {
            for (const [key, value] of Object.entries(queries)) {
                if (Array.isArray(value)) {
                    params.append(key, convertArrayToQueryString(key, value));
                } else if (value !== null && value !== undefined) {
                    params.append(key, String(value));
                }
            }
        }

        const queryString = params.toString() ? `?${params.toString()}` : '';

        const response = await fetch(apiPathHandler(apiPath, options?.endpoint) + queryString, {
            method: 'GET',
            headers: {
                ...universalState.headers,
                ...options?.headers
            },
        });

        const data = await response.json();

        // Check if the response is not OK (status code 200-299)
        if (!response.ok) {

            const apiErrorMessagePath = options?.apiErrorMessagePath ?? universalState.apiErrorMessagePath

            const error = {
                name: 'API Error',
                message: getNestedValue(apiErrorMessagePath, data) || 'An error occurred while processing your request.',
                stack: 'N/A'
            }

            universalState.onError(error.message, error)

            queryState.setQuery(apiPath, properties, response);
            options?.onFinish && options.onFinish(response);
            return {
                ok: false,
                status: response.status,
                data: null,
                response,
                error
            };
        }

        options?.onFinish && options.onFinish(response);

        queryState.setQuery(apiPath, properties, response);
        return {
            ok: response.ok,
            status: response.status,
            data: data,
            response
        };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown Error occurred. Check console logs.';
        console.error("Network handler error code NH-GET-001: ", error);

        universalState.onError(errorMessage, error as Error)

        return {
            ok: false,
            status: 0,
            data: null,
            response: null,
            error: {
                name: error instanceof Error ? error.name : 'Unknown Error',
                message: errorMessage,
                stack: error instanceof Error ? error.stack : 'Unknown'
            }
        };
    }
}
