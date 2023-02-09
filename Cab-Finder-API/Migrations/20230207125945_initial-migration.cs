using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CabFinderAPI.Migrations
{
    /// <inheritdoc />
    public partial class initialmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    locationId = table.Column<int>(name: "location_Id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    locationdescription = table.Column<string>(name: "location_description", type: "text", nullable: true),
                    startcoordlong = table.Column<double>(name: "start_coord_long", type: "double precision", nullable: false),
                    startcoordlat = table.Column<double>(name: "start_coord_lat", type: "double precision", nullable: false),
                    destinationcoordlong = table.Column<double>(name: "destination_coord_long", type: "double precision", nullable: false),
                    destinationcoordlat = table.Column<double>(name: "destination_coord_lat", type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.locationId);
                });

            migrationBuilder.CreateTable(
                name: "Rides",
                columns: table => new
                {
                    rideid = table.Column<int>(name: "ride_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    locationid = table.Column<int>(name: "location_id", type: "integer", nullable: false),
                    rideserviceid = table.Column<int>(name: "rideservice_id", type: "integer", nullable: false),
                    estimatedarrivaltime = table.Column<DateTime>(name: "estimated_arrival_time", type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rides", x => x.rideid);
                });

            migrationBuilder.CreateTable(
                name: "RideServices",
                columns: table => new
                {
                    rideserviceid = table.Column<int>(name: "rideservice_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    rideservicename = table.Column<string>(name: "rideservice_name", type: "text", nullable: true),
                    priceperkm = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RideServices", x => x.rideserviceid);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "Rides");

            migrationBuilder.DropTable(
                name: "RideServices");
        }
    }
}
