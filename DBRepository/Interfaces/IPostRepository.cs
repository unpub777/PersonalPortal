using DBRepository.Models;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
	public interface IPostRepository
    {
		Task<Page<Post>> GetList(int index, int pageSize);
	}
}
