using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballReactClientWithMVCAPI.Data;
using FootballReactClientWithMVCAPI.Models;
using FootballReactClientWithMVCAPI.Contracts;
using AutoMapper;
using Microsoft.AspNetCore.Http;

namespace FootballReactClientWithMVCAPI.Controllers.Leagues
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaguesController : ControllerBase
    {
        private readonly ILeagueRepository _leagueRepository;
        private readonly IMapper _mapper;

        public LeaguesController(ILeagueRepository leagueRepository, IMapper mapper)
        {
            _leagueRepository = leagueRepository;
            _mapper = mapper;
        }

        // GET: api/Leaguees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<League>>> GetLeaguees()
        {
            try
            {
                return Ok(await _leagueRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

        // GET: api/Leaguees/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<League>> GetLeague(int id)
        {
            try
            {
                return await _leagueRepository.GetById(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

        // PUT: api/Leaguees/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id:int}")]
        public async Task<ActionResult<League>> PutLeague(int id, League league)
        {
            try
            {
                if (id != league.LeagueId)
                {
                    return BadRequest("Id mismatch");
                }

                var leagueToUpdate = await _leagueRepository.GetById(id);
                if (leagueToUpdate == null)
                {
                    return NotFound($"League with {id} not found.");
                }
                _mapper.Map(league, leagueToUpdate);

                return await _leagueRepository.UpdateEntity(leagueToUpdate);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }


        }

        // POST: api/Leaguees
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<League>> PostLeague(League league)
        {
            try
            {
                if (league == null)
                {
                    return BadRequest("Invalid input");
                }
                var createdLeague = await _leagueRepository.AddEntity(league);
                return CreatedAtAction(nameof(GetLeague), new { id = createdLeague.LeagueId }, createdLeague);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }


        }

        // DELETE: api/Leaguees/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<League>> DeleteLeague(int id)
        {
            try
            {
                var leagueToDelete = await _leagueRepository.GetById(id);
                if (leagueToDelete == null)
                {
                    return NotFound($"League with {id} not found.");
                }

                return await _leagueRepository.DeleteEntity(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }
        }


        // GET: api/Leaguees/searchKey
        [HttpGet("{searchKey}")]
        public async Task<ActionResult<IEnumerable<League>>> Search(string searchKey)
        {
            try
            {
                return Ok(await _leagueRepository.Search(searchKey));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

    }
}
