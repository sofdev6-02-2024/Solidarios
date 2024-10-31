# Apps

# Authentication
This app uses **NextAuth.js** with the provider **Keycloak** to handle user authentication. Once users log in, they receive a session and an access token that can be used for authorization in requests. For detailed Keycloak configuration instructions, please refer to the [Keycloak setup guide](cevent_frontend/README.md).

# Authorization
We manage two types of users:
1. **Guest Users** (not logged in)
2. **Authenticated Users** (logged in with an account)

Certain features and operations are only accessible to authenticated users. To enforce this, we use JWT (JSON Web Token) to securely validate user sessions with access tokens provided by NextAuth.js.

## API Structure
The cevent_frontend project includes an `api/` folder that contains custom serverless API endpoints for authentication and events. This structure is part of Next.js’s built-in API routing, enabling the creation of serverless functions within the app. Here’s how each part of the API operates:

### API Workflow
1. **Client Component**: A client component makes a fetch request to an endpoint, such as `/api/auth/logout` or `/api/events`.
2. **Local API Route**: The request is handled by the Next.js API route, which may:
   - Verify authentication
   - Transform the request
   - Add headers or manage authorization logic
3. **External API**: The local API forwards requests to an external service, such as the Event Service API. It receives data from this external API and sends the processed response back to the client.

This local API layer acts as middleware, managing data flow between the client and external services. By centralizing endpoint calls, frontend developers only need to make simple fetch requests like `await fetch("/api/events")`, which reduces complexity.

## Event Service API
The Event Service API uses **JWT Bearer** authentication to validate requests. The system checks the JWT's issuer, audience, lifetime, and signing key to ensure token integrity.

Endpoints protected with `[Authorize]` require users to be authenticated:
- Currently, the **POST** endpoint is protected, which restricts write access to logged-in users only.
- For testing purposes, you can also protect the **GetAll** endpoint to confirm that it won’t work from the frontend if the user is not logged in.

This setup provides secure and flexible authentication and authorization for both client and server-side operations.