using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


namespace AjudaMusica
{
    public static class Util
    {
        public static string MD5Hash(string input)
        {
            MD5 md5h = MD5.Create();
            byte[] data = md5h.ComputeHash(Encoding.UTF8.GetBytes(input));
            StringBuilder retorno = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
            {
                retorno.Append(data[i].ToString("x2"));
            }

            md5h.Dispose();
            return retorno.ToString();
        }


        public static Model.Usuario Claim2Usuario(IEnumerable<Claim> usrAtuntenciacao)
        {
            
            Model.Usuario retorno = new Model.Usuario();
            foreach (Claim valor in usrAtuntenciacao)
            {
                switch (valor.Type)
                {
                    case ClaimTypes.Sid:
                        retorno.Id = int.Parse(valor.Value);
                        break;
                    case ClaimTypes.Name:
                        retorno.Nome = valor.Value;
                        break;
                    case ClaimTypes.Email:
                        retorno.Email = valor.Value;
                        break;
                }
            }

            return retorno;
        }



    }
}