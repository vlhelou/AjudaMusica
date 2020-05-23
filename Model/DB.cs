using Microsoft.EntityFrameworkCore;

namespace AjudaMusica.Model
{
    public class DB : DbContext
    {
        public DB(DbContextOptions<DB> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Model.Usuario>().Property<string>("Senha");
        }

        public DbSet<Alimento> Alimento { get; set; }
        public DbSet<Entrada> Entrada { get; set; }
        public DbSet<Estoque> Estoque { get; set; }
        public DbSet<Saida> Saida { get; set; }
        public DbSet<Usuario> Usuario { get; set; }

    }
}