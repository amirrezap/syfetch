import { SyfetchInterface, SyfetchResponseInterface } from "./types";
import apiPathHandler from "@utils/apiPathHandler";
import { universalState } from "@/index";
import getNestedValue from "@/utils/getNestedValue";

export default async function postHandler({ ...properties }: SyfetchInterface): Promise<SyfetchResponseInterface> {
    try {

        const { apiPath, data, options } = properties;

        const apiPathUrl = apiPathHandler(apiPath, options?.endpoint);
        const response = await fetch(apiPathUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                ...universalState.headers,
                ...options?.headers
            }
        });

        const responseJsonData = await response.json();

        // Check if the response is not OK (status code 200-299)
        if (!response.ok) {

            const apiErrorMessagePath = options?.apiErrorMessagePath ?? universalState.apiErrorMessagePath;

            const error = {
                name: 'API Error',
                message: getNestedValue(apiErrorMessagePath, responseJsonData) || 'An error occurred while processing your request.',
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
            ok: true,
            status: response.status,
            data: responseJsonData,
            response
        };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown Error occurred. Check console logs.';
        console.error("Post handler error code post-handler-001: ", error);

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
