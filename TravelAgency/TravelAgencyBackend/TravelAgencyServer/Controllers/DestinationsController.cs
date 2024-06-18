using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelAgencyServer.Models;

namespace TravelAgencyServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DestinationsController : ControllerBase
    {
        private readonly dbContext _dbContext;
        public DestinationsController(dbContext _dbContext)
        {
            this._dbContext = _dbContext;
        }

        // GET : api/Destinations?country={country}
        [HttpGet("country")]
        public async Task<ActionResult<Destination>> GetDestination(string country)
        {
            if (string.IsNullOrEmpty(country))
            {
                return BadRequest(new { message = "Country parameter required!" });
            }
            if (_dbContext.Destinations == null)
            {
                return NotFound(new { message = "Destinations table is empty!" });
            }
            var destination = await _dbContext.Destinations.FindAsync(country);
            if (destination == null)
            {
                return NotFound(new { message = "Destination does not exist!" });
            }
            return Ok(destination);
        }

        // GET : api/Destinations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Destination>>> GetDestinations()
        {
            return await _dbContext.Destinations.ToListAsync();
        }
    }
}
