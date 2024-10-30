# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the application files
COPY . .
RUN dotnet publish -c Release -o /out

# Stage 2: Set up runtime environment
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy published application from build stage
COPY --from=build /out .

# Copy the data.sql file into the Scripts directory within the container
COPY ./Scripts/data.sql /app/Scripts/data.sql

# Configure environment and expose port
ENV ASPNETCORE_URLS=http://0.0.0.0:5000
EXPOSE 5000

# Set the entrypoint for the container
ENTRYPOINT ["dotnet", "CEventService.API.dll"]
