using Nancy.Authentication.Forms;
using Nancy.Bootstrapper;
using Nancy.Cryptography;
using System.Text;

namespace Dangerfox.Cara.Web.Configuration
{
    /// <summary>
    /// Configuration options for authentication
    /// </summary>
    public static class SecurityConfig
    {
        private const string KEY = @"i45KS~gF&gUe/5!uzq)sacp?BkrCsSp/V<c+hUTe[k)j/aSdsfXm;?ke<]32\9sU1Uw)P7*l_H-B.QkO'1m`o;wR<a{6vKKYng+!";
        private static readonly byte[] Salt = Encoding.ASCII.GetBytes(@"O_#~a.ZZ-c-mcl`.y]t(EtLedtB?:XUM1$FZ&IA8<o8w%\fWbBz>Y1uu4IvIU6))zB6d\U7C`dS$oYl-HH>$8$'v'N>U<diRXh!i");

        /// <summary>
        /// Configures authentication for the specified <paramref name="pipelines"/>
        /// using the specified <paramref name="userMapper"/>.
        /// </summary>
        /// <param name="pipelines"></param>
        /// <param name="userMapper"></param>
        public static void RegisterAuthentication(IPipelines pipelines, IUserMapper userMapper)
        {
            Verify.NotNull(userMapper, nameof(userMapper));

            var keyGenerator = new PassphraseKeyGenerator(KEY, Salt);

            var encryptionProvider = new RijndaelEncryptionProvider(keyGenerator);
            var hmacProvider = new DefaultHmacProvider(keyGenerator);
            var cryptographyConfiguration = new CryptographyConfiguration(encryptionProvider, hmacProvider);

            var formsConfiguration = new FormsAuthenticationConfiguration(cryptographyConfiguration)
            {
                RedirectUrl = "~/sign-in",
                UserMapper = userMapper
            };

            FormsAuthentication.Enable(pipelines, formsConfiguration);
        }
    }
}