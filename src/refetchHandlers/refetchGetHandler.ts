import getHandler from "@/handlers/getHandler";
import { queryState } from "@/states/queryState";

export default function refetchGetHandler(apiPath: string) {
    const query = queryState.getQuery(apiPath);
    if (query) {
        const { request } = query;
        const { apiPath, data, options } = request;
        return getHandler({ apiPath, data, options });
    }
    return {
        ok: false,
        status: 404,
        data: null,
        error: new Error('The API path was not found to refetch. Please check if you have fetch the API path before.'),
    };
}