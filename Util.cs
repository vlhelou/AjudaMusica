using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

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


        public static System.Text.Json.JsonElement Datatable2Json(System.Data.DataTable dt)
        {
            using (System.IO.MemoryStream strwrite = new System.IO.MemoryStream())
            {
                using (System.Text.Json.Utf8JsonWriter writer = new Utf8JsonWriter(strwrite))
                {
                    writer.WriteStartArray();
                    foreach (System.Data.DataRow ln in dt.Rows)
                    {
                        writer.WriteStartObject();
                        for (int i = 0; i < dt.Columns.Count; i++)
                        {
                            //var x = dt.Columns[i].DataType;
                            if (ln[i] == DBNull.Value)
                            {
                                writer.WriteNull(dt.Columns[i].ColumnName);
                            }
                            else
                            {
                                switch (Type.GetTypeCode(dt.Columns[i].DataType))
                                {

                                    case TypeCode.String:
                                        writer.WriteString(dt.Columns[i].ColumnName, ln[i].ToString());
                                        break;
                                    case TypeCode.DateTime:
                                        writer.WriteString(dt.Columns[i].ColumnName, (DateTime)ln[i]);
                                        break;
                                    case TypeCode.Int16:
                                        writer.WriteNumber(dt.Columns[i].ColumnName, (Int16)ln[i]);
                                        break;
                                    case TypeCode.Int32:
                                        writer.WriteNumber(dt.Columns[i].ColumnName, (Int32)ln[i]);
                                        break;
                                    case TypeCode.Int64:
                                        writer.WriteNumber(dt.Columns[i].ColumnName, (Int64)ln[i]);
                                        break;
                                    case TypeCode.Decimal:
                                        writer.WriteNumber(dt.Columns[i].ColumnName, (decimal)ln[i]);
                                        break;
                                    case TypeCode.Boolean:
                                        writer.WriteBoolean(dt.Columns[i].ColumnName, (bool)ln[i]);
                                        break;

                                    default:
                                        writer.WriteString(dt.Columns[i].ColumnName, "não sei");
                                        Console.WriteLine(Type.GetTypeCode(dt.Columns[i].DataType));
                                        break;
                                }

                            }
                        }
                        writer.WriteEndObject();
                    }

                    writer.WriteEndArray();
                }
                strwrite.Position = 0;
                System.IO.StreamReader sr = new System.IO.StreamReader(strwrite);
                string str = sr.ReadToEnd();
                sr.Dispose();

                return JsonSerializer.Deserialize<JsonElement>(str);
            }

        }

    }
}