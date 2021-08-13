import React, { useState } from 'react';


export const RefreeForm = (props) => {
    const { backToListHandler, heading, buttonAction, onRefreeChange, initialRefreeData } = props

    const [refree, setRefree] = useState(initialRefreeData);    



    const handleSubmit = (event) => {
        event.preventDefault();
        onRefreeChange(refree);
    }


    const handleChange = (event) => {
        event.persist();
        const { name, type, value } = event.target
        setRefree({ ...refree, [name]: type === "number" ? +value : value })
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
                            value={refree.name}
                            onChange={handleChange}
                            className="form-control"
                        />

                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Rank:
                        </label>
                        <input
                            type="text"
                            name="rank"
                            id="rank"
                            required
                            placeholder="rank"
                            value={refree.rank}
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
                            value={refree.location}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Total Number of Matches:
                        </label>
                        <input
                            type="number"
                            name="totalNumberOfMatches"
                            id="totalNumberOfMatches"
                            min="1"
                            required
                            placeholder="Enter number of teams"
                            value={refree.totalNumberOfMatches}
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
                <button onClick={backToListHandler} className="btn btn-primary btn-block"><strong>Back To Refree List</strong></button>
            </div>
        </div>
    );
}