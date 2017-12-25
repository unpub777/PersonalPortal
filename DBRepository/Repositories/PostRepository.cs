using DBRepository.Interfaces;
using DBRepository.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DBRepository.Repositories
{
	public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(string connectionString) : base(connectionString) { }

        public async Task<Page<Post>> GetList(int index, int pageSize)
        {
			var result = new Page<Post>() { CurrentPage = index, PageSize = pageSize };

            using (var context = new RepositoryContext(OptionsBuilder.Options))
            {
				result.TotalPages = await context.Posts.CountAsync();
				result.Records = await context.Posts.Skip(index * pageSize).Take(pageSize).ToListAsync();
            }

			return result;
        }
    }
}
