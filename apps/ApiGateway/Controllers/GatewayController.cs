namespace ApiGateway.Controllers;

using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

[ApiController]
[Route("{serviceName}/{*path}")]
public class GatewayController : ControllerBase
{
    private readonly RequestRouter _requestRouter;
    private readonly IHttpClientFactory _clientFactory;

    public GatewayController(RequestRouter requestRouter, IHttpClientFactory clientFactory)
    {
        _requestRouter = requestRouter;
        _clientFactory = clientFactory;
    }

    [HttpGet, HttpPost, HttpPut, HttpDelete, HttpPatch]
    public async Task<IActionResult> ProxyRequest(string serviceName, string path)
    {
        var requestMessage = new HttpRequestMessage(new HttpMethod(Request.Method), Request.Path)
        {
            Content = new StreamContent(Request.Body)
        };

        foreach (var header in Request.Headers)
        {
            requestMessage.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
        }
        
        var queryString = Request.QueryString.Value;
        var response = await _requestRouter.RedirectRequestAsync(serviceName, path, requestMessage, queryString);

        var responseContent = await response.Content.ReadAsStringAsync();
        return StatusCode((int)response.StatusCode, responseContent);
    }

}
