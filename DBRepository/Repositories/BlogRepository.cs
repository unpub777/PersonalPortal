using DBRepository.Interfaces;
using Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace DBRepository.Repositories
{
	public class BlogRepository : BaseRepository, IBlogRepository
    {
        public BlogRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

        public async Task<Page<Post>> GetPosts(int index, int pageSize, string tag = null)
        {
			var result = new Page<Post>() { CurrentPage = index, PageSize = pageSize };

			using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
				var query = context.Posts.AsQueryable();
				if (!string.IsNullOrWhiteSpace(tag))
				{
					query = query.Where(p => p.Tags.Any(t => t.TagName == tag));
				}

				result.TotalPages = await query.CountAsync();
				result.Records = await query.Include(p => p.Tags).Include(p => p.Comments).OrderByDescending(p => p.CreatedDate).Skip(index * pageSize).Take(pageSize).ToListAsync();
            }

			return result;
        }

		public async Task<List<string>> GetAllTagNames()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				return await context.Tags.Select(t => t.TagName).Distinct().ToListAsync();
			}
		}

		public async Task<Post> GetPost(int postId)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				return await context.Posts.Include(p => p.Tags).Include(p => p.Comments).FirstOrDefaultAsync(p => p.PostId == postId);
			}
		}

		public async Task AddComment(Comment comment)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				context.Comments.Add(comment);
				await context.SaveChangesAsync();
			}
		}

		public async Task AddPost(Post post)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				context.Posts.Add(post);
				await context.SaveChangesAsync();
			}
		}

	    public async Task DeletePost(int postId)
	    {
		    using (var context = ContextFactory.CreateDbContext(ConnectionString))
		    {
			    var post = new Post() { PostId = postId };
			    context.Posts.Remove(post);
			    await context.SaveChangesAsync();
		    }
	    }

	    public async Task DeleteComment(int commentId)
	    {
		    using (var context = ContextFactory.CreateDbContext(ConnectionString))
		    {
			    var coomment = new Comment() { CommentId = commentId };
			    context.Comments.Remove(coomment);
			    await context.SaveChangesAsync();
		    }
	    }
	}
}
