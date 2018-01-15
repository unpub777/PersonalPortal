using System.ComponentModel.DataAnnotations;

namespace DBRepository.Models
{
	public class User
    {
		public int UserId { get; set; }
		[Required]
		public string Login { get; set; }
		[Required]
		public string Password { get; set; }
		public bool isAdmin { get; set; }
    }
}
