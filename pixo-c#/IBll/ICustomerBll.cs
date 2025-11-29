using Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IBll
{
    public interface ICustomerBll
    {

        Task<CustomerDto> AddUser(CustomerCreateDto dto);
    }
}
