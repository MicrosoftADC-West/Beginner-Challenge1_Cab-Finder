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
using System.Runtime.InteropServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CabFinder.Controllers
{
    [Route("api/rides")]
    [ApiController]
    public class RidesController : ControllerBase
    {

        private readonly IRideService rideService;
        private readonly ILocationService locationService;
        private readonly IMapper mapper;

        public RidesController(IRideService rideService, IMapper mapper, ILocationService locationService)
        {
            this.rideService = rideService;
            this.mapper = mapper;
            this.locationService = locationService;
        }

        // GET: api/<RidesController>
        [HttpGet]
        [ProducesResponseType(typeof(GetRideDto[]), StatusCodes.Status200OK)]
        public  async Task<IActionResult> Get([FromQuery]StartLocationDto starting, [FromQuery]DestinationLocationDto ending, CancellationToken token)
        {
            var rides = await rideService.ListAll()
                .Include(c => c.rideservice)
                .Include(c => c.location)
                .FilterByLocation(starting, ending)
                .ToListAsync(token);

            return Ok(mapper.Map<List<GetRideDto>>(rides));
        }

        // GET api/<RidesController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(GetRideDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status422UnprocessableEntity)]
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
        [ProducesResponseType(typeof(string), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Post(CreateRideDto model, CancellationToken token)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var locationResult = await locationService.Create(mapper.Map<Location>(model), token);
            if (locationResult.Response == ServiceResponses.Success) {
                var ride = mapper.Map<Ride>(model);
                ride.location_id = locationResult.Data.location_id;
                var result = await rideService.Create(ride, token);
                if (result.Response == ServiceResponses.Success)
                {
                    return StatusCode(StatusCodes.Status201Created, result.Data.ride_id);
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, result.Message);
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError, locationResult.Message);
        }

        // PUT api/<RidesController>/5
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
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
        [ProducesResponseType(typeof(string), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
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
