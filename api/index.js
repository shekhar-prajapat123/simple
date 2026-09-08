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

const createResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // For simple browser testing
    },
    body: JSON.stringify(body)
  };
};

exports.handler = async (event, context) => {
  const httpMethod = event.httpMethod;
  const path = event.path;

  // Regex to match /users/{id}
  const userSearchRoute = new RegExp('^/users/([^/]+)$');
  const match = path.match(userSearchRoute);

  if (httpMethod === 'GET' && match) {
    const userId = match[1];
    
    // Simulates initiating a new search
    // The backend's responsibility is to return a definitive result for this specific search
    const user = users.find(u => u.id === userId);

    if (user) {
      // Successful outcome: returns user details
      return createResponse(200, user);
    } else {
      // Error outcome: returns an error message
      return createResponse(404, { message: `User with ID '${userId}' not found.` });
    }
  }

  // Default response for any other route
  return createResponse(404, { message: 'Endpoint not found.' });
};