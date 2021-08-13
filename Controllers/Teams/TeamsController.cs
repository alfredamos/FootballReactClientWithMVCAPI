using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FootballReactClientWithMVCAPI.Models;
using FootballReactClientWithMVCAPI.Contracts;
using AutoMapper;

namespace FootballReactClientWithMVCAPI.Controllers.Teams
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IMapper _mapper;

        public TeamsController(ITeamRepository teamRepository, IMapper mapper)
        {
            _teamRepository = teamRepository;
            _mapper = mapper;
        }

        // GET: api/Teams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Team>>> GetTeams()
        {
            try
            {
                return Ok(await _teamRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

        // GET: api/Teams/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Team>> GetTeam(int id)
        {
            try
            {
                return await _teamRepository.GetById(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

        // PUT: api/Teams/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Team>> PutTeam(int id, Team team)
        {
            try
            {
                if (id != team.TeamId)
                {
                    return BadRequest("Id mismatch");
                }

                var teamToUpdate = await _teamRepository.GetById(id);
                if (teamToUpdate == null)
                {
                    return NotFound($"Team with {id} not found.");
                }
                _mapper.Map(team, teamToUpdate);

                return await _teamRepository.UpdateEntity(teamToUpdate);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }


        }

        // POST: api/Teams
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Team>> PostTeam(Team team)
        {
            try
            {
                if (team == null)
                {
                    return BadRequest("Invalid input");
                }
                var createdTeam = await _teamRepository.AddEntity(team);
                return CreatedAtAction(nameof(GetTeam), new { id = createdTeam.TeamId }, createdTeam);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }


        }

        // DELETE: api/Teams/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Team>> DeleteTeam(int id)
        {
            try
            {
                var teamToDelete = await _teamRepository.GetById(id);
                if (teamToDelete == null)
                {
                    return NotFound($"Team with {id} not found.");
                }

                return await _teamRepository.DeleteEntity(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }
        }


        // GET: api/Teams/searchKey
        [HttpGet("{searchKey}")]
        public async Task<ActionResult<IEnumerable<Team>>> Search(string searchKey)
        {
            try
            {
                return Ok(await _teamRepository.Search(searchKey));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

    }
}
