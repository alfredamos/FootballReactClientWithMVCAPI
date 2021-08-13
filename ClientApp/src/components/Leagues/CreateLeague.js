import React, { useState } from 'react';
import {LeagueForm } from '../Utilities/Forms/LeagueForm';
import axios from 'axios';


const initialLeaguerData = { name: '', country: '', numberOfTeams: ''};

export const CreateLeague = (props) => {    

    const apiUrl = `https://localhost:5001/api/leagues`;


    const leagueCreateHandler = (league) => {
        axios.post(apiUrl, league)
            .then(res => {
                props.history.replace('/leagueList')
            });
    }



    const backToListHandler = () => {
        props.history.replace({
            pathname: '/leagueList'
        });

    }


    return (
        <>
            <LeagueForm
                backToListHandler={backToListHandler}
                heading="League Create Form"                
                buttonAction="Create"
                onLeagueChange={leagueCreateHandler}
                initialLeagueData={initialLeaguerData}
            />
        </>
    );
}