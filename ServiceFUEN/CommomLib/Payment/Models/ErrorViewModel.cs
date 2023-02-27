using System;

namespace ServiceFUEN.CommomLib.Payment
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; } = "";

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
