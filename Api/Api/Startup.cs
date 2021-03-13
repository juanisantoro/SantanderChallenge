using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.mapper;
using ApiBirras.Business.Interfaces;
using ApiBirras.Business.Servicios;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Api
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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddSwaggerGen(c => c.SwaggerDoc("v1", new Swashbuckle.AspNetCore.Swagger.Info
            {
                Version = "v1",
                Title = "Test Title",
                Description = "Test Description",
                TermsOfService = "None",
                Contact = new Swashbuckle.AspNetCore.Swagger.Contact
                {
                    Name = "All Ben Chaabene",
                    Email = "alibenchaabene@gmail.com",
                    Url = ""
                }
            }
            ));

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder => builder.AllowAnyMethod()
                                      .AllowAnyHeader()

                                      .AllowAnyOrigin()
                                      .AllowCredentials());
            });

            // Auto Mapper Configurations
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);


            services.AddScoped<IWeatherAppService, WeatherAppService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Test version 1");
            });

            app.UseCors("AllowAll");
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
