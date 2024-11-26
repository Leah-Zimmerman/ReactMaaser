using System.Text.Json.Serialization;

namespace ReactMaaserTrackerMUI_Starter.Data
{
    public class Source
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public List<IncomeTransaction> IncomeTransactions { get; set; }
    }
}