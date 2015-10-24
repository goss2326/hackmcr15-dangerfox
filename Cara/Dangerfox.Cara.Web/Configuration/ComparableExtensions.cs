using System;

namespace Dangerfox.Cara.Web.Configuration
{
    /// <summary>
    /// A helper class that adds extension methods for the <see cref="IComparable{T}"/> interface.
    /// </summary>
    public static class ComparableExtensions
    {
        /// <summary>
        /// Determines whether a value is between a minimum and maximum related value.
        /// </summary>
        /// <typeparam name="T">The type oo the value.</typeparam>
        /// <param name="value">The value being compared.</param>
        /// <param name="start">The start of the range.</param>
        /// <param name="end">The end of the range.</param>
        /// <param name="inclusiveOfStart">Whether or not to include <paramref name="start"/> in the range.</param>
        /// <param name="inclusiveOfEnd">Whether or not to include <paramref name="end"/> in the range.</param>
        /// <returns>Returns true if the value falls in the specified range, otherwise false.</returns>
        public static bool Between<T>(this T value, T start, T end, bool inclusiveOfStart = true, bool inclusiveOfEnd = true)
            where T : IComparable<T>
        {
            if (inclusiveOfStart && !inclusiveOfEnd)
            {
                return value.CompareTo(start) >= 0 && value.CompareTo(end) < 0;
            }

            if (!inclusiveOfStart && inclusiveOfEnd)
            {
                return value.CompareTo(start) > 0 && value.CompareTo(end) <= 0;
            }

            return value.CompareTo(start) >= 0 && value.CompareTo(end) <= 0;
        }

        /// <summary>
        /// Compares a specified <paramref name="value"/> to an allowed
        /// <paramref name="minValue"/> and <paramref name="maxValue"/>
        /// and returns a value within that range.
        /// </summary>
        /// <typeparam name="T">The type oo the value.</typeparam>
        /// <param name="value">The value being compared.</param>
        /// <param name="minValue">The minimum allowed value.</param>
        /// <param name="maxValue">The maximum allowed value.</param>
        /// <returns><paramref name="value"/> if it is within the range, otherwise,
        /// the appropriate <paramref name="minValue"/> or <paramref name="maxValue"/>.</returns>
        public static T Clamp<T>(this T value, T minValue, T maxValue)
            where T : IComparable<T>
        {
            if (value.CompareTo(minValue) < 0)
            {
                return minValue;
            }

            if (value.CompareTo(maxValue) > 0)
            {
                return maxValue;
            }

            return value;
        }

        /// <summary>
        /// Compares a specified <paramref name="value"/> to an allowed <paramref name="minValue"/>.
        /// </summary>
        /// <typeparam name="T">The type oo the value.</typeparam>
        /// <param name="value">The value being compared.</param>
        /// <param name="minValue">The minimum allowed value.</param>
        /// <returns><paramref name="value"/> if it is within the range, otherwise <paramref name="minValue"/>.</returns>
        public static T ClampMin<T>(this T value, T minValue)
            where T : IComparable<T>
        {
            if (value.CompareTo(minValue) < 0)
            {
                return minValue;
            }

            return value;
        }

        /// <summary>
        /// Compares a specified <paramref name="value"/> to an allowed <paramref name="maxValue"/>.
        /// </summary>
        /// <typeparam name="T">The type oo the value.</typeparam>
        /// <param name="value">The value being compared.</param>
        /// <param name="maxValue">The maximum allowed value.</param>
        /// <returns><paramref name="value"/> if it is within the range, otherwise <paramref name="maxValue"/>.</returns>
        public static T ClampMax<T>(this T value, T maxValue)
            where T : IComparable<T>
        {
            if (value.CompareTo(maxValue) > 0)
            {
                return maxValue;
            }

            return value;
        }
    }
}