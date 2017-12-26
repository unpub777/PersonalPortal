using DBRepository.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
	public interface IBlogRepository
    {
		Task<Page<Post>> GetPosts(int index, int pageSize);
		Task<List<Tag>> GetTags();
	}
}
