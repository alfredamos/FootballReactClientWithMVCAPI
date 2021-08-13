import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const DetailLeague = (props) => {
    const [league, setLeague] = useState({});

    const apiUrl = `https://localhost:5001/api/leagues/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setLeague(result.data);
        };
        GetData();
    }, [apiUrl]);


    const backToListHandler = () => {
        props.history.replace({
            pathname: '/leagueList'
        });

    }

    const deleteHandler = async (id) => {
        console.log(id);
        console.log("Click me Delete");
        props.history.replace({
            pathname: `/deleteLeague/${id}`
        });
    }

    return (

        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h3>Customer Detail</h3>
            </div>
            <div className="card-body">
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Name : </strong>{league.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Country : </strong>{league.country}</td>
                        </tr>
                        <tr>
                            <td><strong>Number of Teams : </strong>{league.numberOfTeams}</td>
                        </tr>                        
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-outline-danger btn-block" onClick={() => deleteHandler(league.leagueId)} style={{ fontWeight: "bold" }}>
                    Delete
                </button>
                <button type="button" className="btn btn-outline-primary btn-block" onClick={backToListHandler} style={{ fontWeight: "bold" }}>
                    Back to List
                </button>
            </div >
        </div >

    );

}
