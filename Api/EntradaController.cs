using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Text.Json;
using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
namespace AjudaMusica.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EntradaController : ControllerBase
    {
        private readonly Model.DB db;
        public EntradaController(Model.DB dbContext)
        {
            db = dbContext;
        }

        [HttpPost("[action]")]
        public async Task<Model.Entrada> Cria([FromBody] JsonElement prm)
        {
            Model.Usuario doador = null;
            Model.Usuario comerciante;
            Model.Usuario logado = Util.Claim2Usuario(HttpContext.User.Claims);
            if (prm.ValueKind == JsonValueKind.Null)
                throw new Exception("falha no parâmetro");
            if (prm.TryGetProperty("Doador", out JsonElement jdoador))
            {
                if (jdoador.ValueKind == JsonValueKind.String)
                {
                    doador = new Model.Usuario
                    {
                        Nome = jdoador.GetString(),
                        Musico = true,
                    };
                    db.Entry(doador).State = EntityState.Added;
                    await db.SaveChangesAsync();
                }
                else if (jdoador.ValueKind == JsonValueKind.Object)
                {
                    doador = JsonSerializer.Deserialize<Model.Usuario>(jdoador.GetRawText());
                }
                else
                {
                    throw new Exception("não foi possível processar o doador");
                }
            }

            if (prm.TryGetProperty("Comerciante", out JsonElement jcomerciante) && jcomerciante.ValueKind == JsonValueKind.Object)
            {
                comerciante = JsonSerializer.Deserialize<Model.Usuario>(jcomerciante.GetRawText());
            }
            else
            {
                throw new Exception("não foi possível processar o doador");
            }
            Model.Entrada novo = new Model.Entrada
            {
                IdAutor = logado.Id,
                IdComerciante = comerciante.Id,
                IdDoador = doador.Id,
                Id = Guid.NewGuid(),
                DataRegistro = DateTime.Now
            };
            db.Add(novo);
            await db.SaveChangesAsync();
            return novo;
        }

        [HttpGet("[action]")]
        public async Task<List<Model.vwEntrada>> ListaPendentes()
        {
            return await db.vwEntrada.Where(p => p.ConteudoTipo == null)
            .Include(p => p.Autor)
            .Include(p => p.Comerciante)
            .Include(p => p.Doador)
            .AsNoTracking()
            .ToListAsync();
        }

        [HttpGet("[action]/{id}")]
        public async Task<Model.Entrada> Busca(Guid id)
        {
            var retorno = await db.Entrada.Where(p => p.Id == id)
            .Include(p => p.Autor)
            .Include(p => p.Comerciante)
            .Include(p => p.Doador)
            .AsNoTracking().FirstOrDefaultAsync();
            if (retorno == null)
                throw new Exception("Entrada não localizada");

            return retorno;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task GravaArquivo([FromBody] JsonElement arquivo)
        {
            byte[] conteudo;
            Guid id;
            string tipo;
            string nome;

            if (arquivo.ValueKind == JsonValueKind.Null)
                throw new Exception("sem parametero");

            if (arquivo.TryGetProperty("Conteudo", out JsonElement jconteudo) && jconteudo.ValueKind == JsonValueKind.String)
                conteudo = Convert.FromBase64String(jconteudo.GetString().Substring(jconteudo.GetString().IndexOf("base64,") + 7));
            else
                throw new Exception("sem conteudo");

            if (arquivo.TryGetProperty("Tipo", out JsonElement jtipo) && jtipo.ValueKind == JsonValueKind.String)
                tipo = jtipo.GetString();
            else
                throw new Exception("sem tipo");

            if (arquivo.TryGetProperty("Nome", out JsonElement jnome) && jnome.ValueKind == JsonValueKind.String)
                nome = jnome.GetString();
            else
                throw new Exception("sem tipo");


            if (arquivo.TryGetProperty("Id", out JsonElement jid) && jid.ValueKind == JsonValueKind.String)
                id = Guid.Parse(jid.GetString());
            else
                throw new Exception("falha no id");


            var localizado = await db.Entrada.Where(p => p.Id == id).FirstOrDefaultAsync();
            if (localizado.Conteudo != null)
                throw new Exception("entrada já registrada");

            localizado.Conteudo = conteudo;
            localizado.ConteudoTipo = tipo;
            localizado.ConteudoNome = nome;
            db.Update(localizado);
            await db.SaveChangesAsync();

        }

        [AllowAnonymous]
        [HttpGet("[action]/{vid}")]
        public async Task<IActionResult> Download(string vid)
        {
            Guid id = Guid.Parse(vid);
            Model.Entrada retorno = await db.Entrada.FindAsync(id);
            if (retorno == null)
                throw new Exception("arquivo não localizado");
            return File(retorno.Conteudo, retorno.ConteudoTipo, retorno.ConteudoNome);
        }

        [HttpGet("[action]")]
        public async Task<List<Model.vwEntrada>> NaoRecebidos()
        {
            var q = await (from entrada in db.vwEntrada.Include(p => p.Comerciante).Include(p => p.Autor).Include(p => p.Doador)
                           join estoque in db.Estoque on entrada.Id equals estoque.IdEntrada into vazio
                           from semestoque in vazio.DefaultIfEmpty()
                           where
                                entrada.ConteudoTipo != null & semestoque == null
                           select entrada).AsNoTracking().ToListAsync();
            return q;
        }

    }
}