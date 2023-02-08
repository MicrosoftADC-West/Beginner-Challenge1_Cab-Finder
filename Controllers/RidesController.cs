using CabFinder.DTOs;
using CabFinder.Extension;
using CabFinder.Services;
using Connect_Backend_API.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CabFinder.Controllers
{
    [Route("api/rides")]
    [ApiController]
    public class RidesController : ControllerBase
    {

        private readonly IRideService rideService;

        public RidesController(IRideService rideService)
        {
            this.rideService = rideService;
        }

        // GET: api/<RidesController>
        [HttpGet]
        public  async Task<IActionResult> Get([FromQuery]LocationDto starting, [FromQuery]LocationDto ending, CancellationToken token)
        {
            var rides = await rideService.ListAll()
                .Include(c => c.rideservice)
                .Include(c => c.location)
                .FilterByLocation(starting, ending)
                .ToListAsync(token);

            return Ok(rides);
        }

        // GET api/<RidesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id, CancellationToken token)
        {
            return new ControllerResponse().ReturnResponse(await rideService.GetById(id, token));
        }

        // POST api/<RidesController>
        [HttpPost]
        public IActionResult Post(CreateRideDto model, CancellationToken token)
        {
            return Ok();
        }

        // PUT api/<RidesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] string value)
        {
            return Ok();
        }

        // DELETE api/<RidesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok();
        }
    }
}
