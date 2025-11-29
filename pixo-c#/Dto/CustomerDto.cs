using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto
{
    public class CustomerDto
    {

        public decimal Id { get; set; }
        public string? FullName { get; set; }
        public string Email { get; set; } = string.Empty;
        public DateOnly? Birthday { get; set; }
        public string? Phone { get; set; }
    }
}
