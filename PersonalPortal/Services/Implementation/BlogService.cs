using System.Collections.Generic;
using System.Threading.Tasks;
using Models;
using PersonalPortal.Services.Interfaces;
using PersonalPortal.ViewModels;
using DBRepository.Interfaces;
using Microsoft.Extensions.Configuration;
using AutoMapper;

namespace PersonalPortal.Services.Implementation
{
	public class BlogService : IBlogService
	{
		IBlogRepository _repository;
		IConfiguration _config;
		IMapper _mapper;

		public BlogService(IBlogRepository repository, IConfiguration configuration, IMapper mapper)
		{
			_repository = repository;
			_config = configuration;
			_mapper = mapper;
		}

		public async Task AddComment(AddCommentRequest request)
		{
			var comment = _mapper.Map<AddCommentRequest, Comment>(request);
			await _repository.AddComment(comment);
		}

		public async Task AddPost(AddPostRequest request)
		{
			var post = _mapper.Map<AddPostRequest, Post>(request);
			await _repository.AddPost(post);
		}

		public async Task<Post> GetPost(int postId)
		{
			var result = await _repository.GetPost(postId);
			return result;
		}

		public async Task DeletePost(int postId)
		{
			await _repository.DeletePost(postId);
		}

		public async Task DeleteComment(int commentId)
		{
			await _repository.DeleteComment(commentId);
		}

		public async Task<Page<PostLiteViewModel>> GetPosts(int pageIndex, string tag)
		{
			var pageSize = _config.GetValue<int>("pageSize");
			var page = await _repository.GetPosts(pageIndex, pageSize, tag);
			var result = _mapper.ToMappedPage<Post, PostLiteViewModel>(page);
			return result;
		}

		public async Task<List<string>> GetTags()
		{
			var result = await _repository.GetAllTagNames();
			return result;
		}
	}
}
