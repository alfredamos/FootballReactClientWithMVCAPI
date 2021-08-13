using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FootballReactClientWithMVCAPI.Models;
using FootballReactClientWithMVCAPI.Contracts;
using AutoMapper;

namespace FootballReactClientWithMVCAPI.Controllers.Coaches
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoachesController : ControllerBase
    {        
        private readonly ICoachRepository _coachRepository;
        private readonly IMapper _mapper;

        public CoachesController(ICoachRepository coachRepository, IMapper mapper)
        {            
            _coachRepository = coachRepository;
            _mapper = mapper;
        }

        // GET: api/Coaches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coach>>> GetCoaches()
        {
            try
            {
                return Ok(await _coachRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
            
        }

        // GET: api/Coaches/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Coach>> GetCoach(int id)
        {
            try
            {
                return await _coachRepository.GetById(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
            
        }

        // PUT: api/Coaches/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Coach>> PutCoach(int id, Coach coach)
        {
            try
            {
                if (id != coach.CoachId)
                {
                    return BadRequest("Id mismatch");
                }

                var coachToUpdate = await _coachRepository.GetById(id);
                if (coachToUpdate == null)
                {
                    return NotFound($"Coach with {id} not found.");
                }
                _mapper.Map(coach, coachToUpdate);

                return await _coachRepository.UpdateEntity(coachToUpdate);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }
            

        }

        // POST: api/Coaches
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Coach>> PostCoach(Coach coach)
        {
            try
            {
                if (coach == null)
                {
                    return BadRequest("Invalid input");
                }
                var createdCoach = await _coachRepository.AddEntity(coach);
                return CreatedAtAction(nameof(GetCoach), new { id = createdCoach.CoachId }, createdCoach);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }

            
        }

        // DELETE: api/Coaches/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Coach>> DeleteCoach(int id)
        {
            try
            {
                var coachToDelete = await _coachRepository.GetById(id);
                if (coachToDelete == null)
                {
                    return NotFound($"coach with {id} not found.");
                }

                return await _coachRepository.DeleteEntity(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }                      
        }


        // GET: api/Coaches/searchKey
        [HttpGet("{searchKey}")]
        public async Task<ActionResult<IEnumerable<Coach>>> Search(string searchKey)
        {
            try
            {
                return Ok(await _coachRepository.Search(searchKey));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

    }
}
