module Dangerfox.Cara.Support {
    export class SmsHelper {
        public static sendText(message: string)
        {
            var phoneNumber = $("#mobile-number").val();

            $.ajax({
                method: "POST",
                url: "/send-text",
                data: JSON.stringify({
                    "PhoneNumber": phoneNumber,
                    "From": "4thWall",
                    "Message": message
                }),
                dataType: "json",
                async: true,
                contentType: "application/json",
                success: result => {
                    //this.game.debug.text(result.message, 50, 200, "#ffffff");
                    $("#message").html(result.message);
                },
                error: () => {
                    alert("Unable to send text data.");
                }
            });
        }
    }
}