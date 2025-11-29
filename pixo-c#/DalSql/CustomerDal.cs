using DalSql.converters;
using DalSql.models;
using Dto;
using IDal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DalSql
{
    public class CustomerDal :Icustomer
    {
        private readonly PixoContext pixoDB;
        public CustomerDal(PixoContext db)
        {
            pixoDB = db;
        }

        public async Task<CustomerDto> AddUser(CustomerCreateDto dto)
        {
            var model = CustomerConverters.FromCreateDto(dto);

            pixoDB.Customers.Add(model);
            await pixoDB.SaveChangesAsync();

            return CustomerConverters.ToDto(model);
        }
    }




}

