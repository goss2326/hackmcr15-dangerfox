using Nancy.ViewEngines.Razor;
using System.Collections.Generic;

namespace Dangerfox.Cara.Web.Configuration
{
    /// <summary>
    /// Sets up the assemblies and namespaces to provide to razor views.
    /// </summary>
    public sealed class RazorConfiguration : IRazorConfiguration
    {
        /// <summary>
        /// Gets a value indicating whether to automatically include the model's namespace in the generated code.
        /// </summary>
        public bool AutoIncludeModelNamespace => false;

        /// <summary>
        /// Gets the assembly names.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<string> GetAssemblyNames()
        {
            yield return "Dangerfox.Cara.Web";
        }

        /// <summary>
        /// Gets the default namespaces.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<string> GetDefaultNamespaces()
        {
            yield return "Dangerfox.Cara.Web";
            yield return "Dangerfox.Cara.Web.Configuration";
        }
    }
}