using Clockwork;
using Dangerfox.Cara.Web.Models;
using Nancy;
using Nancy.ModelBinding;
using System;
using System.Configuration;
using System.Net;

namespace Dangerfox.Cara.Web.Modules
{
    public class HomeModule : NancyModule
    {
        public HomeModule()
        {
            //this.RequiresAuthentication();

            Get["/"] = _ => View["index"];
            Post["/"] = _ => PostRoot();

            Post["/send-text"] = _ => SendText();
        }

        private object PostRoot()
        {
            var mobileNumber = (string)Request.Form["mobileNumber"];
            if (String.IsNullOrWhiteSpace(mobileNumber))
            {
                ViewBag.ErrorMessage = "A mobile number is required to play.";

                return View["index"];
            }

            var trySend = Send(mobileNumber, "4thWall", "Welcome to the Fourth Wall! The world is under siege by an evil dictator. " +
                "You must travel the land in order to find ways to breach the four walls of security and brave the dungeon of evil.");

            if (!trySend.Success)
            {
                ViewBag.ErrorMessage = trySend.Message;

                return View["index"];
            }

            ViewBag.MobileNumber = mobileNumber;

            return View["game"];
        }

        private object SendText()
        {
            var model = this.Bind<SendTextModel>();

            var resultModel = Send(model.PhoneNumber, model.From, model.Message);

            return Response.AsJson(resultModel);
        }

        private ResultModel Send(string phoneNumber, string from, string message)
        {
            var resultModel = new ResultModel();

            if (!Convert.ToBoolean(ConfigurationManager.AppSettings["useApi"]))
            {
                resultModel.Success = true;
                resultModel.Message = "API usage is currently turned off.";

                return resultModel;
            }

            try
            {
                var api = new API("832c41038f002083db24aa54f567244c9c6c5375");

                var sms = new SMS
                {
                    To = phoneNumber,
                    From = from,
                    Message = message
                };

                var result = api.Send(sms);

                if (result.Success)
                {
                    resultModel.Message = $"SMS Sent to {result.SMS.To}. Clockwork ID: {result.ID}";
                    resultModel.Success = true;
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

            return resultModel;
        }
    }
}