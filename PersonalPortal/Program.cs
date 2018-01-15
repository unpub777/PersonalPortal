using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace PersonalPortal
{
	public class Program
    {
        public static void Main(string[] args)
        {
			var host = BuildWebHost(args);
			host.Run();
		}

		public static IWebHost BuildWebHost(string[] args) =>
		   new WebHostBuilder()
				.UseKestrel()
				.UseContentRoot(Directory.GetCurrentDirectory())
				.UseStartup<Startup>()
				.UseIISIntegration()
				.Build();
	}
}
