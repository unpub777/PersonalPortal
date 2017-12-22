using DBRepository.Models;
using System.Collections.Generic;

namespace DBRepository.Interfaces
{
    public interface IPostRepository
    {
        List<Post> GetList();
    }
}
