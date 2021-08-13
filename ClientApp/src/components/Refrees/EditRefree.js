import React, { useState, useEffect } from 'react';
import { RefreeForm } from '../Utilities/Forms/RefreeForm';
import axios from 'axios';



export const EditRefree = (props) => {
    const [refree, setRefree] = useState({})
    const [isLoading, setIsLoading] = useState(false)    


    const apiUrl = `https://localhost:5001/api/refrees/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setRefree(result.data);
            setIsLoading(true);           
        };
        GetData();
    }, [apiUrl, isLoading]);  


    const refreeEditHandler = (refree) => {
        axios.put(apiUrl, refree)
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
            {
                isLoading &&
                <>
                <RefreeForm
                    backToListHandler={backToListHandler}
                    heading="Refree Edit Form"                
                    buttonAction="Save"
                    onRefreeChange={refreeEditHandler}
                    initialRefreeData={refree}
                />
            </>
            }
        </>
    );
}