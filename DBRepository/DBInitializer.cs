using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace DBRepository
{
	public static class DbInitializer
	{
		public async static Task Initialize(RepositoryContext context)
		{
			await context.Database.MigrateAsync();

			var userCount = await context.Users.CountAsync().ConfigureAwait(false);
			if (userCount == 0)
			{
				context.Users.Add(new Models.User()
				{
					Login = "admin",
					Password = "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
					isAdmin = true
				});
				context.Posts.Add(new Models.Post()
				{
					Header = "Учетная запись админа",
					Body = "Login/Password: admin/admin",
					CreatedDate = DateTime.Now
				});

				await context.SaveChangesAsync().ConfigureAwait(false);
			}
		}
	}
}
