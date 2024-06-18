using Microsoft.EntityFrameworkCore;

namespace TravelAgencyServer.Models
{
    public class dbContext : DbContext
    {
        public dbContext(DbContextOptions<dbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // data seeding
            modelBuilder.Entity<Account>().HasData(
                new Account
                {
                    Mail = "test@mail.com",
                    Password = "1234"
                }
            );

            modelBuilder.Entity<Destination>().HasData(
                new Destination
                {
                    Country = "Morocco",
                    Price = 1000
                }
            );
            modelBuilder.Entity<Destination>().HasData(
                new Destination
                {
                    Country = "Romania",
                    Price = 1000
                }
            );
            modelBuilder.Entity<Destination>().HasData(
                new Destination
                {
                    Country = "Seychelles Island",
                    Price = 1000
                }
            );
            modelBuilder.Entity<Destination>().HasData(
                new Destination
                {
                    Country = "Turkey",
                    Price = 1000
                }
            );
            modelBuilder.Entity<Destination>().HasData(
                new Destination
                {
                    Country = "Maldives",
                    Price = 1000
                }
            );
            modelBuilder.Entity<Destination>().HasData(
                new Destination
                {
                    Country = "France",
                    Price = 1000
                }
            );
            modelBuilder.Entity<Destination>().HasData(
                new Destination
                {
                    Country = "Italy",
                    Price = 1000
                }
            );
            modelBuilder.Entity<Destination>().HasData(
                new Destination
                {
                    Country = "Egypt",
                    Price = 1000
                }
            );
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
    }
}
