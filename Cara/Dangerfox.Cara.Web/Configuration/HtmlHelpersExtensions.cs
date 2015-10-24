using Nancy.ViewEngines.Razor;
using SquishIt.Framework;
using System;

namespace Dangerfox.Cara.Web.Configuration
{
    /// <summary>
    /// Provides extension methods for the <see cref="HtmlHelpers{TModel}" /> class.
    /// </summary>
    public static class HtmlHelpersExtensions
    {
        /// <summary>
        /// Renders an asset tag for a CSS bundle.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="bundle">The name of the bundle to resolve.</param>
        /// <returns>A raw HTML string for the asset tag.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        /// <exception cref="ArgumentException">Thrown when <paramref name="bundle" /> is not a valid string.</exception>
        public static IHtmlString StyleBundle<TModel>(this HtmlHelpers<TModel> html, string bundle)
        {
            Verify.NotNull(html, nameof(html));
            Verify.ValidString(bundle, nameof(bundle));

            return html.Raw(Bundle.Css().RenderCachedAssetTag(bundle));
        }

        /// <summary>
        /// Renders an asset tag for a JavaScript bundle.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="bundle">The name of the bundle to resolve.</param>
        /// <returns>A raw HTML string for the asset tag.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        /// <exception cref="ArgumentException">Thrown when <paramref name="bundle" /> is not a valid string.</exception>
        public static IHtmlString ScriptBundle<TModel>(this HtmlHelpers<TModel> html, string bundle)
        {
            Verify.NotNull(html, nameof(html));
            Verify.ValidString(bundle, nameof(bundle));

            return html.Raw(Bundle.JavaScript().RenderCachedAssetTag(bundle));
        }

        /// <summary>
        /// Determines if a control should apply the "checked" attribute.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="condition">The condition to evaluate.</param>
        /// <returns>"checked" if the condition is true, otherwise an empty string.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        public static IHtmlString Checked<TModel>(this HtmlHelpers<TModel> html, bool condition)
        {
            Verify.NotNull(html, nameof(html));

            return html.Raw(condition ? "checked" : String.Empty);
        }

        /// <summary>
        /// Determines if a control should apply the "checked" attribute.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <typeparam name="TValue">The type of the value.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="checkValue">The value to that must be matched.</param>
        /// <param name="actualValue">The actual value to compare to <paramref name="checkValue"/>.</param>
        /// <returns>"checked" if the values match, otherwise an empty string.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        public static IHtmlString Checked<TModel, TValue>(this HtmlHelpers<TModel> html, TValue checkValue, TValue actualValue)
        {
            Verify.NotNull(html, nameof(html));

            return html.Raw(checkValue.Equals(actualValue) ? "checked" : String.Empty);
        }

        /// <summary>
        /// Determines if a control should apply the "checked" attribute.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="condition">The condition to evaluate.</param>
        /// <returns>"checked" if the condition is true, otherwise an empty string.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        public static IHtmlString Disabled<TModel>(this HtmlHelpers<TModel> html, bool condition)
        {
            Verify.NotNull(html, nameof(html));

            return html.Raw(condition ? "disabled" : String.Empty);
        }

        /// <summary>
        /// Determines if a control should apply the "selected" attribute.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="condition">The condition to evaluate.</param>
        /// <returns>"selected" if the condition is true, otherwise an empty string.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        public static IHtmlString Selected<TModel>(this HtmlHelpers<TModel> html, bool condition)
        {
            Verify.NotNull(html, nameof(html));

            return html.Raw(condition ? "selected" : String.Empty);
        }

        /// <summary>
        /// Determines if a control should apply the "selected" attribute.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <typeparam name="TValue">The type of the value.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="checkValue">The value to that must be matched.</param>
        /// <param name="actualValue">The actual value to compare to <paramref name="checkValue"/>.</param>
        /// <returns>"selected" if the values match, otherwise an empty string.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        public static IHtmlString Selected<TModel, TValue>(this HtmlHelpers<TModel> html, TValue checkValue, TValue actualValue)
        {
            Verify.NotNull(html, nameof(html));

            return html.Raw(checkValue.Equals(actualValue) ? "selected" : String.Empty);
        }

        /// <summary>
        /// Renders a decimal value as a money input string.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="value">The decimal value to be rendered.</param>
        /// <returns>A currency string for the specified <paramref name="value"/>.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        public static IHtmlString Money<TModel>(this HtmlHelpers<TModel> html, decimal value)
        {
            Verify.NotNull(html, nameof(html));

            return html.Raw(value.ToString("0.00"));
        }

        /// <summary>
        /// Renders a decimal value as a money input string.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="value">The decimal value to be rendered.</param>
        /// <returns>A currency string for the specified <paramref name="value"/>.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        public static IHtmlString Money<TModel>(this HtmlHelpers<TModel> html, decimal? value)
        {
            Verify.NotNull(html, nameof(html));

            return html.Raw(value?.ToString("0.00"));
        }

        /// <summary>
        /// Renders a decimal value as a currency string.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="value">The decimal value to be rendered.</param>
        /// <returns>A currency string for the specified <paramref name="value"/>.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        public static IHtmlString Currency<TModel>(this HtmlHelpers<TModel> html, decimal value)
        {
            Verify.NotNull(html, nameof(html));

            return html.Raw(value.ToString("C2"));
        }

        /// <summary>
        /// Renders a decimal value as a currency string.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="value">The decimal value to be rendered.</param>
        /// <returns>A currency string for the specified <paramref name="value"/>.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        public static IHtmlString Currency<TModel>(this HtmlHelpers<TModel> html, decimal? value)
        {
            Verify.NotNull(html, nameof(html));

            return html.Raw(value?.ToString("C2"));
        }

        /// <summary>
        /// Renders a decimal value as a percentage string.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="value">The decimal value to be rendered.</param>
        /// <returns>A percentage string for the specified <paramref name="value"/>.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        public static IHtmlString Percentage<TModel>(this HtmlHelpers<TModel> html, decimal value)
        {
            Verify.NotNull(html, nameof(html));

            return html.Raw(value.ToString("P"));
        }

        /// <summary>
        /// Renders a decimal value as a percentage string.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="value">The decimal value to be rendered.</param>
        /// <returns>A percentage string for the specified <paramref name="value"/>.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        public static IHtmlString Percentage<TModel>(this HtmlHelpers<TModel> html, decimal? value)
        {
            Verify.NotNull(html, nameof(html));

            return html.Raw(value?.ToString("P"));
        }

        /// <summary>
        /// Renders a decimal value as a percentage string.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="value">The decimal value to be rendered.</param>
        /// <returns>A percentage string for the specified <paramref name="value"/>.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        public static IHtmlString Number<TModel>(this HtmlHelpers<TModel> html, decimal value)
        {
            Verify.NotNull(html, nameof(html));

            return html.Raw(value.ToString("#.##"));
        }

        /// <summary>
        /// Renders a decimal value as a percentage string.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="value">The decimal value to be rendered.</param>
        /// <returns>A percentage string for the specified <paramref name="value"/>.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        public static IHtmlString Number<TModel>(this HtmlHelpers<TModel> html, decimal? value)
        {
            Verify.NotNull(html, nameof(html));

            return html.Raw(value?.ToString("#.##"));
        }

        /// <summary>
        /// Renders a datetime value as a date string.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="value">The datetime value to be rendered.</param>
        /// <returns>A date string for the specified <paramref name="value"/>.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        public static IHtmlString Date<TModel>(this HtmlHelpers<TModel> html, DateTime value)
        {
            Verify.NotNull(html, nameof(html));

            return html.Raw(value.ToString("dd/MM/yyyy"));
        }

        /// <summary>
        /// Renders a datetime value as a date string.
        /// </summary>
        /// <typeparam name="TModel">The type of the model.</typeparam>
        /// <param name="html">The HTML helper instance.</param>
        /// <param name="value">The datetime value to be rendered.</param>
        /// <returns>A date string for the specified <paramref name="value"/>.</returns>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="html" /> is null.</exception>
        public static IHtmlString Date<TModel>(this HtmlHelpers<TModel> html, DateTime? value)
        {
            Verify.NotNull(html, nameof(html));

            return html.Raw(value?.ToString("dd/MM/yyyy"));
        }
    }
}