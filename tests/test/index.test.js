const { handler } = require('../index');

describe('Lambda Handler', () => {

    // Test data from the source file for consistency
    const users = [
        {
            "id": "101",
            "username": "ada_l",
            "name": "Ada Lovelace",
            "email": "ada.l@example.com"
        },
        {
            "id": "102",
            "username": "grace_h",
            "name": "Grace Hopper",
            "email": "grace.h@example.com"
        }
    ];

    describe('GET /users/{id}', () => {
        it('should return a 200 response with user data for a valid user ID', async () => {
            const event = {
                httpMethod: 'GET',
                path: '/users/101',
            };
            
            const expectedUser = users.find(u => u.id === '101');
            const response = await handler(event);

            expect(response.statusCode).toBe(200);
            expect(response.headers['Content-Type']).toBe('application/json');
            expect(JSON.parse(response.body)).toEqual(expectedUser);
        });

        it('should return a 404 response for a non-existent user ID', async () => {
            const nonExistentId = '999';
            const event = {
                httpMethod: 'GET',
                path: `/users/${nonExistentId}`,
            };

            const response = await handler(event);

            expect(response.statusCode).toBe(404);
            expect(response.headers['Content-Type']).toBe('application/json');
            expect(JSON.parse(response.body)).toEqual({
                message: `User with ID '${nonExistentId}' not found.`
            });
        });
    });

    describe('Invalid Routes or Methods', () => {
        it('should return a 404 response for a non-existent route', async () => {
            const event = {
                httpMethod: 'GET',
                path: '/invalid/route',
            };

            const response = await handler(event);

            expect(response.statusCode).toBe(404);
            expect(JSON.parse(response.body)).toEqual({ message: 'Endpoint not found.' });
        });

        it('should return a 404 response for a valid route with an invalid HTTP method', async () => {
            const event = {
                httpMethod: 'POST',
                path: '/users/101',
            };

            const response = await handler(event);

            expect(response.statusCode).toBe(404);
            expect(JSON.parse(response.body)).toEqual({ message: 'Endpoint not found.' });
        });
        
        it('should return a 404 response for a partial path that does not match the regex', async () => {
            const event = {
                httpMethod: 'GET',
                path: '/users/',
            };

            const response = await handler(event);

            expect(response.statusCode).toBe(404);
            expect(JSON.parse(response.body)).toEqual({ message: 'Endpoint not found.' });
        });
    });
});
