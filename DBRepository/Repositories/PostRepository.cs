using DBRepository.Interfaces;
using System.Collections.Generic;
using DBRepository.Models;
using System.Linq;

namespace DBRepository.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(string connectionString) : base(connectionString) { }

        public List<Post> GetList()
        {
            using (var context = new RepositoryContext(OptionsBuilder.Options))
            {
                return context.Posts.ToList();
            }
        }
    }
}
