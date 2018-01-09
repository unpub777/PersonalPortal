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

        public async Task<Page<Post>> GetPosts(int index, int pageSize, string tag = null)
        {
			var result = new Page<Post>() { CurrentPage = index, PageSize = pageSize };

			using (var context = new RepositoryContextFactory().CreateDbContext(ConnectionString))
            {
				var query = context.Posts.AsQueryable();
				if (!string.IsNullOrWhiteSpace(tag))
				{
					query = query.Where(p => p.Tags.Any(t => t.TagName == tag));
				}

				result.TotalPages = await query.CountAsync();
				result.Records = await query.Include(p => p.Tags).OrderByDescending(p => p.CreatedDate).Skip(index * pageSize).Take(pageSize).ToListAsync();
            }

			return result;
        }

		public async Task<List<string>> GetAllTagNames()
		{
			using (var context = new RepositoryContextFactory().CreateDbContext(ConnectionString))
			{
				return await context.Tags.Select(t => t.TagName).Distinct().ToListAsync();
			}
		}

		public async Task<Post> GetPost(int postId)
		{
			using (var context = new RepositoryContextFactory().CreateDbContext(ConnectionString))
			{
				return await context.Posts.Include(p => p.Tags).Include(p => p.Comments).FirstOrDefaultAsync(p => p.PostId == postId);
			}
		}
	}
}
