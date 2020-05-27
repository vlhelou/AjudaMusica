using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Text.Json;
using System.Linq;
using System.Linq.Dynamic.Core;

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
            if (item == null)
                throw new Exception("sem parametro");

            item.Nome = item.Nome.Trim();
            if (item.Id == 0)
                db.Entry(item).State = EntityState.Added;
            else
            {
                db.Entry(item).State = EntityState.Modified;
            }
            await db.SaveChangesAsync();
            return item;
        }

        [HttpGet("[action]/{id}")]
        public async Task<Model.Alimento> Busca(int id)
        {
            Model.Alimento localizado = await db.Alimento.FindAsync(id);
            if (localizado == null)
                throw new Exception("alimento não localizado");
            return localizado;
        }

        [HttpGet("[action]/{id}")]
        public async Task Exclui(int id)
        {
            Model.Alimento localizado = await db.Alimento.FindAsync(id);
            if (localizado == null)
                throw new Exception("alimento não localizado");
            db.Remove(localizado);
            await db.SaveChangesAsync();
        }

        [HttpPost("[action]")]
        public async Task<List<Model.Alimento>> Pesquisa([FromBody] JsonElement prm)
        {
            int top = 100000;
            int ct = 0;
            System.Text.StringBuilder where = new System.Text.StringBuilder();
            List<object> valores = new List<object>();

            if (prm.TryGetProperty("Chave", out JsonElement chave) && chave.ValueKind == JsonValueKind.String)
            {
                where.AppendFormat(" and Nome.StartsWith(@{0}) ", ct);
                valores.Add(chave.GetString().ToLower());
                ct++;
            }

            if (prm.TryGetProperty("Top", out JsonElement vtop) && vtop.ValueKind == JsonValueKind.Number)
            {
                top = vtop.GetInt32();
            }


            if (where.ToString().StartsWith(" and"))
            {
                where.Remove(0, 4);
                return await db.Alimento.Where(where.ToString(), valores.ToArray())
                    .AsNoTracking()
                    .Take(top)
                    .OrderBy(p => p.Nome)
                    .ToListAsync();
            }
            else
            {
                return await db.Alimento.AsNoTracking().OrderBy(p => p.Nome).ToListAsync();
            }

        }

    }
}