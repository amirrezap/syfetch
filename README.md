# Syfetch

Syfetch is a lightweight and flexible API handler for making HTTP requests in JavaScript applications. It provides a simple interface for performing CRUD operations (Create, Read, Update, Delete) with built-in error handling and customizable configurations.

## Features

- **CRUD Operations**: Easily perform GET, POST, PUT, and DELETE requests with a consistent API.
- **Configurable Endpoints**: Set up your API endpoint and headers in one unified and centeralized configuration.
- **Error Handling**: Inbuilt error handling that allows defining custom error messages and actions.
- **Customizable Error Messages**: Specify a path to extract error messages from server responses using `apiErrorMessagePath`. For example, if the server response is structured as `{..., details: {message: 'some message'}}`, you can set `apiErrorMessagePath: 'details.message'` to retrieve the error message.
- **Query String Support**: Automatically converts query parameters to query string format for GET requests.
- **TypeScript Support**: Fully typed with TypeScript for better development experience and type safety.
- **Customizable Response Handling**: Handle API responses and errors in a way that suits your application's needs.

## Installation

To install Syfetch, use npm or yarn:

```bash
npm install syfetch
```
or
```bash
yarn add syfetch
```
## Usage

### Basic Setup

```typescript
import Syfetch from 'syfetch';

const syfetch = Syfetch({
    endpoint: 'http://localhost:80/',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: YOUR_TOKEN,
    },
    apiErrorMessagePath: 'details.message', // Optionally specify the path for error messages
    onError: (message, error) => {
        // Toast.show(message)
        console.error(message, error);
    }
});
```
# Making Requests

## GET Request

```typescript
const response = await syfetch.get('api/endpoint', { param1: 'value1' });
if (response.ok) {
    console.log(response.data);
} else {
    console.error(response.error);
}
```
## POST Request

```typescript
const response = await syfetch.post('api/endpoint', { key: 'value' });
if (response.ok) {
    console.log(response.data);
} else {
    console.error(response.error);
}
```

## PUT Request

```typescript

const response = await syfetch.put('api/endpoint', { key: 'newValue' });
if (response.ok) {
    console.log(response.data);
} else {
    console.error(response.error);
}
```
## DELETE Request

```typescript

const response = await syfetch.delete('api/endpoint', { key: 'value' });
if (response.ok) {
    console.log('Deleted successfully');
} else {
    console.error(response.error);
}
```
## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.