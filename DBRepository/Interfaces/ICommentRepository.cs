using Models;
using System.Collections.Generic;

namespace DBRepository.Interfaces
{
    public interface ICommentRepository
    {
        List<Comment> GetList();
        void Delete(int commentId);
        void Add(Comment comment);
    }
}
