using Microsoft.EntityFrameworkCore;

namespace DBRepository.Repositories
{
    public class BaseRepository
    {
        protected string ConnectionString { get; }
        public BaseRepository(string connectionString)
        {
            ConnectionString = connectionString;
        }
    }
}
