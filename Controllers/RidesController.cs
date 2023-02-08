using AutoMapper;
using CabFinder.DTOs;
using CabFinder.DTOs.Enums;
using CabFinder.DTOs.ServiceDtos;
using CabFinder.Entities;
using CabFinder.Extension;
using CabFinder.Services;
using Connect_Backend_API.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CabFinder.Controllers
{
    [Route("api/rides")]
    [ApiController]
    public class RidesController : ControllerBase
    {

        private readonly IRideService rideService;
        private readonly IMapper mapper;

        public RidesController(IRideService rideService, IMapper mapper)
        {
            this.rideService = rideService;
            this.mapper = mapper;
        }

        // GET: api/<RidesController>
        [HttpGet]
        public  async Task<IActionResult> Get([FromQuery]StartLocationDto starting, [FromQuery]DestinationLocationDto ending, CancellationToken token)
        {
            var rides = await rideService.ListAll()
                .Include(c => c.rideservice)
                .Include(c => c.location)
                //.FilterByLocation(starting, ending)
                .ToListAsync(token);

            return Ok(mapper.Map<List<GetRideDto>>(rides));
        }

        // GET api/<RidesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id, CancellationToken token)
        {
            var result = await rideService.GetById(id, token);

            switch (result.Response)
            {
                case ServiceResponses.BadRequest:
                    return BadRequest(result.Message);

                case ServiceResponses.NotFound:
                    return NotFound(result.Message);

                case ServiceResponses.Success:
                    return Ok(mapper.Map<GetRideDto>(result.Data));

                default:
                    return UnprocessableEntity(result.Message);
            }
        }

        // POST api/<RidesController>
        [HttpPost]
        public async Task<IActionResult> Post(CreateRideDto model, CancellationToken token)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await rideService.Create(mapper.Map<Ride>(model), token);
            if(result.Response == ServiceResponses.Success)
            {
                return Created("",result.Data.ride_id);
            }

            return StatusCode(StatusCodes.Status500InternalServerError, result.Message);
        }

        // PUT api/<RidesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UpdateRideDto model, CancellationToken token)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingRide = await rideService.GetById(id, token);
            if (existingRide.Response == ServiceResponses.Success)
            {
                existingRide.Data = mapper.Map(model, existingRide.Data);
                var result = await rideService.Update(existingRide.Data, token);
                return new ControllerResponse().ReturnResponse(result);
            }
            else if(existingRide.Response == ServiceResponses.NotFound)
            {
                return NotFound(existingRide.Message);
            }
            else
            {
                return BadRequest(existingRide.Message);
            }
        }

        // DELETE api/<RidesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, CancellationToken token)
        {
            var existingRide = await rideService.GetById(id, token);
            if (existingRide.Response == ServiceResponses.Success)
            {
                var result = await rideService.Delete(existingRide.Data, token);
                return new ControllerResponse().ReturnResponse(result);
            }
            else if (existingRide.Response == ServiceResponses.NotFound)
            {
                return NotFound(existingRide.Message);
            }
            else
            {
                return BadRequest(existingRide.Message);
            }
        }
    }
}
