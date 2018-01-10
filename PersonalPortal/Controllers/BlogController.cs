using AutoMapper;
using DBRepository.Interfaces;
using DBRepository.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PersonalPortal.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PersonalPortal.Controllers
{
	[Route("api/[controller]")]
    public class BlogController : Controller
    {
        IBlogRepository _repository;
		IConfiguration _config;
		IMapper _mapper;

		public BlogController(IBlogRepository repository, IConfiguration configuration, IMapper mapper)
        {
            _repository = repository;
			_config = configuration;
			_mapper = mapper;
        }

		[Route("page")]
		[HttpGet]
        public async Task<Page<PostLiteViewModel>> GetPosts(int pageIndex, string tag)
        {
			var pageSize = _config.GetValue<int>("pageSize");
			var page = await _repository.GetPosts(pageIndex, pageSize, tag);
			var result = _mapper.ToMappedPage<Post, PostLiteViewModel>(page);
            return result;
        }

		[Route("post")]
		[HttpGet]
		public async Task<Post> GetPost(int postId)
		{
			var result = await _repository.GetPost(postId);
			return result;
		}

		[Route("comment")]
		[HttpPost]
		public async Task AddComment([FromBody] AddCommentRequest request)
		{
			var comment = _mapper.Map<AddCommentRequest, Comment>(request);
			await _repository.AddComment(comment);
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
