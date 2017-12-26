using DBRepository.Interfaces;
using DBRepository.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBRepository.Repositories
{
	public class BlogRepository : BaseRepository, IBlogRepository
    {
        public BlogRepository(string connectionString) : base(connectionString) { }

        public async Task<Page<Post>> GetPosts(int index, int pageSize)
        {
			var result = new Page<Post>() { CurrentPage = index, PageSize = pageSize };

			using (var context = new RepositoryContextFactory().CreateDbContext(ConnectionString))
            {
				result.TotalPages = await context.Posts.CountAsync();
				result.Records = await context.Posts.OrderByDescending(p => p.CreatedDate).Skip(index * pageSize).Take(pageSize).ToListAsync();
            }

			return result;
        }

		public async Task<List<Tag>> GetTags()
		{
			using (var context = new RepositoryContextFactory().CreateDbContext(ConnectionString))
			{
				return await context.Tags.ToListAsync();
			}
		}
	}
}
