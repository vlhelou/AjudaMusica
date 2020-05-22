using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AjudaMusica.Api
{
    [Route("api/[controller]")]
    [ApiController]

    public class AlimentoController : ControllerBase
    {
        private readonly Model.DB db;

        public AlimentoController(Model.DB dbContext)
        {
            db = dbContext;
        }

        
    }
}