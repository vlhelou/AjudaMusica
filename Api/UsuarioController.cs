using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using System.Collections.Generic;

namespace AjudaMusica.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class UsuarioController : ControllerBase
    {
        private readonly Model.DB db;
        public UsuarioController(Model.DB dbContext)
        {
            db = dbContext;
        }

        [HttpPost("[action]")]
        public async Task<Model.Usuario> Grava([FromBody] Model.Usuario item)
        {

            if (item == null)
                throw new Exception("falta de parâmetros");
            if (item.Id == 0)
            {
                db.Entry(item).Property<string>("Senha").CurrentValue = Util.MD5Hash("123456");
                db.Entry(item).State = EntityState.Added;
            }
            else
            {
                db.Entry(item).State = EntityState.Modified;

            }
            await db.SaveChangesAsync();
            return item;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public object Login([FromBody] JsonElement login)
        {
            if (login.ValueKind == JsonValueKind.Null)
                throw new Exception("falta de parametro");
            string usuario;
            string senha;
            if (login.TryGetProperty("Usuario", out JsonElement jusuario) && jusuario.ValueKind == JsonValueKind.String)
                usuario = jusuario.GetString();
            else
                throw new Exception("sem usuário");

            if (login.TryGetProperty("Senha", out JsonElement jsenha) && jsenha.ValueKind == JsonValueKind.String)
                senha = jsenha.GetString();
            else
                throw new Exception("sem usuário");

            var localizado = db.Usuario.Where(p => (p.Administrador == true & p.Nome == usuario)).FirstOrDefault();
            if (localizado == null)
                throw new Exception("Usuario não localizado");

            if (Util.MD5Hash(senha) != db.Entry(localizado).Property<string>("Senha").CurrentValue)
                throw new Exception("Senha ou usuário incorreto");
            var token = jwt.GenerateToken(localizado);
            var retorno = new
            {
                Usuario = localizado,
                Token = token
            };
            return retorno;
        }

        [HttpPost("[action]")]
        public async Task TrocaSenha([FromBody] JsonElement prm)
        {

            Model.Usuario logado = Util.Claim2Usuario(HttpContext.User.Claims);
            string SenhaAnterior;
            string SenhaNova;

            if (prm.ValueKind == JsonValueKind.Null)
                throw new Exception("falta de parametro");

            if (prm.TryGetProperty("Antiga", out JsonElement antiga) && antiga.ValueKind == JsonValueKind.String)
                SenhaAnterior = antiga.GetString();
            else
                throw new Exception("senha antiga não informada");

            if (prm.TryGetProperty("Nova", out JsonElement nova) && nova.ValueKind == JsonValueKind.String)
                SenhaNova = nova.GetString();
            else
                throw new Exception("senha nova não informada");
            Model.Usuario localizado = db.Usuario.Find(logado.Id);
            if (localizado == null)
                throw new Exception("Usuario não localizado");

            if (db.Entry(localizado).Property<string>("Senha").CurrentValue != Util.MD5Hash(SenhaAnterior))
                throw new Exception("Senha anterior incorreta");
            db.Entry(localizado).Property<string>("Senha").CurrentValue = Util.MD5Hash(SenhaNova);

            await db.SaveChangesAsync();

        }

        [HttpGet("[action]/{id}")]
        public async Task<Model.Usuario> Busca(int id)
        {
            var localizado = await db.Usuario.Where(p => p.Id == id).FirstOrDefaultAsync();
            if (localizado == null)
                throw new Exception("não localizado");
            return localizado;
        }

        [HttpPost("[action]")]
        public async Task<List<Model.Usuario>> Pesquisa([FromBody] JsonElement prm)
        {
            int top = 100000;
            int ct = 0;
            System.Text.StringBuilder where = new System.Text.StringBuilder();
            List<object> valores = new List<object>();


            if (prm.TryGetProperty("Nome", out JsonElement nome) && nome.ValueKind == JsonValueKind.String)
            {
                where.AppendFormat(" and Nome.StartsWith(@{0}) ", ct);
                valores.Add(nome.GetString().ToLower());
                ct++;
            }

            if (prm.TryGetProperty("Top", out JsonElement vtop) && vtop.ValueKind == JsonValueKind.Number)
            {
                top = vtop.GetInt32();
            }


            if (where.ToString().StartsWith(" and"))
            {
                where.Remove(0, 4);
                return await db.Usuario.Where(where.ToString(), valores.ToArray())
                    .AsNoTracking()
                    .Take(top)
                    .OrderBy(p => p.Nome)
                    .ToListAsync();
            }
            else
            {
                return await db.Usuario.AsNoTracking().OrderBy(p => p.Nome).ToListAsync();
            }

        }

    }
}