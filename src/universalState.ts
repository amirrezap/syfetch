import type { SyfetchEntryPoint } from "@/types"

export default class UniversalState implements SyfetchEntryPoint {

    private _endpoint: string = '';
    headers;
    onError;
    apiErrorMessagePath;

    constructor(data: Required<SyfetchEntryPoint>) {
        this.endpoint = data.endpoint;
        this.headers = data.headers;
        this.onError = data.onError;
        this.apiErrorMessagePath = data.apiErrorMessagePath;
    }

    get endpoint(): string {
        return this._endpoint;
    }

    set endpoint(value: string) {
        if (!this.isValidUrl(value)) {
            throw new Error("Invalid endpoint URL");
        }
        if (value.endsWith("/")) {
            this._endpoint = value
        } else {
            this.endpoint = `${value}/`
        }
    }

    private isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

}