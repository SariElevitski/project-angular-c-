using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto
{
    public class CustomerCreateDto
    {

        public string? FullName { get; set; }

        public string? Email { get; set; }

        public DateOnly? Birthday { get; set; }

        public string? Phone { get; set; }
    }
}
