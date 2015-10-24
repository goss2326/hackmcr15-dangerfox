using Nancy;
using Nancy.Responses;
using System.IO;

namespace Dangerfox.Cara.Web.Modules
{
    public class DataModule : NancyModule
    {
        public DataModule()
            : base(modulePath: "/data")
        {
            Get["/{file}"] = args =>
            {
                return new GenericFileResponse(Directory.GetCurrentDirectory() + $"/assets/data/{args.file}.json", "application/json");
            };
        }
    }
}