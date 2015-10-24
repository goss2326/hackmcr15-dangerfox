using SquishIt.Framework;
using JavaScriptMinifier = SquishIt.Framework.Minifiers.JavaScript.MsMinifier;

namespace Dangerfox.Cara.Web.Configuration
{
    /// <summary>
    /// A static class for configuring content bundles.
    /// </summary>
    public static class BundleConfiguration
    {
        /// <summary>
        /// Configures the content bundles for the application
        /// </summary>
        public static void Configure()
        {
            RegisterStyleBundles();
            RegisterJavaScriptBundles();
        }

        private static void RegisterStyleBundles()
        {
        }

        private static void RegisterJavaScriptBundles()
        {
            Bundle.JavaScript()

                // jQuery
                .Add("~/scripts/lib/jquery/jquery-2.1.4.js")

                // phaser
                .Add("~/scripts/lib/phaser/phaser.js")

                // game
                .Add("~/scripts/source/game.js")

                .WithMinifier<JavaScriptMinifier>()
                .AsCached("core", "~/bundles/scripts/core.js");
        }
    }
}