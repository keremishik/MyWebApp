using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWebApp.Api.Models;

namespace MyWebApp.Api.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        [FromServices]
        public MyWebAppContext? Context {  get; set; }


        [HttpGet(Name = "GetProducts")]
        public async Task<IEnumerable<Product>> Get()
        {
            return await Context.Products.ToListAsync();
        }

        //public IEnumerable<Product> Get()
        //{
        //    return Context.Products.ToList();
        //}
    }
}
