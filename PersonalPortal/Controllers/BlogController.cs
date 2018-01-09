using DBRepository.Interfaces;
using DBRepository.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

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

		[Route("page")]
		[HttpGet]
        public async Task<Page<Post>> GetPosts(int pageIndex, string tag)
        {
			var pageSize = _config.GetValue<int>("pageSize");
			var result = await _repository.GetPosts(pageIndex, pageSize, tag);
            return result;
        }

		[Route("post")]
		[HttpGet]
		public async Task<Post> GetPost(int postId)
		{
			var result = await _repository.GetPost(postId);
			return result;
		}

		[Route("tags")]
		[HttpGet]
		public async Task<List<string>> GetTags()
		{
			var result = await _repository.GetAllTagNames();
			return result;
		}
	}
}
