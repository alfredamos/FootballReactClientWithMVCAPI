import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faBook } from "@fortawesome/free-solid-svg-icons";
import { SearchItem } from "../Utilities/Helpers/SearchItem";
import axios from "axios";

export const MatchList = (props) => {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const matchUrl = `https://localhost:5001/api/matches`;

  const editHandler = (id) => {
    console.log(id);
    props.history.replace({
      pathname: `/editMatch/${id}`,
    });
  };

  const deleteHandler = (id) => {
    console.log(id);
    props.history.replace({
      pathname: `/deleteMatch/${id}`,
    });
  };

  const createHandler = () => {
    props.history.replace({
      pathname: "/createMatch",
    });
  };

  const detailHandler = (id) => {
    console.log(id);
    props.history.replace({
      pathname: `/detailMatch/${id}`,
    });
  };

  useEffect(() => {
    let onMount = true;
    axios.get(matchUrl).then((res) => {
      if (onMount) {
        setMatches(res.data);
        setIsLoading(true);
      }
    });
    return () => (onMount = false);
  }, [matchUrl]);

  const filterHandler = (event) => {
    const { value } = event.target;
    setFilter(value);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    console.log("filter : ", filter);
    if (filter !== "") {
      const searchApiUrl = `https://localhost:5001/api/matches/${filter}`;
      axios.get(searchApiUrl).then((res) => {
        setMatches(res.data);
      });
    } else {
      axios.get(matchUrl).then((res) => {
        setMatches(res.data);
      });
    }
  };

  return (
    <>
      {isLoading && (
        <section>
          <div className="border">
            <div className="card-header text-center">
              <h4>List of Matches</h4>
            </div>
            <div className="card-body">
              <SearchItem
                filterHandler={filterHandler}
                searchHandler={searchHandler}
              />
              <br />
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Home Team</th>
                    <th>Home Team Score</th>
                    <th>Away Team</th>
                    <th>Away Team Score</th>
                    <th>Venue</th>
                    <th>Location</th>
                    <th>Refree</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                                  {matches.map((match) => (
                                      <tr key={match.matchId}>
                      <td>{match.homeTeam.name}</td>
                      <td>{match.homeTeamScore}</td>
                      <td>{match.awayTeam.name}</td>
                      <td>{match.awayTeamScore}</td>
                      <td>{match.venue}</td>
                      <td>{match.location}</td>
                      <td>{match.refree.name}</td>
                      <td>
                                              <button
                                                  onClick={() => editHandler(match.matchId)}
                          className="btn btn-warning m-1"
                          style={{ fontWeight: "bold" }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                                              <button
                                                  onClick={() => deleteHandler(match.matchId)}
                          className="btn btn-danger m-1"
                          style={{ fontWeight: "bold" }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                                              <button
                                                  onClick={() => detailHandler(match.matchId)}
                          className="btn btn-primary m-1"
                          style={{ fontWeight: "bold" }}
                        >
                          <FontAwesomeIcon icon={faBook} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer">
              <button
                type="button"
                onClick={createHandler}
                className="btn btn-primary btn-block"
                style={{ fontWeight: "bold" }}
              >
                Create Match
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
