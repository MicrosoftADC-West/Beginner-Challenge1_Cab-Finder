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
                    ModelState.AddModelError($"{customResponse.Response}", customResponse.Message);
                    return BadRequest(ModelState);

                case ServiceResponses.NotFound:
                    ModelState.AddModelError($"{customResponse.Response}", customResponse.Message);
                    return NotFound(ModelState);

                case ServiceResponses.Failed:
                    ModelState.AddModelError($"{customResponse.Response}", customResponse.Message);
                    return UnprocessableEntity(ModelState);

                case ServiceResponses.Success:
                    return Ok(customResponse.Data == null ? customResponse.Response : customResponse.Data);

                default:
                    ModelState.AddModelError($"{customResponse.Response}", customResponse.Message);
                    return UnprocessableEntity(ModelState);
            }
        }
    }
}
