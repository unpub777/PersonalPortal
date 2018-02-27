using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DBRepository.Repositories
{
    public abstract class BaseRepository
    {
        protected string ConnectionString { get; }
		protected IRepositoryContextFactory ContextFactory { get; }
		public BaseRepository(string connectionString, IRepositoryContextFactory contextFactory)
        {
            ConnectionString = connectionString;
			ContextFactory = contextFactory;
        }
    }
}
