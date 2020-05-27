using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AjudaMusica.Model
{
    public class Estoque
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Guid? IdEntrada { get; set; }
        public Guid? IdSaida { get; set; }
        public int IdAutor { get; set; }
        public DateTime Data { get; set; }
        public int IdAlimento { get; set; }
        public int Quantidade { get; set; }

        [ForeignKey("IdEntrada")]
        public vwEntrada Entrada {get;set;}
        
        [ForeignKey("IdSaida")]
        public Saida Saida {get;set;}

        [ForeignKey("IdAutor")]
        public Usuario Autor {get;set;}
        
        [ForeignKey("IdAlimento")]
        public Alimento Alimento {get;set;}
    }
}
