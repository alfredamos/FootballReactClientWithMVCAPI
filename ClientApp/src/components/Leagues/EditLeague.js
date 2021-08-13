import React, { useState, useEffect } from 'react';
import { LeagueForm } from '../Utilities/Forms/LeagueForm';
import axios from 'axios';



export const EditLeague = (props) => {
    const [league, setLeague] = useState({})
    const [isLoading, setIsLoading] = useState(false)    


    const apiUrl = `https://localhost:5001/api/leagues/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setLeague(result.data);
            setIsLoading(true);            
        };
        GetData();
    }, [apiUrl, isLoading]);  


    const leagueEditHandler = (league) => {
        axios.put(apiUrl, league)
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
            {
                isLoading &&
                <LeagueForm
                    backToListHandler={backToListHandler}
                    heading="Customer Edit Form"                    
                    buttonAction="Save"
                    onLeagueChange={leagueEditHandler}
                    initialLeagueData={league}
                />
            }
        </>
    );
}