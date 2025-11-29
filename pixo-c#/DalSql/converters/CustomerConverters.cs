using Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DalSql.converters
{
    public class CustomerConverters   
    {

        public static CustomerDto ToDto(models.Customer customer)
        {
            CustomerDto CustomerD = new CustomerDto();

            CustomerD.Id = customer.Id;
            CustomerD.FullName = customer.FullName;
            CustomerD.Email = customer.Email;
            CustomerD.Birthday = customer.Birthday;
            CustomerD.Phone = customer.Phone;


            return CustomerD;

        }


        public static models.Customer FromCreateDto(CustomerCreateDto dto)
        {
            return new models.Customer
            {
                FullName = dto.FullName,
                Email = dto.Email,
                Birthday = dto.Birthday,
                Phone = dto.Phone
            };
        }

}
}
