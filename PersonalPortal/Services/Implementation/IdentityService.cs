using PersonalPortal.Services.Interfaces;
using System.Threading.Tasks;
using Models;
using DBRepository.Interfaces;

namespace PersonalPortal.Services.Implementation
{
	public class IdentityService : IIdentityService
	{
		IIdentityRepository _repository;

		public IdentityService(IIdentityRepository repository)
		{
			_repository = repository;
		}

		public async Task<User> GetUser(string userName)
		{
			return await _repository.GetUser(userName);
		}
	}
}
