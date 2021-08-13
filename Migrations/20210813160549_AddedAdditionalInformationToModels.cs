using Microsoft.EntityFrameworkCore.Migrations;

namespace FootballReactClientWithMVCAPI.Migrations
{
    public partial class AddedAdditionalInformationToModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Leagues",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfTeams",
                table: "Leagues",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Coaches",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Coaches",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "Leagues");

            migrationBuilder.DropColumn(
                name: "NumberOfTeams",
                table: "Leagues");

            migrationBuilder.DropColumn(
                name: "Age",
                table: "Coaches");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Coaches");
        }
    }
}
