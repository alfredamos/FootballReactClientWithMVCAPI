import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const DetailRefree = (props) => {
    const [refree, setRefree] = useState({});

    const apiUrl = `https://localhost:5001/api/refrees/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setRefree(result.data);
        };
        GetData();
    }, [apiUrl]);


    const backToListHandler = () => {
        props.history.replace({
            pathname: '/refreeList'
        });

    }

    const deleteHandler = async (id) => {
        console.log(id);
        console.log("Click me Delete");
        props.history.replace({
            pathname: `/deleteRefree/${id}`
        });
    }

    return (

        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h3>Refree Detail</h3>
            </div>
            <div className="card-body">
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Name : </strong>{refree.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Rank : </strong>{refree.rank}</td>
                        </tr>
                        <tr>
                            <td><strong>Location : </strong>{refree.location}</td>
                        </tr>
                        <tr>
                            <td><strong>Total Number of Matches : </strong>{refree.totalNumberOfMatches}</td>
                        </tr>                        
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-outline-danger btn-block" onClick={() => deleteHandler(refree.refreeId)} style={{ fontWeight: "bold" }}>
                    Delete
                </button>
                <button type="button" className="btn btn-outline-primary btn-block" onClick={backToListHandler} style={{ fontWeight: "bold" }}>
                    Back to List
                </button>
            </div >
        </div >

    );

}
