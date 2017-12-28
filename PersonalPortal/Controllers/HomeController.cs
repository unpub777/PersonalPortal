using Microsoft.AspNetCore.Mvc;

namespace PersonalPortal.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
	}
}