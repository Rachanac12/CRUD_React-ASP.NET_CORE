using Microsoft.EntityFrameworkCore;

namespace ASP.NET_CORE_Project1.Models
{
    public class DonationDBContext : DbContext
    {
        public DonationDBContext(DbContextOptions<DonationDBContext> options) : base(options)
        {
            
        }
        public DbSet<DonationCandidate> DonationCandidates { get; set; }
    }
}
