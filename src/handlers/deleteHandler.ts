import { SyfetchInterface, SyfetchResponseInterface } from "./types";
import convertArrayToQueryString from "@/utils/convertArrayToQueryString";
import apiPathHandler from "@/utils/apiPathHandler";
import { universalState } from "..";
import getNestedValue from "@/utils/getNestedValue";

export default async function deleteHandler({ ...properties }: SyfetchInterface): Promise<SyfetchResponseInterface> {
    try {

        const { apiPath, data: queries, options } = properties;

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
            method: 'DELETE',
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

            return {
                ok: false,
                status: response.status,
                data: null,
                response,
                error
            };
        }

        return {
            ok: response.ok,
            status: response.status,
            data: data,
            response
        };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown Error occurred. Check console logs.';
        console.error("Network handler error code NH-DELETE-001: ", error);

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
