import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import SecurePage from '../pageobjects/secure.page'

import axios from 'axios';

describe('My Login application', () => {
    xit('should login with valid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'You logged into a secure area!')
    })

    let petId: any;

    it('should create a new pet and store its ID', async () => {
        try {
            // Define the request body
            const requestBody = {
                "id": 0,
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "name": "doggie",
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": 0,
                        "name": "string"
                    }
                ],
                "status": "available"
            };

            // Make a POST request to create a new pet
            const response = await axios.post('https://petstore.swagger.io/v2/pet', requestBody);

            console.log('Request Data:', {
                headers: response.config.headers,
            });

            // Extract and store the pet ID from the response
            petId = response.data.id;

            // Log the created pet ID
            console.log('Created Pet ID:', petId);

            // Add your assertions or further actions here
            // For example: expect(response.status).toBe(200);
        } catch (error: any) {
            // Handle any errors that may occur during the request
            console.error('Error:', error.message);
        }
    });

    it('should perform POST request and open webpage', async () => {
        try {
            // Make a GET request to the API endpoint
            const response = await axios.get('https://petstore.swagger.io/v2/pet/findByStatus?status=sold');

            console.log('Request Data:', {
                url: response.config.url,
                headers: response.config.headers,
            });

            // Log the response data to the console
            console.log('Response Data:', response.data);

            // Add your assertions or further actions here
            // For example: expect(response.status).toBe(200);
        } catch (error: any) {
            // Handle any errors that may occur during the request
            console.error('Error:', {
                message: error.message,
                request: error.config,
                response: error.response ? {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers,
                } : undefined,
            });
        }
    });

})

