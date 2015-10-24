using Nancy;

namespace Dangerfox.Cara.Web.Modules
{
    public class HomeModule : NancyModule
    {
        public HomeModule()
        {
            Get["/"] = _ => View["index"];
        }
    }
}