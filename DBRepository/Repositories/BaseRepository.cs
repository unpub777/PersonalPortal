using Microsoft.EntityFrameworkCore;

namespace DBRepository.Repositories
{
    public class BaseRepository
    {
        protected string ConnectionString { get; }
        protected DbContextOptionsBuilder<RepositoryContext> OptionsBuilder { get; }
        public BaseRepository(string connectionString)
        {
            ConnectionString = connectionString;
            OptionsBuilder = new DbContextOptionsBuilder<RepositoryContext>();
            OptionsBuilder.UseSqlServer(ConnectionString);
        }
    }
}
