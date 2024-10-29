namespace ServiceDiscovery.Dtos;

public class ServiceRegistrationInputDto
{
    public required string ServiceName { get; set; }      
    // ...../apigateway/serviceName/everything 
    public required string Address { get; set; }           
    public int Port { get; set; }                 
    public required string HealthCheckEndpoint { get; set; }
}