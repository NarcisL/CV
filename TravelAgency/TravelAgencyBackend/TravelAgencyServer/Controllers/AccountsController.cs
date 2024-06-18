using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using TravelAgencyServer.Models;

namespace TravelAgencyServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly dbContext _dbContext;
        public AccountsController(dbContext _dbContext)
        {
            this._dbContext = _dbContext;
        }

        // GET : api/Accounts?mail={mail}
        [HttpGet]
        public async Task<ActionResult<Account>> GetAccount(string mail)
        {
            if (string.IsNullOrEmpty(mail))
            {
                return BadRequest(new { message = "Mail parameter required!" });
            }
            if (_dbContext.Accounts is null)
            {
                return NotFound(new { message = "Account table is empty!" });
            }
            var account = await _dbContext.Accounts.FindAsync(mail);
            if (account is null)
            {
                return NotFound(new { message = "Account does not exist!" });
            }
            return Ok(account);
        }

        // POST : api/Accounts
        [HttpPost("signup")]
        public async Task<ActionResult<Account>> SignUp(Account account)
        {
            if (!account.Mail.Contains('@'))
            {
                return BadRequest(new { message = "Email address must contain '@' character!" });
            }

            var existingAccount = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Mail == account.Mail);
            if (existingAccount != null)
            {
                return BadRequest(new { message = "An account with this email already exists." });
            }

            _dbContext.Accounts.Add(account);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAccount), new { mail = account.Mail }, account);
        }

        // Sign-in endpoint
        [HttpPost("signin")]
        public async Task<ActionResult<Account>> SignIn(Account account)
        {
            if (!account.Mail.Contains('@'))
            {
                return BadRequest(new { message = "Email address must contain '@' character!" });
            }

            var existingAccount = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Mail == account.Mail);

            if (existingAccount == null)
            {
                return BadRequest(new { message = "No account with this email found." });
            }

            if (existingAccount.Password != account.Password)
            {
                return BadRequest(new { message = "Incorrect password." });
            }

            return Ok(new { message = "Signed in successfully." });
        }

        // PUT : api/Account?mail={mail}
        [HttpPut]
        public async Task<ActionResult<Account>> PutAccount(string mail, Account account)
        {
            if (string.IsNullOrEmpty(mail))
            {
                return BadRequest(new { message = "Mail parameter required!" });
            }
            if (mail != account.Mail)
            {
                return BadRequest(new { message = "Incompatible data!" });
            }
            _dbContext.Entry(account).State = EntityState.Modified;
            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(mail)) { return NotFound(new { message = "Account does not exist!" }); }
                else { throw; }
            }
            return Ok(new { message = "Account updated." });
        }

        private bool AccountExists(string mail)
        {
            return (_dbContext.Accounts?.Any(account => account.Mail == mail)).GetValueOrDefault();
        }

        // DELETE : api/Account?mail={mail}
        [HttpDelete]
        public async Task<ActionResult<Account>> DeleteAccount(string mail)
        {
            if (string.IsNullOrEmpty(mail))
            {
                return BadRequest(new { message = "Mail parameter required!" });
            }
            if (_dbContext.Accounts is null)
            {
                return NotFound(new { message = "Account table is empty!" });
            }
            var account = await _dbContext.Accounts.FindAsync(mail);
            if (account is null)
            {
                return NotFound(new { message = "Account does not exist!" });
            }
            _dbContext.Accounts.Remove(account);
            await _dbContext.SaveChangesAsync();
            return Ok(new { message = "Account deleted." });
        }
    }
}
