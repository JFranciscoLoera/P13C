using Backend_P13C.Data;
using Microsoft.AspNetCore.Mvc;

namespace MyApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class P13Controller : ControllerBase
    {
        private readonly Consulta _objConsulta;

        // Inyecta Consulta en el constructor
        public P13Controller(Consulta consulta)
        {
            _objConsulta = consulta;
        }

        // GET: api/p13/getMetalLineFailureData
        [HttpGet("getMetalLineFailureData")]
        public IActionResult GetMetalLineFailureData([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var data = _objConsulta.ObtenerDatosFallasMetalLine(startDate, endDate);
            return Ok(data);
        }

        // GET: api/p13/getMetalLineFailureData
        [HttpGet("getLines")]
        public IActionResult GetlLineDataCatalogue()
        {
            var data = _objConsulta.ObtenerCatalogoLineas();
            return Ok(data);
        }


        [HttpGet("getShift")]
        public IActionResult GetlShiftCatalogue()
        {
            var data = _objConsulta.ObtenerCatalogoTurnos();
            return Ok(data);
        }

        [HttpGet("getLossesData")]
        public IActionResult GetLossesData([FromQuery] DateTime startDate, [FromQuery] DateTime endDate, [FromQuery] string line, [FromQuery] string shift)
        {
            var data = _objConsulta.ObtenerDatosPerdidas(startDate,endDate,line,shift);
            return Ok(data);
        }

    }
}
