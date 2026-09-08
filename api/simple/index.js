/**
 * In-memory data store simulating a database of users.
 * The acceptance criteria requires 'userId', 'name', and 'email'.
 */
const usersStore = {
    "user-a1b2": {
        "userId": "user-a1b2",
        "name": "Alice Smith",
        "email": "alice.smith@example.com"
    },
    "user-c3d4": {
        "userId": "user-c3d4",
        "name": "Bob Johnson",
        "email": "bob.johnson@example.com"
    },
    "user-e5f6": {
        "userId": "user-e5f6",
        "name": "Charlie Brown",
        "email": "charlie.brown@example.com"
    }
};

/**
 * A shared helper function to create a standard API Gateway proxy response.
 * @param {number} statusCode The HTTP status code.
 * @param {object} body The object to be stringified as the response body.
 * @returns {object} A valid API Gateway proxy response object.
 */
const createResponse = (statusCode, body) => {
    return {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Enable CORS for all origins
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, OPTIONS"
        },
        body: JSON.stringify(body),
    };
};

/**
 * Main AWS Lambda handler function.
 * Routes requests based on HTTP method and path.
 * @param {object} event The API Gateway event object.
 * @returns {Promise<object>} The API Gateway response object.
 */
exports.handler = async (event) => {
    const { httpMethod, path, pathParameters } = event;

    // Handle CORS preflight requests
    if (httpMethod === 'OPTIONS') {
        return createResponse(204, {});
    }

    // Router for: GET /api/users/{userId}
    // This fulfills the acceptance criteria.
    if (httpMethod === "GET" && path.startsWith("/api/users/") && pathParameters && pathParameters.userId) {
        const requestedUserId = pathParameters.userId;
        const user = usersStore[requestedUserId];

        if (user) {
            // User found, return 200 OK with user data
            return createResponse(200, user);
        } else {
            // User not found, return 404 Not Found
            return createResponse(404, { message: `User with ID '${requestedUserId}' not found.` });
        }
    }

    // Default response for any other route
    return createResponse(404, { message: `Route not found: ${httpMethod} ${path}` });
};
