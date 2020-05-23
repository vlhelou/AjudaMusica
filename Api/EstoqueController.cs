using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AjudaMusica.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EstoqueController : ControllerBase
    {
        private readonly Model.DB db;
        public EstoqueController(Model.DB dbContext)
        {
            db = dbContext;
        }

    }
}