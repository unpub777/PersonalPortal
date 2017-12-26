using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DBRepository.Interfaces;
using Microsoft.Extensions.Configuration;
using DBRepository.Models;

namespace PersonalPortal.Controllers
{
    [Route("api/[controller]")]
    public class BlogController : Controller
    {
        IBlogRepository _repository;
		IConfiguration _config;

		public BlogController(IBlogRepository repository, IConfiguration configuration)
        {
            _repository = repository;
			_config = configuration;
        }

		[Route("posts")]
		[HttpGet]
        public async Task<Page<Post>> GetPosts(int pageIndex)
        {
			var pageSize = _config.GetValue<int>("pageSize");
			var result = await _repository.GetPosts(pageIndex, pageSize);
            return result;
        }

        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
