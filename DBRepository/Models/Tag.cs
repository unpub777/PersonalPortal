namespace DBRepository.Models
{
	public class Tag
	{
		public int TagId { get; set; }
		public string TagName { get; set; }
		public int PostId { get; set; }
		public virtual Post Post { get; set; }
	}
}
