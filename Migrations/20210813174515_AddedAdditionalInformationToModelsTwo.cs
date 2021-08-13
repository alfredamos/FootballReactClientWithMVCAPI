using Microsoft.EntityFrameworkCore.Migrations;

namespace FootballReactClientWithMVCAPI.Migrations
{
    public partial class AddedAdditionalInformationToModelsTwo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Teams",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Stadium",
                table: "Teams",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "Stadium",
                table: "Teams");
        }
    }
}
