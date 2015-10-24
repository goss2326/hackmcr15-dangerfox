using Dangerfox.Cara.Web.Configuration;
using Nancy;
using Nancy.Bootstrapper;
using Nancy.Conventions;
using Nancy.Helpers;
using Nancy.Session;
using Nancy.TinyIoc;
using System;

namespace Dangerfox.Cara.Web
{
    public class Bootstrapper : DefaultNancyBootstrapper
    {
        /// <summary>
        /// Initialise the bootstrapper - can be used for adding pre/post hooks and
        /// any other initialisation tasks that aren't specifically container setup
        /// related
        /// </summary>
        /// <param name="container">Container instance for resolving types if required.</param>
        /// <param name="pipelines"></param>
        protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
        {
            base.ApplicationStartup(container, pipelines);

            // configure bundling
            BundleConfiguration.Configure();

            // enable the use of sessions
            CookieBasedSessions.Enable(pipelines);

            // enable sliding expiration of cookies
            pipelines.AfterRequest += context =>
            {
                if (context.Request.Path != "/sign-out")
                {
                    const string formsAuthCookieName = "_ncfa";
                    if (context.Request.Cookies.ContainsKey(formsAuthCookieName))
                    {
                        string formsAuthCookie = HttpUtility.UrlDecode(context.Request.Cookies[formsAuthCookieName]);
                        context.Response.WithCookie(formsAuthCookieName, formsAuthCookie, DateTime.Now.AddMinutes(15));
                    }
                }
            };
        }

        /// <summary>
        /// Overrides/configures Nancy's conventions
        /// </summary>
        /// <param name="nancyConventions">Convention object instance</param>
        protected override void ConfigureConventions(NancyConventions nancyConventions)
        {
            base.ConfigureConventions(nancyConventions);

            nancyConventions.StaticContentsConventions.Add(
                StaticContentConventionBuilder.AddDirectory("scripts", "scripts")
            );

            nancyConventions.StaticContentsConventions.Add(
                StaticContentConventionBuilder.AddDirectory("assets", "assets")
            );
        }
    }
}