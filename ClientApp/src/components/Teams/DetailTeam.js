import React, { useState, useEffect } from "react";
import axios from "axios";

export const DetailTeam = (props) => {
  const [team, setTeam] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = `https://localhost:5001/api/teams/${props.match.params.id}`;

  useEffect(() => {
    const GetData = async () => {
      const result = await axios(apiUrl);
      setTeam(result.data);
      console.log("team : ", result.data);
      setIsLoading(true);
    };
    GetData();
  }, [apiUrl]);

  const backToListHandler = () => {
    props.history.replace({
      pathname: "/teamList",
    });
  };

  const deleteHandler = async (id) => {
    console.log(id);
    console.log("Click me Delete");
    props.history.replace({
      pathname: `/deleteTeam/${id}`,
    });
  };

  return (
    <>
      {isLoading && (
        <div className="border" style={{ width: "50%" }}>
          <div className="card-header text-center">
            <h3>Team Detail</h3>
          </div>
          <div className="card-body">
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>Name : </strong>
                    {team.name}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>City : </strong>
                    {team.city}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Stadium : </strong>
                    {team.stadium}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Coach : </strong>
                    {team.coach.name}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>League : </strong>
                    {team.league.name}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <button
              type="button"
              className="btn btn-outline-danger btn-block"
              onClick={() => deleteHandler(team.teamId)}
              style={{ fontWeight: "bold" }}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-block"
              onClick={backToListHandler}
              style={{ fontWeight: "bold" }}
            >
              Back to List
            </button>
          </div>
        </div>
      )}
    </>
  );
};
