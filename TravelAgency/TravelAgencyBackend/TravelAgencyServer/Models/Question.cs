using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TravelAgencyServer.Models
{
    public class Question
    {
        public int Id { get; set; }

        [ForeignKey("Account")]
        public string Mail { get; set; }

        [JsonIgnore]
        public virtual Account Account { get; set; }

        public string Text { get; set; }
    }
}