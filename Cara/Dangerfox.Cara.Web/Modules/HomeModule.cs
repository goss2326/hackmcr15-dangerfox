using Clockwork;
using Dangerfox.Cara.Web.Models;
using Nancy;
using Nancy.ModelBinding;
using System;
using System.Net;

namespace Dangerfox.Cara.Web.Modules
{
    public class HomeModule : NancyModule
    {
        public HomeModule()
        {
            //this.RequiresAuthentication();

            Get["/"] = _ => View["index"];

            Post["/send-text"] = _ => SendText();
        }

        private object SendText()
        {
            var model = this.Bind<SendTextModel>();
            var resultModel = new ResultModel();

            try
            {
                var api = new API("832c41038f002083db24aa54f567244c9c6c5375");

                var sms = new SMS
                {
                    To = model.PhoneNumber,
                    From = model.From,
                    Message = model.Message
                };

                var result = api.Send(sms);

                if (result.Success)
                {
                    resultModel.Message = $"SMS Sent to {result.SMS.To}. Clockwork ID: {result.ID}";
                    result.Success = true;
                }
                else
                {
                    resultModel.Message = $"SMS to {result.SMS.To} failed. " +
                        $"Clockwork Error: {result.ErrorCode} {result.ErrorMessage}";
                }
            }
            catch (APIException ex)
            {
                // You’ll get an API exception for errors
                // such as wrong username or password
                resultModel.Message = "API Exception: " + ex.Message;
            }
            catch (WebException ex)
            {
                // Web exceptions mean you couldn’t reach the Clockwork server
                resultModel.Message = "Web Exception: " + ex.Message;
            }
            catch (ArgumentException ex)
            {
                // Argument exceptions are thrown for missing parameters,
                // such as forgetting to set the username
                resultModel.Message = "Argument Exception: " + ex.Message;
            }
            catch (Exception ex)
            {
                // Something else went wrong, the error message should help
                resultModel.Message = "Unknown Exception: " + ex.Message;
            }

            return Response.AsJson(resultModel);
        }
    }
}