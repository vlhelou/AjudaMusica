using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AjudaMusica.Model
{
    public class vwEntrada
    {
        [Key]
        public Guid Id { get; set; }
        public int IdAutor { get; set; }
        public int? IdDoador { get; set; }
        public int? IdComerciante { get; set; }
        public DateTime DataRegistro { get; set; }
        public string ConteudoTipo { get; set; }
        public string ConteudoNome { get; set; }


        [ForeignKey("IdAutor")]
        public Usuario Autor { get; set; }

        [ForeignKey("IdDoador")]
        public Usuario Doador { get; set; }

        [ForeignKey("IdComerciante")]
        public Usuario Comerciante { get; set; }

    }
}