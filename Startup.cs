using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace AjudaMusica
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<Model.DB>(Opt => Opt.UseSqlServer(Configuration.GetConnectionString("db")));
            // services.AddControllersWithViews();
            services.AddControllers().AddJsonOptions(p =>
            {
                p.JsonSerializerOptions.PropertyNamingPolicy = null;
                p.JsonSerializerOptions.DictionaryKeyPolicy = null;

            });


            byte[] chavejwt = Encoding.ASCII.GetBytes(Configuration.GetValue<string>("jwt"));
            jwt.Secret = chavejwt;
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {

                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        if (string.IsNullOrEmpty(accessToken) == false)
                        {
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(chavejwt),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });


            services.AddCors(options =>
            {
                options.AddPolicy("generica", builder =>
                {
                    builder.WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                // app.UseDeveloperExceptionPage();
            }
            app.UseCors("generica");

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            // if (!env.IsDevelopment())
            // {
            //     app.UseSpaStaticFiles();
            // }

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                // endpoints.MapControllerRoute(
                //     name: "default",
                //     pattern: "{controller}/{action=Index}/{id?}");

            });
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
            });

        }
    }
}
