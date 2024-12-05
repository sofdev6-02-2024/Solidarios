using AutoMapper;
using CEventService.API.Models;
using CEventService.API.DTOs.Activity;
using CEventService.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CEventService.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceService _attendanceService;
        private readonly IMapper _mapper;

        public AttendanceController(IAttendanceService attendanceService, IMapper mapper)
        {
            _attendanceService = attendanceService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AttendanceOutputDto>>> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var items = await _attendanceService.GetAllAsync(page, pageSize);
            if (items == null || !items.Any()) return NotFound();

            var itemsDto = _mapper.Map<IEnumerable<AttendanceOutputDto>>(items);
            return Ok(itemsDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AttendanceOutputDto>> GetById(int id)
        {
            var item = await _attendanceService.GetByIdAsync(id);
            if (item == null) return NotFound();

            return Ok(_mapper.Map<AttendanceOutputDto>(item));
        }

        [HttpPost]
        public async Task<ActionResult<AttendanceOutputDto>> Create([FromBody] AttendanceInputDto inputDto)
        {
            var model = _mapper.Map<Attendance>(inputDto);
            var createdItem = await _attendanceService.CreateAsync(model);
            if (createdItem == null) return BadRequest();

            return CreatedAtAction(nameof(GetById), new { id = createdItem.Id }, _mapper.Map<AttendanceOutputDto>(createdItem));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] AttendanceInputDto inputDto)
        {
            var model = _mapper.Map<Attendance>(inputDto);
            var updatedItem = await _attendanceService.UpdateAsync(id, model);
            if (updatedItem == null) return NotFound();

            return Ok(_mapper.Map<AttendanceOutputDto>(updatedItem));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDelete(int id)
        {
            var result = await _attendanceService.SoftDeleteAsync(id);
            return result > 0 ? NoContent() : NotFound();
        }
    }
}
