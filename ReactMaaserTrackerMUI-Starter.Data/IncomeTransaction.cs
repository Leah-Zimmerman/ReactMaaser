namespace ReactMaaserTrackerMUI_Starter.Data
{
    public class IncomeTransaction
    {
        public int Id { get; set; }
        public int SourceId { get;set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }


        public Source Source { get; set; }
    }


}