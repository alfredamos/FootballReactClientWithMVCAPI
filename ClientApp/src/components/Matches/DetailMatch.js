import React, { useState, useEffect } from "react";
import axios from "axios";

export const DetailMatch = (props) => {
  const [match, setMatch] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = `https://localhost:5001/api/matches/${props.match.params.id}`;

  useEffect(() => {
    const GetData = async () => {
      const result = await axios(apiUrl);
      setMatch(result.data);
      setIsLoading(true);
    };
    GetData();
  }, [apiUrl]);

  const backToListHandler = () => {
    props.history.replace({
      pathname: "/",
    });
  };

  const deleteHandler = async (id) => {
    console.log(id);
    console.log("Click me Delete");
    props.history.replace({
      pathname: `/deleteMatch/${id}`,
    });
  };

  return (
    <>
      {isLoading && (
        <div className="border" style={{ width: "50%" }}>
          <div className="card-header text-center">
            <h3>Match Detail</h3>
          </div>
          <div className="card-body">
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>Home Team : </strong>
                    {match.homeTeam.name}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Home Team Score : </strong>
                    {match.homeTeamScore}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Away Team : </strong>
                    {match.awayTeam.name}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Away Team Score : </strong>
                    {match.awayTeamScore}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Venue : </strong>
                    {match.venue}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Location : </strong>
                    {match.location}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Refree : </strong>
                    {match.refree.name}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <button
              type="button"
              className="btn btn-outline-danger btn-block"
              onClick={() => deleteHandler(match.matchId)}
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
