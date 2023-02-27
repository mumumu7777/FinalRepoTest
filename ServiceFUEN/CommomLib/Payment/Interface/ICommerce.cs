
namespace ServiceFUEN.CommomLib.Payment
{
    public interface ICommerce
    {
        string GetCallBack(SendToNewebPayIn inModel);
        string GetPeriodCallBack(SendToNewebPayIn inModel);        
        Result GetCallbackResult(IFormCollection form);
    }
}
