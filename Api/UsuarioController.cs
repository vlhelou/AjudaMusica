using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AjudaMusica.Api
{
    [Route("api/[controller]")]
    [ApiController]

    public class UsuarioController : ControllerBase
    {
        private readonly Model.DB db;
        public UsuarioController(Model.DB dbContext)
        {
            db = dbContext;
        }

    }
}