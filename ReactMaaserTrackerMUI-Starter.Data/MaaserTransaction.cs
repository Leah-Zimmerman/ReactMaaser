namespace ReactMaaserTrackerMUI_Starter.Data
{
    public class MaaserTransaction
    {
        public int Id { get; set; }
        public string Recipient { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
