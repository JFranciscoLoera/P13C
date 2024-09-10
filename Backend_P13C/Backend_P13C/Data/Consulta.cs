using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Backend_P13C.Model;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace Backend_P13C.Data
{
    public class Consulta
    {
        private readonly string _connectionString;

        public Consulta(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public List<MetalFailureData> ObtenerDatosFallasMetalLine(DateTime startDate, DateTime endDate)
        {
            using (IDbConnection dbConnection = new SqlConnection(_connectionString))
            {
                dbConnection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@StartDate", startDate);
                parameters.Add("@EndDate", endDate);

                var result = dbConnection.Query<MetalFailureData>(
                    "HIS.sp_GetMetalLineFailuresByDate", // Nombre del procedimiento almacenado con parámetros
                    parameters,
                    commandType: CommandType.StoredProcedure
                ).ToList();

                return result;
            }
        }

        public List<LineData> ObtenerCatalogoLineas()
        {
            using (IDbConnection dbConnection = new SqlConnection(_connectionString))
            {
                dbConnection.Open();
                var parameters = new DynamicParameters();

                var result = dbConnection.Query<LineData>(
                    "GetLineData", // Nombre del procedimiento almacenado
                    parameters,
                    commandType: CommandType.StoredProcedure
                ).ToList();

                return result;
            }
        }

        public List<LineData> ObtenerCatalogoTurnos()
        {
            using (IDbConnection dbConnection = new SqlConnection(_connectionString))
            {
                dbConnection.Open();
                var parameters = new DynamicParameters();

                var result = dbConnection.Query<LineData>(
                    "GetShiftData", // Nombre del procedimiento almacenado
                    parameters,
                    commandType: CommandType.StoredProcedure
                ).ToList();

                return result;
            }
        }

        public List<LossesData> ObtenerDatosPerdidas(DateTime startDate,DateTime endDate, string line, string shift)
        {
            using (IDbConnection dbConnection = new SqlConnection(_connectionString))
            {
                if (shift.Equals("Turno 1")) shift = "1er Turno";
                if (shift.Equals("Turno 2")) shift = "2do Turno";
                if (shift.Equals("Turno 3")) shift = "3er Turno";
                dbConnection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@StartDate", startDate);
                parameters.Add("@EndDate", endDate);
                parameters.Add("@LineName", line);
                parameters.Add("@ShiftName", shift);


                var result = dbConnection.Query<LossesData>(
                    "GetFilteredLossesData", // Nombre del procedimiento almacenado
                    parameters,
                    commandType: CommandType.StoredProcedure
                ).ToList();

                return result;
            }
        }















    }
}
