import React from 'react';
import {RefreeForm } from '../Utilities/Forms/RefreeForm';
import axios from 'axios';


const initialRefreeData = { name: '', rank: '', location: '', totalNumberOfMatches: ''};

export const CreateRefree = (props) => {    

    const apiUrl = `https://localhost:5001/api/refrees`;


    const refreeCreateHandler = (refree) => {
        axios.post(apiUrl, refree)
            .then(res => {
                props.history.replace('/refreeList')
            });
    }



    const backToListHandler = () => {
        props.history.replace({
            pathname: '/refreeList'
        });

    }

    
    return (
        <>
            <RefreeForm
                backToListHandler={backToListHandler}
                heading="Refree Create Form"                
                buttonAction="Create"
                onRefreeChange={refreeCreateHandler}
                initialRefreeData={initialRefreeData}
            />
        </>
    );
}