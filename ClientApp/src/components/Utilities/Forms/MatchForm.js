import React, { useState } from "react";

export const MatchForm = (props) => {
  const {
    backToListHandler,
    heading,
    buttonAction,
    onMatchChange,
    initialMatchData,
    refrees,
    teams    
  } = props;

  const [match, setMatch] = useState(initialMatchData);

  const handleSubmit = (event) => {
    event.preventDefault();
    onMatchChange(match);
  };

  const handleChange = (event) => {
    const { name, type, value } = event.target;
      event.persist();
      setMatch({ ...match, [name]: Value(name, type, value) });
  };


    const Value = (name, type, value) => {
        return type === "number" || name === "homeTeamId" || name === "awayTeamId" || name === "refreeId" ? +value : value;
    }


  return (
    <div className="border" style={{ width: "50%" }}>
      <div className="card-header text-center">
        <h4>{heading}</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="homeTeamId" className="form-coontrol-label">
              Home Team :
            </label>
            <select
              id="homeTeamId"
              name="homeTeamId"
              value={match.homeTeamId}
              className="form-control"
              onChange={handleChange}
            >
              <option>Select Home Team</option>
                          {teams.map((team) => (
                              <option key={team.teamId} value={team.teamId}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="awayTeamId" className="form-coontrol-label">
              Away Team :
            </label>
            <select
              id="awayTeamId"
              name="awayTeamId"
              value={match.awayTeamId}
              className="form-control"
              onChange={handleChange}
            >
              <option>Select Away Team</option>
                          {teams.map((team) => (
                              <option key={team.teamId} value={team.teamId}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Home Team Score:</label>
            <input
              type="number"
              name="homeTeamScore"
              id="homeTeamScore"
              required
              placeholder="Home Team Score"
              value={match.homeTeamScore}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Away Team Score:</label>
            <input
              type="number"
              name="awayTeamScore"
              id="awayTeamScore"
              required
              placeholder="Away Team Score"
              value={match.awayTeamScore}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Venue:</label>
            <input
              type="text"
              name="venue"
              id="venue"
              required
              placeholder="venue"
              value={match.venue}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Location:</label>
            <input
              type="text"
              name="location"
              id="location"
              required
              placeholder="location"
              value={match.location}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="refreeId" className="form-coontrol-label">
              Refree :
            </label>
            <select
              id="refreeId"
              name="refreeId"
              value={match.refreeId}
              className="form-control"
              onChange={handleChange}
            >
              <option>Select Refree</option>
              {refrees.map((refree) => (
                <option key={refree.refreeId} value={refree.refreeId}>
                  {refree.name}
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
          <strong>Back To Match List</strong>
        </button>
      </div>
    </div>
  );
};
