using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using DBRepository.Interfaces;
using DBRepository.Repositories;
using Microsoft.AspNetCore.Http;
using DBRepository;
using AutoMapper;
using PersonalPortal.Services.Interfaces;
using PersonalPortal.Services.Implementation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using PersonalPortal.Helpers;
using System;

namespace PersonalPortal
{
    public class Startup
    {
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
					.AddJwtBearer(options =>
					{
						options.RequireHttpsMetadata = false;
						options.SaveToken = true;
						options.TokenValidationParameters = new TokenValidationParameters
						{
							ValidIssuer = AuthOptions.ISSUER,
							ValidAudience = AuthOptions.AUDIENCE,
							IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
							ValidateLifetime = true,
							ValidateIssuerSigningKey = true,
							ClockSkew = TimeSpan.Zero
						};
					});

			services.AddMvc();
			services.AddAutoMapper();

			services.AddScoped<IRepositoryContextFactory, RepositoryContextFactory>();
			services.AddScoped<IBlogRepository>(provider => new BlogRepository(Configuration.GetConnectionString("DefaultConnection"), provider.GetService<IRepositoryContextFactory>()));
			services.AddScoped<IIdentityRepository>(provider => new IdentityRepository(Configuration.GetConnectionString("DefaultConnection"), provider.GetService<IRepositoryContextFactory>()));
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

	        if (env.IsDevelopment())
	        {
		        app.UseWebpackDevMiddleware();
	        }

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
		}
    }
}
