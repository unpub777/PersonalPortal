using Models;
using System.Threading.Tasks;

namespace PersonalPortal.Services.Interfaces
{
	public interface IIdentityService
    {
		Task<User> GetUser(string userName);
	}
}
