using CabFinder.DTOs.Enums;
using CabFinder.DTOs.ServiceDtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Connect_Backend_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ControllerResponse : ControllerBase
    {
        public IActionResult ReturnResponse<T>(CustomResponse<T> customResponse)
        {
            switch (customResponse.Response)
            {
                case ServiceResponses.BadRequest:
                    return BadRequest(customResponse.Message);

                case ServiceResponses.NotFound:
                    return NotFound(customResponse.Message);

                case ServiceResponses.Failed:
                    return UnprocessableEntity(customResponse.Message);

                case ServiceResponses.Success:
                    return Ok(customResponse.Data == null ? customResponse.Response : customResponse.Data);

                case ServiceResponses.ServerError:
                    return StatusCode(StatusCodes.Status500InternalServerError, customResponse.Data == null ? customResponse.Response : customResponse.Data);

                case ServiceResponses.DeleteSuccess:
                    return StatusCode(StatusCodes.Status204NoContent, "");

                default:
                    return UnprocessableEntity(customResponse.Message);
            }
        }
    }
}
