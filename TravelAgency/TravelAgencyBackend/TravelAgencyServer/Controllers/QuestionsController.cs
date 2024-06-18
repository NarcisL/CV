using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using TravelAgencyServer.Models;

namespace TravelAgencyServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly dbContext _dbContext;

        public QuestionsController(dbContext _dbContext)
        {
            this._dbContext = _dbContext;
        }

        // GET : api/Questions?id={id}
        [HttpGet]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
            if (_dbContext.Questions == null)
            {
                return NotFound(new { message = "Questions table is empty!" });
            }
            var question = await _dbContext.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound(new { message = "Question does not exist!" });
            }
            return Ok(question);
        }

        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
            var account = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Mail == question.Mail);
            if (account == null)
            {
                return BadRequest(new { message = "No account associated with this email." });
            }

            question.Account = account;
            _dbContext.Questions.Add(question);
            await _dbContext.SaveChangesAsync();

        
            question.Account = null;

            return CreatedAtAction(nameof(GetQuestion), new { id = question.Id }, question);
        }


        // DELETE : api/Questions?id={id}
        [HttpDelete]
        public async Task<ActionResult<Account>> DeleteAccount(int id)
        {
            if (_dbContext.Questions is null)
            {
                return NotFound(new { message = "Questions table is empty!" });
            }
            var question = await _dbContext.Accounts.FindAsync(id);
            if (question is null)
            {
                return NotFound(new { message = "Question does not exist!" });
            }
            _dbContext.Accounts.Remove(question);
            await _dbContext.SaveChangesAsync();
            return Ok(new { message = "Question deleted." });
        }
    }
}
