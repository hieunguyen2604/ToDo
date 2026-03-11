using Microsoft.EntityFrameworkCore;
using ToDo.Api.Models;

namespace ToDo.Api.Data
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) { }

        public DbSet<TaskItem> Tasks { get; set; } = null!;
    }
}
