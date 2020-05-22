using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AjudaMusica.Api
{
    [Route("api/[controller]")]
    [ApiController]

    public class EntradaController : ControllerBase
    {
        private readonly Model.DB db;
        public EntradaController(Model.DB dbContext)
        {
            db = dbContext;
        }

    }
}