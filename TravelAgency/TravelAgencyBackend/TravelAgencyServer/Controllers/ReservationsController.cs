using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using TravelAgencyServer.Models;

namespace TravelAgencyServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly dbContext _dbContext;
        public ReservationsController(dbContext _dbContext)
        {
            this._dbContext = _dbContext;
        }

        // helper class
        private class CustomResponse
        {
            public int ReservationId { get; set; }
            public string Mail { get; set; }
            public string Country { get; set; }
            public float Price { get; set; }
        }

        // GET : api/Reservations?mail={mail}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations(string mail)
        {
            if (string.IsNullOrEmpty(mail))
            {
                return BadRequest(new { message = "Mail parameter required!" });
            }
            if (_dbContext.Reservations is null)
            {
                return NotFound(new { message = "Reservations table is empty!" });
            }
            var reservations = await _dbContext.Reservations
                .Where(r => r.Mail == mail)
                .ToListAsync();
            if (!reservations.Any())
            {
                return NotFound(new { message = "Reservations do not exist!" });
            }

            var response = reservations.Select(r => new CustomResponse
            {
                ReservationId = r.ReservationId,
                Mail = r.Mail,
                Country = r.Country,
                Price = _dbContext.Destinations.FindAsync(r.Country).Result.Price
            });

            return Ok(response);
        }

        // POST : api/Reservations
        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        {
            var existingReservation = await _dbContext.Reservations.
                Where(r => r.ReservationId == reservation.ReservationId).FirstOrDefaultAsync();
            if (existingReservation != null)
            {
                return BadRequest(new { message = "A reservation with this id already exists." });
            }

            _dbContext.Reservations.Add(reservation);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetReservations), reservation);
        }

        // DELETE : api/Reservations?reservationid={reservationid}
        [HttpDelete]
        public async Task<ActionResult<Account>> DeleteReservation(int reservationid)
        {
            if (_dbContext.Reservations is null)
            {
                return NotFound(new { message = "Reservations table is empty!" });
            }
            var reservation = await _dbContext.Reservations.FindAsync(reservationid);
            if (reservation is null)
            {
                return NotFound(new { message = "Reservation does not exist!" });
            }
            _dbContext.Reservations.Remove(reservation);
            await _dbContext.SaveChangesAsync();
            return Ok(new { message = "Reservation deleted." });
        }
    }
}
