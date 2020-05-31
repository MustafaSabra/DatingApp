using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DatingApp.Models;
using DatingApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace DatingApp.API.Controllers
{
    
    

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;
       
public ValuesController(DataContext context)
{
    this._context=context;
}

        [HttpGet]
        public async Task<IActionResult> Getvalues()
        {
            var list=await _context.Values.ToListAsync();
            return Ok(list);
        }

[HttpGet("{id}")]
[AllowAnonymous]
public async Task< IActionResult> GetByID(int id)
{
    var list=await _context.Values.FirstOrDefaultAsync(m=>m.Id==id);
    return Ok(list);
}

        // GET api/values
        // [HttpGet]
        // public ActionResult<IEnumerable<string>> Get()
        // {
        //     // throw new Exception("Test");
        //     return new string[]{"value1","value2"};
        // }

        //  [HttpGet("{id}")]
        // public ActionResult<string> Get(int id)
        // {
        //     return  "value";
        // }
       // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
            
        }
        [HttpPut("{id}")]
        public void Put(int id,[FromBody] string value)
        {

        }
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

        }

    }
}