using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AjudaMusica.Model
{
    public class Saida
    {
        public Guid Id { get; set; }
        public int IdAutor { get; set; }
        public int IdComerciante { get; set; }
        public int IdDestinatario { get; set; }
        public DateTime Data { get; set; }

        public Usuario Autor { get; set; }
        public Usuario Comerciante { get; set; }
        public Usuario Destinatario { get; set; }
    }
}