using DBRepository;
using DBRepository.Interfaces;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.IO;

namespace PersonalPortal
{
	public class Program
    {
        public static void Main(string[] args)
        {
			var host = BuildWebHost(args);

			var builder = new ConfigurationBuilder()
				.SetBasePath(Directory.GetCurrentDirectory())
				.AddJsonFile("appsettings.json");
			var config = builder.Build();

			using (var scope = host.Services.CreateScope())
			{
				var services = scope.ServiceProvider;

				var factory = services.GetRequiredService<IRepositoryContextFactory>();
				DbInitializer.Initialize(factory.CreateDbContext(config.GetConnectionString("DefaultConnection")));
			}

			host.Run();
		}

		public static IWebHost BuildWebHost(string[] args) =>
			WebHost.CreateDefaultBuilder(args)
				.UseStartup<Startup>()
				.Build();
	}
}
