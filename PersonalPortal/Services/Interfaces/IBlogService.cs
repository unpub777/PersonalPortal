using DBRepository.Models;
using PersonalPortal.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PersonalPortal.Services.Interfaces
{
    public interface IBlogService
    {
		Task<Page<PostLiteViewModel>> GetPosts(int pageIndex, string tag);
		Task<Post> GetPost(int postId);
		Task AddComment(AddCommentRequest request);
		Task<List<string>> GetTags();
	}
}
