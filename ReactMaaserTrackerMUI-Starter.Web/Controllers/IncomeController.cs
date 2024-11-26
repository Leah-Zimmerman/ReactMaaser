using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI_Starter.Data;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private string _connectionString;
        public IncomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
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

        [HttpGet]
        [Route("getTotalIncome")]
        public IActionResult GetTotalIncome()
        {
            var repo = new MoneyRepository(_connectionString);
            decimal totalIncome = repo.GetTotalIncome();
            return Ok(new { totalIncome });
        }
    }
}
