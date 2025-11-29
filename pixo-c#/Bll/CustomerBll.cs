using Dto;
using IDal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll
{
    public class CustomerBll
    {

        private readonly Icustomer customerD;
        public CustomerBll(Icustomer user)
        {
            customerD = user;
        }

         public async Task<CustomerDto> AddUser(CustomerCreateDto dto)
        {
            return await customerD.AddUser(dto);
        }
    }
}
