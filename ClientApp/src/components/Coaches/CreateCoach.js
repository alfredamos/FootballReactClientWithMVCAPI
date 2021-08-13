import React, { useState } from 'react';
import {CoachForm } from '../Utilities/Forms/CoachForm';
import axios from 'axios';


const initialCoachData = { name: '', location: '', age: ''};

export const CreateCoach = (props) => {    

    const apiUrl = `https://localhost:5001/api/coaches`;


    const coachCreateHandler = (coach) => {        
        axios.post(apiUrl, coach)
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
            <CoachForm
                backToListHandler={backToListHandler}
                heading="Coach Create Form"                
                buttonAction="Create"
                onCoachChange={coachCreateHandler}
                initialCoachData={initialCoachData}
            />
        </>
    );
}