// apiConfig.ts

// Define your API URLs here
const DEV_API_URL = "https://dev-api.robo.vesl.gg"; // Replace with your development API URL
const PROD_API_URL = "https://prod-api.robo.vesl.gg"; // Replace with your production API URL

// Function to determine the base URL based on the environment
function getBaseUrl(): string {
    // Check if the environment is development or production
    // This assumes you have a way to set 'NODE_ENV' (like using dotenv in Node.js)
    const isDevelopment = process.env.NODE_ENV === 'development';

    return isDevelopment ? DEV_API_URL : PROD_API_URL;
}

// Export a function that returns the full URL for a given endpoint
export function getApiUrl(endpoint: string): string {
    const baseUrl = getBaseUrl();
    return `${baseUrl}/${endpoint}`;
}

// Your token
const token = '78ec520f-2d5c-4349-aa38-5406ecb2f2ca';

// Setting up headers
const headers = new Headers();
headers.append('token', `${token}`);
headers.append('Content-Type', 'application/json');

export const fetchRoboverseAPI = async <T> (endpoint: string, method: string = 'GET'): Promise<T> => {
    try {
        const baseUrl = getApiUrl(endpoint)
        const response = await fetch(baseUrl, {
            method: method,
            headers: headers,
        });

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            response.text().then(text => console.log(text));  // Log the response body for more details
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}
