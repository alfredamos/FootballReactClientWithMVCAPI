import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faBook } from '@fortawesome/free-solid-svg-icons';
import { SearchItem } from '../Utilities/Helpers/SearchItem';
import axios from 'axios';

export const RefreeList = (props) => {
    const [refrees, setRefrees] = useState([])
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const customerUrl = `https://localhost:5001/api/refrees`;


    const editHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/editRefree/${id}`
        });

    }

    const deleteHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/deleteRefree/${id}`
        });
    }


    const createHandler = () => {
        props.history.replace({
            pathname: '/createRefree'
        });
    }


    const detailHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/detailRefree/${id}`
        });
    }


    useEffect(() => {
        let onMount = true;
        axios.get(customerUrl)
            .then(res => {
                if (onMount) {
                    setRefrees(res.data);
                    setIsLoading(true);
                }
            })
        return () => onMount = false;
    }, [customerUrl]);


    const filterHandler = (event) => {
        const { value } = event.target;
        setFilter(value)
    }


    const searchHandler = (event) => {
        event.preventDefault();
        console.log("filter : ", filter);
        if (filter !== "") {
            const searchApiUrl = `https://localhost:5001/api/refrees/${filter}`;
            axios.get(searchApiUrl)
                .then(res => {
                    setRefrees(res.data)
                });
        } else {
            axios.get(customerUrl)
                .then(res => {
                    setRefrees(res.data)
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
                            <h4>List of Refrees</h4>
                        </div>
                        <div className="card-body">
                            <SearchItem filterHandler={filterHandler} searchHandler={searchHandler} />
                            <br />
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>                                        
                                        <th>Name</th>
                                        <th>Rank</th>
                                        <th>Location</th>
                                        <th>Total Number of Matches</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        refrees.map((refree) => (

                                            <tr key={refree.refreeId}>                                                
                                                <td>{refree.name}</td>
                                                <td>{refree.rank}</td>
                                                <td>{refree.location}</td>
                                                <td>{refree.totalNumberOfMatches}</td>                                                
                                                <td>
                                                    <button onClick={() => editHandler(refree.refreeId)} className="btn btn-warning m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faEdit} /></button>
                                                    <button onClick={() => deleteHandler(refree.refreeId)} className="btn btn-danger m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faTrash} /></button>
                                                    <button onClick={() => detailHandler(refree.refreeId)} className="btn btn-primary m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faBook} /></button>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">
                            <button type="button" onClick={createHandler} className="btn btn-primary btn-block" style={{ fontWeight: "bold" }}>Create Refree</button>
                        </div>
                    </div>
                </section>
            }
        </>
    );


}

