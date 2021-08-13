import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faBook } from '@fortawesome/free-solid-svg-icons';
import { SearchItem } from '../Utilities/Helpers/SearchItem';
import axios from 'axios';

export const LeagueList = (props) => {
    const [leagues, setLeagues] = useState([])
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const leagueUrl = `https://localhost:5001/api/leagues`;


    const editHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/editLeague/${id}`
        });

    }

    const deleteHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/deleteLeague/${id}`
        });
    }


    const createHandler = () => {
        props.history.replace({
            pathname: '/createLeague'
        });
    }


    const detailHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/detailLeague/${id}`
        });
    }


    useEffect(() => {
        let onMount = true;
        axios.get(leagueUrl)
            .then(res => {
                if (onMount) {
                    setLeagues(res.data);
                    setIsLoading(true);
                }
            })
        return () => onMount = false;
    }, [leagueUrl]);


    const filterHandler = (event) => {
        const { value } = event.target;
        setFilter(value)
    }


    const searchHandler = (event) => {
        event.preventDefault();
        console.log("filter : ", filter);
        if (filter !== "") {
            const searchApiUrl = `https://localhost:5001/api/leagues/${filter}`;
            axios.get(searchApiUrl)
                .then(res => {
                    setLeagues(res.data)
                });
        } else {
            axios.get(leagueUrl)
                .then(res => {
                    setLeagues(res.data)
                });
        }
    }


    return (
        <>
            {
                isLoading &&
                <section>
                    <div className="border">
                        <div className="card-header text-center">
                            <h4>List of Leagues</h4>
                        </div>
                        <div className="card-body">
                            <SearchItem filterHandler={filterHandler} searchHandler={searchHandler} />
                            <br />
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>                                        
                                        <th>Name</th>
                                        <th>Country</th>
                                        <th>Number of Teams</th>                                        
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        leagues.map((league) => (

                                            <tr key={league.leagueId}>                                                
                                                <td>{league.name}</td>
                                                <td>{league.country}</td>
                                                <td>{league.numberOfTeams}</td>                                                
                                                <td>
                                                    <button onClick={() => editHandler(league.leagueId)} className="btn btn-warning m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faEdit} /></button>
                                                    <button onClick={() => deleteHandler(league.leagueId)} className="btn btn-danger m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faTrash} /></button>
                                                    <button onClick={() => detailHandler(league.leagueId)} className="btn btn-primary m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faBook} /></button>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">
                            <button type="button" onClick={createHandler} className="btn btn-primary btn-block" style={{ fontWeight: "bold" }}>Create League</button>
                        </div>
                    </div>
                </section>
            }
        </>
    );


}

