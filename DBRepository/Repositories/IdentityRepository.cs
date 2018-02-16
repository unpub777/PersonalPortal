using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Threading.Tasks;

namespace DBRepository.Repositories
{
    public class IdentityRepository : BaseRepository, IIdentityRepository
	{
		public IdentityRepository(string connectionString) : base(connectionString) { }

		public async Task<User> GetUser(string userName)
		{
			using (var context = new RepositoryContextFactory().CreateDbContext(ConnectionString))
			{
				return await context.Users.FirstOrDefaultAsync(u => u.Login == userName);
			}
		}
	}
}
