using System;

namespace DBRepository.Models
{
    public class Post
    {
        public int PostId { get; set; }
        public string Header { get; set; }
        public string Body { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
