import React, { useState } from 'react';


export const CoachForm = (props) => {
    const { backToListHandler, heading, buttonAction, onCoachChange, initialCoachData } = props

    const [coach, setCoach] = useState(initialCoachData);    



    const handleSubmit = (event) => {
        event.preventDefault();
        onCoachChange(coach);
    }


    const handleChange = (event) => {
        event.persist();
        const { name, type, value } = event.target

        setCoach({ ...coach, [name]: Value(type, value) })
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
                            value={coach.name}
                            onChange={handleChange}
                            className="form-control"
                        />

                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Location:
                        </label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            required
                            placeholder="location"
                            value={coach.location}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Age:
                        </label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            min="1"
                            required
                            placeholder="age"
                            value={coach.age}
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
                <button onClick={backToListHandler} className="btn btn-primary btn-block"><strong>Back To Coach List</strong></button>
            </div>
        </div>
    );
}