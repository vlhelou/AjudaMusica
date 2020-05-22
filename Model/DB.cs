using Microsoft.EntityFrameworkCore;

namespace AjudaMusica.Model
{
    public class DB : DbContext
    {
        public DB(DbContextOptions<DB> options) : base(options) { }
        public DbSet<Alimento> Alimento { get; set; }
        public DbSet<Entrada> Entrada { get; set; }
        public DbSet<Estoque> Estoque { get; set; }
        public DbSet<Saida> Saida { get; set; }
        public DbSet<Usuario> Usuario { get; set; }

    }
}