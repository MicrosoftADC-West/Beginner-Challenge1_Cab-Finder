using Cab_Finder_API.Services.Interfaces;
using Cab_Finder_Lib.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cab_Finder_API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class RidesController : ControllerBase
    {
        private readonly IRideService rideService;

        public RidesController(IRideService rideService)
        {
            this.rideService = rideService;
        }


        [HttpGet("Get")]
        public async Task<IActionResult> Get([FromQuery]LocationCoordinates ridesRequest)
        {

            var result = await rideService.GetRides(ridesRequest.start_location, ridesRequest.end_location);

            if (result.IsSuccess)
            {
                return Ok(result.result);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }


        [HttpPost("Post")]
        public async Task<IActionResult> Post(AddRideDto model)
        {

            var result = await rideService.AddRide(model);

            if (result.IsSuccess)
            {
                return Created("url.com", result.RideId);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> Get(int id)
        {

            var result = await rideService.GetRide(id);

            if (result.IsSuccess)
            {
                return Ok(result.Ride);
            }
            else
            {
                return NotFound(result.Message);
            }
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {

            var result = await rideService.DeleteRide(id);

            if (result.IsSuccess)
            {
                return NoContent();
            }
            else
            {
                return NotFound(result.Message);
            }
        }


        [HttpPut("Put/{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]UpdateRideDto model)
        {

            var result = await rideService.UpdateRide(id, model);

            if (result.IsSuccess)
            {
                return Ok(result.Ride);
            }
            else
            {
                return NotFound(result.Message);
            }
        }
    }
}
