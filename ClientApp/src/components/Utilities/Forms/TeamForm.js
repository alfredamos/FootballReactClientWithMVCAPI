import React, { useState } from "react";

export const TeamForm = (props) => {
  const {
    backToListHandler,
    heading,
    buttonAction,
    onTeamChange,
    initialTeamData,
    coaches,
    leagues,
    type,
  } = props;

  const [team, setTeam] = useState(initialTeamData);

  const handleSubmit = (event) => {
    event.preventDefault();    
    onTeamChange(team);
  };

    const handleChange = (event) => {
      event.persist();
      const { name, value } = event.target;   
      setTeam({ ...team, [name]: name === "coachId" || name === "leagueId" ? +value : value });
    
  };

  return (
    <div className="border" style={{ width: "50%" }}>
      <div className="card-header text-center">
        <h4>{heading}</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="name"
              value={team.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-label">City:</label>
            <input
              type="text"
              name="city"
              id="city"
              required
              placeholder="city"
              value={team.city}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Stadium:</label>
            <input
              type="text"
              name="stadium"
              id="stadium"
              required
              placeholder="stadium"
              value={team.stadium}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="coachId" className="form-coontrol-label">
              Coach :
            </label>
            <select
              id="coachId"              
              name="coachId"
              value={team.coachId}
              className="form-control"
              onChange={handleChange}
            >
              <option>Select Coach</option>
              {coaches.map((coach) => (
                <option key={coach.coachId} value={coach.coachId}>
                  {coach.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="leagueId" className="form-coontrol-label">
              League:
            </label>
            <select
              id="leagueId"              
              name="leagueId"
              value={team.leagueId}
              className="form-control"
              onChange={handleChange}
            >
              <option>Select League</option>
              {leagues.map((league) => (
                <option key={league.leagueId} value={league.leagueId}>
                  {league.name}
                </option>
              ))}
            </select>
          </div>
          <hr />
          <hr />
          <div className="form-group">
            <button type="submit" className="btn btn-secondary btn-block">
              <strong>{buttonAction}</strong>
            </button>
          </div>
          <hr />
        </form>
      </div>
      <div className="card-footer">
        <button
          onClick={backToListHandler}
          className="btn btn-primary btn-block"
        >
          <strong>Back To Team List</strong>
        </button>
      </div>
    </div>
  );
};
