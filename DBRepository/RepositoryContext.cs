using DBRepository.Models;
using Microsoft.EntityFrameworkCore;

namespace DBRepository
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions<RepositoryContext> options) : base(options)
        {

        }

		public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
		public DbSet<Tag> Tags { get; set; }
		public DbSet<User> Users { get; set; }
	}
}
