using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelAgencyServer.Models
{
    public class Destination
    {
        [Key]
        public string Country { get; set; }
        public float Price { get; set; }
        //public string PdfName { get; set; }
        //public byte[] PdfData { get; set; }
    }
}
