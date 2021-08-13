import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faBook } from '@fortawesome/free-solid-svg-icons';
import { SearchItem } from '../Utilities/Helpers/SearchItem';
import axios from 'axios';

export const TeamList = (props) => {
    const [teams, setTeams] = useState([])
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const teamUrl = `https://localhost:5001/api/teams`;


    const editHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/editTeam/${id}`
        });

    }

    const deleteHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/deleteTeam/${id}`
        });
    }


    const createHandler = () => {
        props.history.replace({
            pathname: '/createTeam'
        });
    }


    const detailHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/detailTeam/${id}`
        });
    }


    useEffect(() => {
        let onMount = true;
        axios.get(teamUrl)
            .then(res => {
                if (onMount) {
                    setTeams(res.data);
                    setIsLoading(true);
                }
            })
        return () => onMount = false;
    }, [teamUrl]);


    const filterHandler = (event) => {
        const { value } = event.target;
        setFilter(value)
    }


    const searchHandler = (event) => {
        event.preventDefault();
        console.log("filter : ", filter);
        if (filter !== "") {
            const searchApiUrl = `https://localhost:5001/api/teams/${filter}`;
            axios.get(searchApiUrl)
                .then(res => {
                    setTeams(res.data)
                });
        } else {
            axios.get(teamUrl)
                .then(res => {
                    setTeams(res.data)
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
                            <h4>List of Teams</h4>
                        </div>
                        <div className="card-body">
                            <SearchItem filterHandler={filterHandler} searchHandler={searchHandler} />
                            <br />
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>City</th>
                                        <th>Stadium</th>
                                        <th>Coach</th>
                                        <th>League</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        teams.map((team) => (

                                            <tr key={team.teamId}>
                                                <td>{team.name}</td>
                                                <td>{team.city}</td>
                                                <td>{team.stadium}</td>
                                                <td>{team.coach.name}</td>
                                                <td>{team.league.name}</td>
                                                <td>
                                                    <button onClick={() => editHandler(team.teamId)} className="btn btn-warning m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faEdit} /></button>
                                                    <button onClick={() => deleteHandler(team.teamId)} className="btn btn-danger m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faTrash} /></button>
                                                    <button onClick={() => detailHandler(team.teamId)} className="btn btn-primary m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faBook} /></button>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">
                            <button type="button" onClick={createHandler} className="btn btn-primary btn-block" style={{ fontWeight: "bold" }}>Create Team</button>
                        </div>
                    </div>
                </section>
            }
        </>
    );


}

