using Models;
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

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<User>().Property(u => u.Login).IsRequired();
			modelBuilder.Entity<User>().Property(u => u.Password).IsRequired();
		}
	}
}
