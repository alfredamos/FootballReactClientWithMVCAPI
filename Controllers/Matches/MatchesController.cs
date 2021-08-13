using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FootballReactClientWithMVCAPI.Models;
using FootballReactClientWithMVCAPI.Contracts;
using AutoMapper;

namespace FootballReactClientWithMVCAPI.Controllers.Matches
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchesController : ControllerBase
    {
        private readonly IMatchRepository _matchRepository;
        private readonly IMapper _mapper;

        public MatchesController(IMatchRepository matchRepository, IMapper mapper)
        {
            _matchRepository = matchRepository;
            _mapper = mapper;
        }

        // GET: api/Matches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Match>>> GetMatches()
        {
            try
            {
                return Ok(await _matchRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

        // GET: api/Matches/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Match>> GetMatch(int id)
        {
            try
            {
                return await _matchRepository.GetById(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

        // PUT: api/Matches/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Match>> PutMatch(int id, Match match)
        {
            try
            {
                if (id != match.MatchId)
                {
                    return BadRequest("Id mismatch");
                }

                var matchToUpdate = await _matchRepository.GetById(id);
                if (matchToUpdate == null)
                {
                    return NotFound($"Match with {id} not found.");
                }
                _mapper.Map(match, matchToUpdate);

                return await _matchRepository.UpdateEntity(matchToUpdate);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }


        }

        // POST: api/Matches
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Match>> PostMatch(Match match)
        {
            try
            {
                if (match == null)
                {
                    return BadRequest("Invalid input");
                }
                var createdMatch = await _matchRepository.AddEntity(match);
                return CreatedAtAction(nameof(GetMatch), new { id = createdMatch.MatchId }, createdMatch);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }


        }

        // DELETE: api/Matches/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Match>> DeleteMatch(int id)
        {
            try
            {
                var matchToDelete = await _matchRepository.GetById(id);
                if (matchToDelete == null)
                {
                    return NotFound($"Match with {id} not found.");
                }

                return await _matchRepository.DeleteEntity(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }
        }


        // GET: api/Matches/searchKey
        [HttpGet("{searchKey}")]
        public async Task<ActionResult<IEnumerable<Match>>> Search(string searchKey)
        {
            try
            {
                return Ok(await _matchRepository.Search(searchKey));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

    }
}
