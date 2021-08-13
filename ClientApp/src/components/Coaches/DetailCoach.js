import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const DetailCoach = (props) => {
    const [coach, setCoach] = useState({});

    const apiUrl = `https://localhost:5001/api/coaches/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setCoach(result.data);
        };
        GetData();
    }, [apiUrl]);


    const backToListHandler = () => {
        props.history.replace({
            pathname: '/coachList'
        });

    }

    const deleteHandler = async (id) => {
        console.log(id);
        console.log("Click me Delete");
        props.history.replace({
            pathname: `/deleteCoach/${id}`
        });
    }

    return (

        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h3>Coach Detail</h3>
            </div>
            <div className="card-body">
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Name : </strong>{coach.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Location : </strong>{coach.location}</td>
                        </tr>
                        <tr>
                            <td><strong>Age : </strong>{coach.age}</td>
                        </tr>                        
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-outline-danger btn-block" onClick={() => deleteHandler(coach.coachId)} style={{ fontWeight: "bold" }}>
                    Delete
                </button>
                <button type="button" className="btn btn-outline-primary btn-block" onClick={backToListHandler} style={{ fontWeight: "bold" }}>
                    Back to List
                </button>
            </div >
        </div >

    );

}
