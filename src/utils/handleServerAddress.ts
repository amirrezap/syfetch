export default function handleServerAddress(serverAddress: string) {
    if (serverAddress.endsWith("/")) return serverAddress;
    return `${serverAddress}/`
}