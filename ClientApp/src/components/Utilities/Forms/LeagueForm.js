import React, { useState } from 'react';


export const LeagueForm = (props) => {
    const { backToListHandler, heading, buttonAction, onLeagueChange, initialLeagueData } = props

    const [league, setLeague] = useState(initialLeagueData);    



    const handleSubmit = (event) => {
        event.preventDefault();
        onLeagueChange(league);
    }


    const handleChange = (event) => {
        event.persist();
        const { name, type, value } = event.target
        setLeague({ ...league, [name]: Value(type, value) })
    }


    const Value = (type, value) => {
        return type === "number" ? +value : value
    }


    return (
        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h4>{heading}</h4>
            </div>
            <div className="card-body">

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            placeholder="name"
                            value={league.name}
                            onChange={handleChange}
                            className="form-control"
                        />

                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Country:
                        </label>
                        <input
                            type="text"
                            name="country"
                            id="country"
                            required
                            placeholder="country"
                            value={league.country}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Number of Teams:
                        </label>
                        <input
                            type="number"
                            name="numberOfTeams"
                            id="numberOfTeams"
                            min="1"
                            required
                            placeholder="Enter number of teams"
                            value={league.numberOfTeams}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>                    
                    <hr />                    
                    <hr />
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary btn-block"><strong>{buttonAction}</strong></button>
                    </div>
                    <hr />
                </form>
            </div>
            <div className="card-footer">
                <button onClick={backToListHandler} className="btn btn-primary btn-block"><strong>Back To League List</strong></button>
            </div>
        </div>
    );
}