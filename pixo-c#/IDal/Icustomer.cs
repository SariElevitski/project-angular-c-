using Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace IDal
{
    public interface Icustomer
    {

        Task<CustomerDto> AddUser(CustomerCreateDto dto);

    }
}
