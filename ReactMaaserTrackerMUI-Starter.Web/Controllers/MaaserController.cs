using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI_Starter.Data;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaaserController : ControllerBase
    {
        private string _connectionString;
        public MaaserController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
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
        public List<MaaserTransaction> GetMaaserTransactions()
        {
            var repo = new MoneyRepository(_connectionString);
            return repo.GetMaaserTransactions();
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
