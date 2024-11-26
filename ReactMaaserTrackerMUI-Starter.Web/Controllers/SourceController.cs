using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI_Starter.Data;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SourceController : ControllerBase
    {
        private string _connectionString;
        public SourceController(IConfiguration configuration)
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
        

    }
}
