using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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



        [HttpGet("[action]/{id}")]
        public async Task<List<Model.Estoque>> EntradaItens(Guid id)
        {
            return await db.Estoque
                .Where(p => p.IdEntrada == id)
                .Include(p => p.Entrada)
                .Include(p => p.Alimento)
                .AsNoTracking().ToListAsync();
        }

        [HttpPost("[action]")]
        public async Task<Model.Estoque> Grava([FromBody] Model.Estoque item)
        {
            Model.Usuario logado = Util.Claim2Usuario(HttpContext.User.Claims);
            if (item == null)
                throw new Exception("sem parâmetro");

            item.IdAutor = logado.Id;
            if (item.Id == 0)
            {
                item.IdAlimento = item.Alimento.Id;
                db.Entry(item).State = EntityState.Added;
            }
            else
            {
                db.Update(item);
            }
            await db.SaveChangesAsync();
            return item;
        }

        [HttpGet("[action]/{id}")]
        public async Task Exclui(int id)
        {
            var localizado = await db.Estoque.FindAsync(id);
            if (localizado == null)
                throw new Exception("não localizado");

            db.Remove(localizado);
            await db.SaveChangesAsync();
        }

        [HttpGet("[action]/{idcomerciante}")]
        public async Task<object> SaldoPorComerciante(int idcomerciante)
        {
            using (var cmd = db.Database.GetDbConnection().CreateCommand())
            {
                cmd.Connection.Open();
                var pid = cmd.CreateParameter();
                pid.ParameterName = "@id";
                pid.Value = idcomerciante;
                cmd.Parameters.Add(pid);
                cmd.CommandText = @"
                select
                        Id
                        , Nome
                        , dbo.fnSaldoAlimentoComerciante(id, @id) Saldo
                    from Alimento
                    where dbo.fnSaldoAlimentoComerciante(id, @id)!=0
                    order by Nome";
                using (System.Data.DataTable dt = new System.Data.DataTable())
                {
                    dt.Load(await cmd.ExecuteReaderAsync());
                    return Util.Datatable2Json(dt);
                }
            }
        }

    }
}