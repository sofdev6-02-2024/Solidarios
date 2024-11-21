﻿# Cevent

## Prerequisites

Ensure you have Docker and Docker Compose installed on your machine.

## Setup Instructions

This project requires a few services to be run through Docker Compose, while some services (like the API Gateway and the core API service) need to be started manually.

### 1. Run Docker Compose Services

To start the essential dependencies, including **Service Discovery**, **Consul**, and **SQL Server** (database), run the following command:

```bash
docker-compose up -d
```

This will start:

- **Consul**: Service discovery tool, accessible at `http://localhost:8500`.
- **Service Discovery**: Handles dynamic routing of services via Consul.
- **SQL Server Database**: A containerized SQL Server instance, pre-configured with necessary environment variables.

### 2. Register a Service in Service Discovery

To register a service in the Service Discovery, you need to send a `POST` request to `/api/service-registry/register` with the following JSON body (you can do it with swagger):

```json
{
  "serviceName": "cevent-service",
  "address": "localhost",
  "port": 5000,
  "healthCheckEndpoint": "/health"
}
```

- **serviceName**: The name of the service you are registering (e.g., `cevent-service`).
- **address**: The address where the service is accessible. Use the container name if running in Docker (e.g., `ceventservice`).
- **port**: The port on which the service is exposed (e.g., `5000`).
- **healthCheckEndpoint**: The endpoint to check if the service is healthy (e.g., `/health`).

### 3. Run API Gateway and CEvent Service API Independently

After running Docker Compose, you’ll need to start the `ApiGateway` and `CEventService.API` services independently.

#### Start API Gateway

Navigate to the `ApiGateway` directory and run the following commands:

```bash
cd ApiGateway
dotnet run
```

This will start the API Gateway on the configured port (ensure it matches the `docker-compose.yml` configuration for consistency).

#### Start CEvent Service API

Navigate to the `CEventService.API` directory and run the following commands:

```bash
cd CEventService.API
dotnet run
```

This will start the core API service for event management, allowing the API Gateway to route requests to it.

### Set up keycloak.

```
port: 8080
user and password default: admin
```

Create new realm;

```
	- Realm name: solidarios-realm
      click on Create
```

Go to Clients

```
- Create client
- Client ID: next-client
- Name: none or next-client
	  click on next

- Client authentication: on
	  click on next

- Root URL: http://localhost:3000/
- Home URL: http://localhost:3000/
- Valid redict URls: http://localhost:3000/*
- Valid post logout redict URls: http://localhost:3000/*
- Web origins: http://localhost:3000/*
	  click on save
```

Clients

```
	- Go to Credentials
	- Copy Client Secret and put on the fronend .env for FRONTEND_CLIENT_SECRET="paste here"
```

Go to Real settings

    - go to Login
    	- User registration: On

## Additional Notes

- **Consul** is accessible at `http://localhost:8500` for checking registered services.
- Make sure the services are properly registered with the correct URLs to enable smooth routing between the `ApiGateway` and `CEventService.API`.
- Use `docker-compose down` to stop the Docker Compose services when done.

## Troubleshooting

If you encounter issues with connectivity or `Connection Refused` errors, ensure:

- All services are running and accessible within the Docker network.
- Environment variables are correctly configured in each service’s settings.

## Future Improvements

- Automate the startup of the `ApiGateway` and `CEventService.API` through Docker if feasible.
- Add more robust health checks to the services for better resilience and diagnostics.

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
