using Nancy;
using SquishIt.Framework;
using System.IO;
using System.Text;

namespace Dangerfox.Cara.Web.Modules
{
    /// <summary>
    /// A module to handle requests for bundled resources.
    /// </summary>
    public class BundleModule : NancyModule
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="BundleModule"/> class.
        /// </summary>
        public BundleModule()
            : base(modulePath: "/bundles")
        {
            Get["/scripts/{name}.js"] = JavaScript;
            Get["/styles/{name}.css"] = Styles;
        }

        private object JavaScript(dynamic args)
        {
            var content = Bundle.JavaScript().RenderCached((string)args.name);

            return CreateResponse(content, SquishIt.Framework.Configuration.Instance.JavascriptMimeType);
        }

        private object Styles(dynamic args)
        {
            var content = Bundle.Css().RenderCached((string)args.name);

            return CreateResponse(content, SquishIt.Framework.Configuration.Instance.CssMimeType);
        }

        private Response CreateResponse(string content, string contentType)
        {
            var response = Response.FromStream(() => CreateStream(content), contentType);

            var etag = Request.Query["r"];
            if (etag != null)
            {
                response.WithHeader("etag", (string)etag);
            }

#if DEBUG
            response.WithHeader("Cache-Control", "max-age=45");
#else
            response.WithHeader("Cache-Control", "max-age=604800");
#endif

            return response;
        }

        private static Stream CreateStream(string content)
        {
            var contentBytes = Encoding.UTF8.GetBytes(content);
            var memoryStream = new MemoryStream(contentBytes);

            return Stream.Synchronized(memoryStream);
        }
    }
}