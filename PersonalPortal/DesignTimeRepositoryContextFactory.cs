using DBRepository;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;

namespace PersonalPortal
{
    public class DesignTimeRepositoryContextFactory : IDesignTimeDbContextFactory<RepositoryContext>
	{
		public RepositoryContext CreateDbContext(string[] args)
		{
			var basePath = AppContext.BaseDirectory;
			var environmentName = Environment.GetEnvironmentVariable("Hosting:Environment");

			var builder = new ConfigurationBuilder()
				 .SetBasePath(basePath)
				 .AddJsonFile("appsettings.json")
				 .AddJsonFile($"appsettings.{environmentName}.json", true)
				 .AddEnvironmentVariables();

			var config = builder.Build();
			var connectionString = config.GetConnectionString("DefaultConnection");
			var repositoryFactory = new RepositoryContextFactory();

			return repositoryFactory.CreateDbContext(connectionString);
		}
	}
}
