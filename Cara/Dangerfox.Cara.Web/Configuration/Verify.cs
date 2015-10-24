using System;
using System.Diagnostics;

namespace Dangerfox.Cara.Web.Configuration
{
    /// <summary>
    /// A static helper class that will throw the relevant exceptions based on the called method.
    /// </summary>
    public static class Verify
    {
        /// <summary>
        /// Verifies that the <paramref name="parameter"/> value is not null.
        /// </summary>
        /// <param name="parameter">The value to check for null.</param>
        /// <param name="parameterName">The name of the <paramref name="parameter"/> being checked.</param>
        /// <param name="message">An optional exception message for if the <paramref name="parameter"/> is null.</param>
        /// <exception cref="ArgumentNullException">Throw when the <paramref name="parameter"/> value is null.</exception>
        [DebuggerStepThrough]
        public static void NotNull(object parameter, string parameterName, string message = null)
        {
            if (parameter == null)
            {
                if (!String.IsNullOrWhiteSpace(message))
                {
                    throw new ArgumentNullException(parameterName, message);
                }

                throw new ArgumentNullException(parameterName);
            }
        }

        /// <summary>
        /// Verifies that the <paramref name="condition"/> condition is true.
        /// </summary>
        /// <param name="condition">The condition to check.</param>
        /// <param name="parameterName">The name of the parameter being checked.</param>
        /// <param name="message">An optional exception message for if the <paramref name="condition"/> is false.</param>
        /// <exception cref="ArgumentException">Throw when the <paramref name="condition"/> is false.</exception>
        [DebuggerStepThrough]
        public static void IsTrue(bool condition, string parameterName, string message = null)
        {
            if (!condition)
            {
                if (!String.IsNullOrWhiteSpace(message))
                {
                    throw new ArgumentException(message, parameterName);
                }

                throw new ArgumentException("The specified condition must be true.", parameterName);
            }
        }

        /// <summary>
        /// Verifies that the <paramref name="condition"/> condition is false.
        /// </summary>
        /// <param name="condition">The condition to check.</param>
        /// <param name="parameterName">The name of the parameter being checked.</param>
        /// <param name="message">An optional exception message for if the <paramref name="condition"/> is true.</param>
        /// <exception cref="ArgumentException">Throw when the <paramref name="condition"/> is true.</exception>
        [DebuggerStepThrough]
        public static void IsFalse(bool condition, string parameterName, string message = null)
        {
            if (condition)
            {
                if (!String.IsNullOrWhiteSpace(message))
                {
                    throw new ArgumentException(message, parameterName);
                }

                throw new ArgumentException("The specified condition must be false.", parameterName);
            }
        }

        /// <summary>
        /// Verifies that an operation is valid by evaluating the specified <paramref name="condition"/>.
        /// </summary>
        /// <param name="condition">The condition to check.</param>
        /// <param name="message">An optional exception message for if the <paramref name="condition"/> is false.</param>
        /// <exception cref="InvalidOperationException">Throw when the <paramref name="condition"/> is false.</exception>
        [DebuggerStepThrough]
        public static void ValidOperation(bool condition, string message = null)
        {
            if (!condition)
            {
                if (!String.IsNullOrWhiteSpace(message))
                {
                    throw new InvalidOperationException(message);
                }

                throw new InvalidOperationException("The specified condition must be true.");
            }
        }

        /// <summary>
        /// Verifies that the <paramref name="parameter"/> value is a valid string.
        /// </summary>
        /// <param name="parameter">The string value to check.</param>
        /// <param name="parameterName">The name of the <paramref name="parameter"/> being checked.</param>
        /// <param name="allowWhiteSpace">If true, then a string that only contains white space is still classed as valid.</param>
        /// <param name="allowEmpty">If true, then a string that is empty is still classed as valid.</param>
        /// <param name="message">An optional exception message for if the <paramref name="parameter"/> is not a valid string.</param>
        /// <exception cref="ArgumentException">Throw when the <paramref name="parameter"/> value is not valid.</exception>
        [DebuggerStepThrough]
        public static void ValidString(string parameter, string parameterName, bool allowWhiteSpace = false, bool allowEmpty = false, string message = null)
        {
            if (parameter == null || (!allowEmpty && String.IsNullOrEmpty(parameter)) || (!allowEmpty && !allowWhiteSpace && String.IsNullOrWhiteSpace(parameter) && !parameter.Contains("\n")))
            {
                if (!String.IsNullOrWhiteSpace(message))
                {
                    throw new ArgumentException(message, parameterName);
                }

                throw new ArgumentException("The specified string value is not valid.", parameterName);
            }
        }

        /// <summary>
        /// Verifies that the <paramref name="parameter"/> value is within a given range.
        /// </summary>
        /// <typeparam name="T">The type of the <paramref name="parameter"/> value.</typeparam>
        /// <param name="parameter">The value to check.</param>
        /// <param name="parameterName">The name of the <paramref name="parameter"/> beign checked.</param>
        /// <param name="minValue">A minimum value that is allowed for the <paramref name="parameter"/>.</param>
        /// <param name="maxValue">A maximum value that is allowed for the <paramref name="parameter"/>.</param>
        /// <param name="inclusiveOfStart">Whether or not to include <paramref name="minValue"/> in the range.</param>
        /// <param name="inclusiveOfEnd">Whether or not to include <paramref name="maxValue"/> in the range.</param>
        /// <param name="message">An optional exception message for if the <paramref name="parameter"/> is not in the valid range.</param>
        /// 
        /// <exception cref="ArgumentOutOfRangeException">Throw when the <paramref name="parameter"/> value is not between the <paramref name="minValue"/> and <paramref name="maxValue"/>.</exception>
        [DebuggerStepThrough]
        public static void Between<T>(T parameter, string parameterName, T minValue, T maxValue, bool inclusiveOfStart = true, bool inclusiveOfEnd = true, string message = null)
            where T : IComparable<T>
        {
            if (!parameter.Between(minValue, maxValue, inclusiveOfStart, inclusiveOfEnd))
            {
                if (!String.IsNullOrWhiteSpace(message))
                {
                    throw new ArgumentOutOfRangeException(parameterName, message);
                }

                throw new ArgumentOutOfRangeException(parameterName, parameter, null);
            }
        }

        /// <summary>
        /// Verifies that the <paramref name="parameter"/> value is greater than a given value.
        /// </summary>
        /// <typeparam name="T">The type of the <paramref name="parameter"/> value.</typeparam>
        /// <param name="parameter">The value to check.</param>
        /// <param name="parameterName">The name of the <paramref name="parameter"/> beign checked.</param>
        /// <param name="minValue">A value that the <paramref name="parameter"/> must be greater than.</param>
        /// <param name="message">An optional exception message for if the <paramref name="parameter"/> is not greater than <paramref name="minValue"/>.</param>
        /// <exception cref="ArgumentOutOfRangeException">Throw when the <paramref name="parameter"/> value is not greater than the <paramref name="minValue"/>.</exception>
        [DebuggerStepThrough]
        public static void GreaterThan<T>(T parameter, string parameterName, T minValue, string message = null)
            where T : IComparable<T>
        {
            if (parameter.CompareTo(minValue) <= 0)
            {
                if (!String.IsNullOrWhiteSpace(message))
                {
                    throw new ArgumentOutOfRangeException(parameterName, message);
                }

                throw new ArgumentOutOfRangeException(parameterName, parameter, $"The specified value must be greater than {minValue}.");
            }
        }

        /// <summary>
        /// Verifies that the <paramref name="parameter"/> value is greater than or equal to a given value.
        /// </summary>
        /// <typeparam name="T">The type of the <paramref name="parameter"/> value.</typeparam>
        /// <param name="parameter">The value to check.</param>
        /// <param name="parameterName">The name of the <paramref name="parameter"/> beign checked.</param>
        /// <param name="minValue">A value that the <paramref name="parameter"/> must be greater than or equal to.</param>
        /// <param name="message">An optional exception message for if the <paramref name="parameter"/> is not greater than or equal to <paramref name="minValue"/>.</param>
        /// <exception cref="ArgumentOutOfRangeException">Throw when the <paramref name="parameter"/> value is not greater than or eqaul to <paramref name="minValue"/>.</exception>
        [DebuggerStepThrough]
        public static void GreaterThanOrEqualTo<T>(T parameter, string parameterName, T minValue, string message = null)
            where T : IComparable<T>
        {
            if (parameter.CompareTo(minValue) < 0)
            {
                if (!String.IsNullOrWhiteSpace(message))
                {
                    throw new ArgumentOutOfRangeException(parameterName, message);
                }

                throw new ArgumentOutOfRangeException(parameterName, parameter, $"The specified value must be greater than or equal to {minValue}.");
            }
        }

        /// <summary>
        /// Verifies that the <paramref name="parameter"/> value is less than a given value.
        /// </summary>
        /// <typeparam name="T">The type of the <paramref name="parameter"/> value.</typeparam>
        /// <param name="parameter">The value to check.</param>
        /// <param name="parameterName">The name of the <paramref name="parameter"/> beign checked.</param>
        /// <param name="maxValue">A value that the <paramref name="parameter"/> must be less than.</param>
        /// <param name="message">An optional exception message for if the <paramref name="parameter"/> is not less than <paramref name="maxValue"/>.</param>
        /// <exception cref="ArgumentOutOfRangeException">Throw when the <paramref name="parameter"/> value is not less than the <paramref name="maxValue"/>.</exception>
        [DebuggerStepThrough]
        public static void LessThan<T>(T parameter, string parameterName, T maxValue, string message = null)
            where T : IComparable<T>
        {
            if (parameter.CompareTo(maxValue) >= 0)
            {
                if (!String.IsNullOrWhiteSpace(message))
                {
                    throw new ArgumentOutOfRangeException(parameterName, message);
                }

                throw new ArgumentOutOfRangeException(parameterName, parameter, $"The specified value must be less than {maxValue}.");
            }
        }

        /// <summary>
        /// Verifies that a given <paramref name="parameter"/> value is defined on the enum type <typeparamref name="TEnum"/>.
        /// </summary>
        /// <typeparam name="TEnum">The type of the enum.</typeparam>
        /// <param name="parameter">The value to check.</param>
        /// <param name="parameterName">The name of the <paramref name="parameter"/> beign checked.</param>
        /// <param name="message">An optional exception message for if the <paramref name="parameter"/> is not defined on the enum <typeparamref name="TEnum"/>.</param>
        /// <exception cref="InvalidOperationException">Thrown when <typeparamref name="TEnum"/> is not an enum type.</exception>
        /// <exception cref="ArgumentOutOfRangeException">Thrown when the value of <paramref name="parameter"/> is not defined on the enum.</exception>
        /// <remarks><para>TEnum cannot be constrained to 'enum', so 'struct is the closest possible constraint.</para></remarks>
        [DebuggerStepThrough]
        public static void ValidEnumValue<TEnum>(TEnum parameter, string parameterName, string message = null)
            where TEnum : struct
        {
            var type = typeof(TEnum);

            if (!type.IsEnum)
            {
                throw new InvalidOperationException($"Type '{type.FullName}' is not an enum.");
            }

            if (!Enum.IsDefined(type, parameter))
            {
                if (!String.IsNullOrWhiteSpace(message))
                {
                    throw new ArgumentOutOfRangeException(parameterName, parameter, message);
                }

                throw new ArgumentOutOfRangeException(parameterName, parameter, "Enum value is not defined.");
            }
        }
    }
}