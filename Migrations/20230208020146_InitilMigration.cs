using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CabFinder.Migrations
{
    /// <inheritdoc />
    public partial class InitilMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    locationid = table.Column<int>(name: "location_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    locationdescription = table.Column<string>(name: "location_description", type: "text", nullable: false),
                    startcoordlong = table.Column<double>(name: "start_coord_long", type: "double precision", nullable: false),
                    startcoordlat = table.Column<double>(name: "start_coord_lat", type: "double precision", nullable: false),
                    destinationcoordlong = table.Column<double>(name: "destination_coord_long", type: "double precision", nullable: false),
                    destinationcoordlat = table.Column<double>(name: "destination_coord_lat", type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.locationid);
                });

            migrationBuilder.CreateTable(
                name: "RideServices",
                columns: table => new
                {
                    rideserviceid = table.Column<int>(name: "rideservice_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    rideservicename = table.Column<string>(name: "rideservice_name", type: "text", nullable: false),
                    priceperkm = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RideServices", x => x.rideserviceid);
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
                    table.ForeignKey(
                        name: "FK_Rides_Locations_location_id",
                        column: x => x.locationid,
                        principalTable: "Locations",
                        principalColumn: "location_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rides_RideServices_rideservice_id",
                        column: x => x.rideserviceid,
                        principalTable: "RideServices",
                        principalColumn: "rideservice_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rides_location_id",
                table: "Rides",
                column: "location_id");

            migrationBuilder.CreateIndex(
                name: "IX_Rides_rideservice_id",
                table: "Rides",
                column: "rideservice_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rides");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "RideServices");
        }
    }
}
