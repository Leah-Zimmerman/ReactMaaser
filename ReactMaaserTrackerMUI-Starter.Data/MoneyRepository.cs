using Microsoft.EntityFrameworkCore;

namespace ReactMaaserTrackerMUI_Starter.Data
{
    public class MoneyRepository
    {
        private string _connectionString;
        public MoneyRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddSource(string name)
        {
            var context = new MoneyDbContext(_connectionString);
            context.Sources.Add(new Source
            {
                Name = name
            });
            context.SaveChanges();
        }
        public List<Source> GetSources()
        {
            var context = new MoneyDbContext(_connectionString);
            return context.Sources.ToList();
        }
        public void EditSource(Source source)
        {
            var context = new MoneyDbContext(_connectionString);
            var sourceToUpdate = context.Sources.FirstOrDefault(s => s.Id == source.Id);
            if (sourceToUpdate != null)
            {
                sourceToUpdate.Name = source.Name;
                context.SaveChanges();
            }
            else
            {
                throw new ArgumentException($"Source with ID {source.Id} not found.");
            }
        }
        public void DeleteSource(int sourceId)
        {
            using var context = new MoneyDbContext(_connectionString);
            var source = context.Sources.FirstOrDefault(s => s.Id == sourceId);

            if (source != null)
            {
                context.Sources.Remove(source);
                context.SaveChanges();
            }
            else
            {
                throw new ArgumentException($"Source with ID {sourceId} not found.");
            }
        }
        public void AddIncomeTransaction(IncomeTransaction it)
        {
            using var context = new MoneyDbContext(_connectionString);
            context.IncomeTransactions.Add(it);
            context.SaveChanges();
        }
        public List<IncomeTransaction> GetAllIncomeTransactions()
        {
            using var context = new MoneyDbContext(_connectionString);
            return context.IncomeTransactions.Include(it => it.Source).ToList();
        }
        public List<IncomeSourceTransaction> GetGroupedIncomeTransactions()
        {
            using var context = new MoneyDbContext(_connectionString);
            return context.Sources.Include(s => s.IncomeTransactions).Select(s => new IncomeSourceTransaction
            {
                Source = s,
                Incomes = s.IncomeTransactions.ToList()
            }).ToList();
        }
        public void AddMaaser(MaaserTransaction mt)
        {
            using var context = new MoneyDbContext(_connectionString);
            context.MaaserTransactions.Add(mt);
            context.SaveChanges();
        }
        public List<MaaserTransaction> GetMaaserTransactions()
        {
            using var context = new MoneyDbContext(_connectionString);
            return context.MaaserTransactions.ToList();
        }
        public decimal GetTotalIncome()
        {
            using var context = new MoneyDbContext(_connectionString);
            return context.IncomeTransactions.Sum(it => it.Amount);
        }
        public decimal GetTotalMaaser()
        {
            using var context = new MoneyDbContext(_connectionString);
            return context.MaaserTransactions.Sum(mt => mt.Amount);
        }
    }
}