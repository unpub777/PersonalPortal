using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using PersonalPortal.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using PersonalPortal.Helpers;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text;

namespace PersonalPortal.Controllers
{
	[Route("api/[controller]")]
	public class IdentityController : Controller
    {
		IIdentityService _service;

		public IdentityController(IIdentityService service)
		{
			_service = service;
		}

		[Route("token")]
		[HttpPost]
		public async Task Token()
		{
			var username = Request.Form["username"];
			var password = Request.Form["password"];

			var identity = await GetIdentity(username, password);
			if (identity == null)
			{
				Response.StatusCode = 400;
				return;
			}

			var now = DateTime.UtcNow;
			// создаем JWT-токен
			var jwt = new JwtSecurityToken(
					issuer: AuthOptions.ISSUER,
					audience: AuthOptions.AUDIENCE,
					notBefore: now,
					claims: identity.Claims,
					expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
					signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
			var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

			var response = new
			{
				access_token = encodedJwt,
				username = identity.Name
			};

			Response.ContentType = "application/json";
			await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
		}

		private async Task<ClaimsIdentity> GetIdentity(string userName, string password)
		{
			ClaimsIdentity identity = null;
			var user = await _service.GetUser(userName);
			if (user != null)
			{
				var sha256 = new SHA256Managed();
				var passwordHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
				if (passwordHash == user.Password)
				{
					var claims = new List<Claim>
					{
						new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login),
					};
					identity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
				}
			}
			return identity;
		}
	}
}