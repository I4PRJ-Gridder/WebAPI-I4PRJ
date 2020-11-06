using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebAPI.Data;
using WebAPI.Models;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PixelPlacementController : ControllerBase
    {

        private MemoryRepository repository;

        public PixelPlacementController()
        {
            repository = MemoryRepository.GetInstance();
        }

            // GET: api/<PixelPlacementController>
        [HttpGet]
        public IEnumerable<PixelPlacement> Get()
        {
            return repository.PixelPlacements;
        }

        // GET api/<PixelPlacementController>/5
        [HttpGet("{id}")]
        public PixelPlacement Get(int id)
        {
            return repository[id];
        }
        
        // POST api/<PixelPlacementController>
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201)]
        public ActionResult<PixelPlacement> Post(string jsonPlacement)
        {
            if (jsonPlacement == null)
            {
                return BadRequest();
            }
            SerializationClass objToSerialize = new SerializationClass();

            var placement = objToSerialize.JsonDeserialize(jsonPlacement);

            //var newPlacement = repository.AddPixelPlacement(placement);

            return CreatedAtAction("Get", new {id = placement.PixelPlacementID}, placement);
        }

        // PUT api/<PixelPlacementController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PixelPlacementController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
