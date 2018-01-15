using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using DBRepository.Interfaces;
using DBRepository.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using DBRepository;
using AutoMapper;
using PersonalPortal.Services.Interfaces;
using PersonalPortal.Services.Implementation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using PersonalPortal.Helpers;

namespace PersonalPortal
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
					.AddJwtBearer(options =>
					{
						options.RequireHttpsMetadata = false;
						options.TokenValidationParameters = new TokenValidationParameters
						{
							// укзывает, будет ли валидироваться издатель при валидации токена
							ValidateIssuer = true,
							// строка, представляющая издателя
							ValidIssuer = AuthOptions.ISSUER,

							// будет ли валидироваться потребитель токена
							ValidateAudience = true,
							// установка потребителя токена
							ValidAudience = AuthOptions.AUDIENCE,
							// будет ли валидироваться время существования
							ValidateLifetime = true,

							// установка ключа безопасности
							IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
							// валидация ключа безопасности
							ValidateIssuerSigningKey = true,
						};
					});

			services.AddMvc();
			services.AddAutoMapper();

			services.AddDbContext<RepositoryContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
			services.AddScoped<IBlogRepository>(provider => new BlogRepository(Configuration.GetConnectionString("DefaultConnection")));
			services.AddScoped<IIdentityRepository>(provider => new IdentityRepository(Configuration.GetConnectionString("DefaultConnection")));
			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
			services.AddSingleton<IConfiguration>(Configuration);
			services.AddScoped<IBlogService, BlogService>();
			services.AddScoped<IIdentityService, IdentityService>();
		}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

			app.UseAuthentication();
			app.UseStaticFiles();
			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller=Home}/{action=Index}/{id?}");
				routes.MapRoute(
					name: "DefaultApi",
					template: "api/{controller}/{action}/{id?}");
				routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
			});

			using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
			{
				var context = serviceScope.ServiceProvider.GetService<RepositoryContext>();

				DbInitializer.Initialize(context);
			}
		}
    }
}
