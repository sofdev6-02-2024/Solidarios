# Cevent
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
