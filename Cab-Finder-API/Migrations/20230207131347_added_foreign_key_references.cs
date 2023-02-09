using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CabFinderAPI.Migrations
{
    /// <inheritdoc />
    public partial class addedforeignkeyreferences : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Rides_location_id",
                table: "Rides",
                column: "location_id");

            migrationBuilder.CreateIndex(
                name: "IX_Rides_rideservice_id",
                table: "Rides",
                column: "rideservice_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_Locations_location_id",
                table: "Rides",
                column: "location_id",
                principalTable: "Locations",
                principalColumn: "location_Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_RideServices_rideservice_id",
                table: "Rides",
                column: "rideservice_id",
                principalTable: "RideServices",
                principalColumn: "rideservice_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rides_Locations_location_id",
                table: "Rides");

            migrationBuilder.DropForeignKey(
                name: "FK_Rides_RideServices_rideservice_id",
                table: "Rides");

            migrationBuilder.DropIndex(
                name: "IX_Rides_location_id",
                table: "Rides");

            migrationBuilder.DropIndex(
                name: "IX_Rides_rideservice_id",
                table: "Rides");
        }
    }
}
