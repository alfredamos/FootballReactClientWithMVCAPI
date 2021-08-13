import React, { useState, useEffect } from 'react';
import { CoachForm } from '../Utilities/Forms/CoachForm';
import axios from 'axios';



export const EditCoach = (props) => {
    const [coach, setCoach] = useState({})
    const [isLoading, setIsLoading] = useState(false)    


    const apiUrl = `https://localhost:5001/api/coaches/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setCoach(result.data);
            setIsLoading(true);            
        };
        GetData();
    }, [apiUrl, isLoading]);  


    const coachEditHandler = (coach) => {
        axios.put(apiUrl, coach)
            .then(res => {
                props.history.replace('/coachList')
            });
    }



    const backToListHandler = () => {
        props.history.replace({
            pathname: '/coachList'
        });

    }


    return (
        <>
            {
                isLoading &&
                <CoachForm
                    backToListHandler={backToListHandler}
                    heading="Coach Edit Form"                    
                    buttonAction="Save"
                    onCoachChange={coachEditHandler}
                    initialCoachData={coach}
                />
            }
        </>
    );
}