using CabFinder.DTOs.Enums;

namespace CabFinder.DTOs.ServiceDtos
{
    public class CustomResponse<T>
    {
        public ServiceResponses Response { get; set; }
        public T Data { get; set; }
        public string Message { get; set; }

        public CustomResponse()
        {
        }

        public CustomResponse(ServiceResponses response, T data)
        {
            Response = response;
            Data = data;
        }
        public CustomResponse(ServiceResponses response, string message)
        {
            Response = response;
            Message = message;
        }
    }
}
