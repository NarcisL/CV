using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelAgencyServer.Models
{
    public class Account
    {
        [Key]
        public string Mail { get; set; }
        public string Password { get; set; }
    }
}
