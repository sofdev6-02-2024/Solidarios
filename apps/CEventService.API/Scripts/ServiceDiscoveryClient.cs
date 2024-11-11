
using System.Text;
using Newtonsoft.Json;

public class ServiceDiscoveryClient
{
    private readonly HttpClient _httpClient;
    private readonly string _serviceDiscoveryUrl;
    private readonly string _serviceName;
    private readonly string _serviceUrl;
    private readonly int _port;

    public ServiceDiscoveryClient(HttpClient httpClient, string serviceDiscoveryUrl, string serviceName, string serviceAddress, int port)
    {
        _httpClient = httpClient;
        _serviceDiscoveryUrl = serviceDiscoveryUrl;
        _serviceName = serviceName;
        _serviceUrl = serviceAddress;
        _port = port;
    }

    public async Task RegisterServiceAsync()
    {
        var response = await _httpClient.GetAsync($"{_serviceDiscoveryUrl}/api/service-registry/services");
        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            var services = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(content);

            if (services != null && !services.ContainsKey(_serviceName))
            {
                var registrationData = new
                {
                    serviceName = _serviceName,
                    address = _serviceUrl,
                    port = _port,
                    healthCheckEndpoint = "health",
                };

                await _httpClient.PostAsync($"{_serviceDiscoveryUrl}/api/service-registry/register", new StringContent(JsonConvert.SerializeObject(registrationData), Encoding.UTF8, "application/json"));
            }
        }
    }
}
