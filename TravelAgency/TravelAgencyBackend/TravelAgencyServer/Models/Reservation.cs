using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelAgencyServer.Models
{
    public class Reservation
    {
        [Key]
        public int ReservationId { get; set; }

        [ForeignKey("Account")]
        public string Mail { get; set; }
        public virtual Account Account { get; set; }

        [ForeignKey("Destination")]
        public string Country { get; set; }
        public virtual Destination Destination { get; set; }
    }
}
