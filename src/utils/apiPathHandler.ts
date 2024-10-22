import { universalState } from ".."
import { removeEmptyParamsFromURL } from "./removeEmptyParamsFromURL"

export default function apiPathHandler(apiPath: string, endpoint?: string): string {

    const finalEndpoint = (() => {
        if (endpoint) {
            if (endpoint.endsWith("/")) return endpoint
            return `${endpoint}/`
        }
        return universalState.endpoint
    })()

    const hasStartingSlash = apiPath.startsWith("/")
    if (hasStartingSlash) {
        return removeEmptyParamsFromURL(finalEndpoint + apiPath.slice(1))
    }

    return removeEmptyParamsFromURL(finalEndpoint + apiPath)
}