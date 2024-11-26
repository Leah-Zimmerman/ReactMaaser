using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ReactMaaserTrackerMUI_Starter.Data
{
    public class MoneyDbContext : DbContext
    {
        private string _connectionString;
        public MoneyDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define the one-to-many relationship
            modelBuilder.Entity<IncomeTransaction>()
                .HasOne(it => it.Source)
                .WithMany(s => s.IncomeTransactions)
                .HasForeignKey(it => it.SourceId);
        }

        public DbSet<IncomeTransaction> IncomeTransactions { get; set; }
        public DbSet<MaaserTransaction> MaaserTransactions { get; set; }
        public DbSet<Source> Sources { get; set; }
    }
}
