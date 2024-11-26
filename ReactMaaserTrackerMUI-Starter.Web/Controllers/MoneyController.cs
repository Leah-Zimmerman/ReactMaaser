using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI_Starter.Data;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoneyController : ControllerBase
    {
        private string _connectionString;
        public MoneyController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpPost]
        [Route("addSource")]
        public void AddSource(string name)
        {
            var repo = new MoneyRepository(_connectionString);
            repo.AddSource(name);
        }
        [HttpGet]
        [Route("getSources")]
        public List<Source> GetSources()
        {
            var repo = new MoneyRepository(_connectionString);
            return repo.GetSources();
        }
        [HttpPost]
        [Route("editSource")]
        public void EditSource(Source source)
        {
            var repo = new MoneyRepository(_connectionString);
            repo.EditSource(source);
        }
        [HttpPost]
        [Route("deleteSource")]
        public void DeleteSource(int id)
        {
            var repo = new MoneyRepository(_connectionString);
            repo.DeleteSource(id);
        }
        [HttpPost]
        [Route("addIncome")]
        public void AddIncome(IncomeTransaction it)
        {
            var repo = new MoneyRepository(_connectionString);
            repo.AddIncomeTransaction(it);
        }
        [HttpGet]
        [Route("getIncomeTransactions")]
        public List<IncomeTransaction> GetIncomeTransactions()
        {
            var repo = new MoneyRepository(_connectionString);
            return repo.GetAllIncomeTransactions();
        }
        [HttpGet]
        [Route("getGroupedIncomeTransactions")]
        public List<IncomeSourceTransaction> GetGroupedIncomeTransactions()
        {
            var repo = new MoneyRepository(_connectionString);
            return repo.GetGroupedIncomeTransactions();
        }
        [HttpPost]
        [Route("addMaaser")]
        public void AddMaaser(MaaserTransaction mt)
        {
            var repo = new MoneyRepository(_connectionString);
            repo.AddMaaser(mt);
        }
        [HttpGet]
        [Route("getMaaserTransactions")]
        public List<MaaserTransaction>GetMaaserTransactions()
        {
            var repo = new MoneyRepository(_connectionString);
            return repo.GetMaaserTransactions();
        }
        [HttpGet]
        [Route("getTotalIncome")]
        public IActionResult GetTotalIncome()
        {
            var repo = new MoneyRepository(_connectionString);
            decimal totalIncome = repo.GetTotalIncome();
            return Ok(new { totalIncome });
        }
        [HttpGet]
        [Route("getTotalMaaser")]
        public IActionResult GetTotalMaaser()
        {
            var repo = new MoneyRepository(_connectionString);
            decimal totalMaaser = repo.GetTotalMaaser();
            return Ok(new { totalMaaser });
        }
    }
}
