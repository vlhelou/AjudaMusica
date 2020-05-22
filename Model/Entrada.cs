using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AjudaMusica.Model
{
    public class Entrada
    {
        public Guid Id { get; set; }
        public int IdAutor { get; set; }
        public int? IdDoador { get; set; }
        public int? IdComerciante { get; set; }
        public DateTime DataRegistro { get; set; }
        public string ConteudoTipo { get; set; }

        public Usuario Autor {get;set;}
        public Usuario Doador {get;set;}
        public Usuario Comerciante {get;set;}

    }

}