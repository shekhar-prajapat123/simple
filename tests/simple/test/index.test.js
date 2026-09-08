const { handler } = require('../index');

describe('User API Lambda Handler', () => {

    const existingUser = {
        "userId": "user-a1b2",
        "name": "Alice Smith",
        "email": "alice.smith@example.com"
    };
    const existingUserId = "user-a1b2";
    const nonExistentUserId = "user-ffff";

    describe('GET /api/users/{userId}', () => {
        it('should return a 200 OK with user data for an existing user ID', async () => {
            const event = {
                httpMethod: 'GET',
                path: `/api/users/${existingUserId}`,
                pathParameters: {
                    userId: existingUserId
                }
            };

            const response = await handler(event);

            expect(response.statusCode).toBe(200);
            expect(response.headers['Content-Type']).toBe('application/json');
            const body = JSON.parse(response.body);
            expect(body).toEqual(existingUser);
        });

        it('should return a 404 Not Found for a non-existent user ID', async () => {
            const event = {
                httpMethod: 'GET',
                path: `/api/users/${nonExistentUserId}`,
                pathParameters: {
                    userId: nonExistentUserId
                }
            };

            const response = await handler(event);

            expect(response.statusCode).toBe(404);
            expect(response.headers['Content-Type']).toBe('application/json');
            const body = JSON.parse(response.body);
            expect(body).toEqual({ message: `User with ID '${nonExistentUserId}' not found.` });
        });
    });

    describe('CORS Preflight Requests', () => {
        it('should return a 204 No Content for an OPTIONS request', async () => {
            const event = {
                httpMethod: 'OPTIONS',
                path: `/api/users/${existingUserId}`,
            };

            const response = await handler(event);

            expect(response.statusCode).toBe(204);
            expect(response.body).toBe(JSON.stringify({}));
            expect(response.headers['Access-Control-Allow-Origin']).toBe('*');
            expect(response.headers['Access-Control-Allow-Methods']).toBe('GET, OPTIONS');
        });
    });

    describe('Unhandled Routes', () => {
        it('should return 404 for a route that does not exist', async () => {
            const event = {
                httpMethod: 'POST',
                path: '/api/widgets',
                pathParameters: null
            };

            const response = await handler(event);

            expect(response.statusCode).toBe(404);
            const body = JSON.parse(response.body);
            expect(body).toEqual({ message: `Route not found: POST /api/widgets` });
        });

        it('should return 404 for a partially matching route without required parameters', async () => {
            const event = {
                httpMethod: 'GET',
                path: '/api/users/', // Missing the userId part
                pathParameters: null
            };

            const response = await handler(event);

            expect(response.statusCode).toBe(404);
            const body = JSON.parse(response.body);
            expect(body).toEqual({ message: `Route not found: GET /api/users/` });
        });
    });
});
