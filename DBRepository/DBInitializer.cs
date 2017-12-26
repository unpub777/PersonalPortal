using Microsoft.EntityFrameworkCore;

namespace DBRepository
{
	public static class DbInitializer
	{
		public static void Initialize(RepositoryContext context)
		{
			context.Database.Migrate();
		}
	}
}
