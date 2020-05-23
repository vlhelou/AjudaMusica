using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AjudaMusica.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AlimentoController : ControllerBase
    {
        private readonly Model.DB db;

        public AlimentoController(Model.DB dbContext)
        {
            db = dbContext;
        }

        [HttpPost("[action]")]
        public async Task<Model.Alimento> Grava([FromBody] Model.Alimento item)
        {
            throw new NotImplementedException();
        }

        [HttpGet("[action]/{id}")]
        public async Task<Model.Alimento> Busca(int id)
        {
            throw new NotImplementedException();
        }


        [HttpGet("[action]/{id}")]
        public async Task Exclui(int id)
        {
            throw new NotImplementedException();
        }


    }
}