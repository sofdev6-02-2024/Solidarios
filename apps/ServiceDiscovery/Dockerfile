# Use the .NET 8.0 SDK for building the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy all other files and build the application
COPY . . 
RUN dotnet publish -c Release -o /out

# Use the .NET 8.0 runtime to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /out .

# Set the environment variable to listen on any IP address
ENV ASPNETCORE_URLS=http://0.0.0.0:5198

# Expose the application port
EXPOSE 5198

# Set the entry point
ENTRYPOINT ["dotnet", "ServiceDiscovery.dll"]
