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
        public MyWebAppContext Context { get; set; }

        [HttpGet(Name = "GetProducts")]
        public async Task<IEnumerable<Product>> Get(int page=1, int pageSize= 10)
        {
            int skip = (page - 1) * pageSize;
            var products = await Context.Products.Skip(skip).Take(pageSize).ToListAsync();
            return products;
        }

        [HttpGet("amount", Name = "GetProductAmount")]
        public async Task<int> GetTotalCount()
        {
            return await Context.Products.CountAsync();
        }

        [HttpPost("create", Name = "CreateProducts")]
        public async Task Create(Product product)
        {
            Context.Products.Add(product);
            await Context.SaveChangesAsync();
        }

        [HttpDelete("delete", Name = "DeleteProduct")]
        public async Task<IActionResult> Delete(int productId)
        {
            var product = await Context.Products.FindAsync(productId);

            if (product == null)
            {
                return NotFound(new { message = $"Product with ID {productId} not found." });
            }

            // Check for existing order details referencing this product to avoid FK constraint violations
            var hasOrderDetails = await Context.OrderDetails.AnyAsync(od => od.ProductId == productId);
            if (hasOrderDetails)
            {
                return Conflict(new { message = "Cannot delete product because it is referenced by existing order details." });
            }

            Context.Products.Remove(product);
            await Context.SaveChangesAsync();
            return NoContent();
        }

        //[HttpGet(Name = "GetProducts")]
        //public async Task<IEnumerable<Product>> Get()
        //{
        //    return await Context.Products.ToListAsync();
        //}

        //public IEnumerable<Product> Get()
        //{
        //    return Context.Products.ToList();
        //}
    }
}
