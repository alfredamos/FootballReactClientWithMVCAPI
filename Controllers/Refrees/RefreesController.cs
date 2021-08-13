using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FootballReactClientWithMVCAPI.Models;
using FootballReactClientWithMVCAPI.Contracts;
using AutoMapper;

namespace FootballReactClientWithMVCAPI.Controllers.Refrees
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefreesController : ControllerBase
    {
        private readonly IRefreeRepository _refreeRepository;
        private readonly IMapper _mapper;

        public RefreesController(IRefreeRepository refreeRepository, IMapper mapper)
        {
            _refreeRepository = refreeRepository;
            _mapper = mapper;
        }

        // GET: api/Refreees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Refree>>> GetRefreees()
        {
            try
            {
                return Ok(await _refreeRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

        // GET: api/Refreees/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Refree>> GetRefree(int id)
        {
            try
            {
                return await _refreeRepository.GetById(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

        // PUT: api/Refreees/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Refree>> PutRefree(int id, Refree refree)
        {
            try
            {
                if (id != refree.RefreeId)
                {
                    return BadRequest("Id mismatch");
                }

                var refreeToUpdate = await _refreeRepository.GetById(id);
                if (refreeToUpdate == null)
                {
                    return NotFound($"Refree with {id} not found.");
                }
                _mapper.Map(refree, refreeToUpdate);

                return await _refreeRepository.UpdateEntity(refreeToUpdate);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }


        }

        // POST: api/Refreees
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Refree>> PostRefree(Refree refree)
        {
            try
            {
                if (refree == null)
                {
                    return BadRequest("Invalid input");
                }
                var createdRefree = await _refreeRepository.AddEntity(refree);
                return CreatedAtAction(nameof(GetRefree), new { id = createdRefree.RefreeId }, createdRefree);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }


        }

        // DELETE: api/Refreees/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Refree>> DeleteRefree(int id)
        {
            try
            {
                var refreeToDelete = await _refreeRepository.GetById(id);
                if (refreeToDelete == null)
                {
                    return NotFound($"Refree with {id} not found.");
                }

                return await _refreeRepository.DeleteEntity(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }
        }


        // GET: api/Refreees/searchKey
        [HttpGet("{searchKey}")]
        public async Task<ActionResult<IEnumerable<Refree>>> Search(string searchKey)
        {
            try
            {
                return Ok(await _refreeRepository.Search(searchKey));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

    }
}
