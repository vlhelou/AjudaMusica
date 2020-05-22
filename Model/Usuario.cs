using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AjudaMusica.Model
{
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public bool Administrador { get; set; }
        public bool Doador { get; set; }
        public bool Musico { get; set; }
        public bool Comerciante { get; set; }
    }
}