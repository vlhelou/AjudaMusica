using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AjudaMusica.Api
{
    [Route("api/[controller]")]
    [ApiController]

    public class SaidaController : ControllerBase
    {
        private readonly Model.DB db;
        public SaidaController(Model.DB dbContext)
        {
            db = dbContext;
        }

    }
}