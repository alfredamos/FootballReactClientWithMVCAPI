import React, { useState, useEffect } from "react";
import { MatchForm } from "../Utilities/Forms/MatchForm";
import MatchUtility from "./MatchUtility";
import axios from "axios";

export const EditMatch = (props) => {
  const [refrees, setRefrees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [match, setMatch] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const idOfMatch = props.match.params.id;
  const refreeApiUrl = `https://localhost:5001/api/refrees`;
  const teamApiUrl = `https://localhost:5001/api/teams`;
  const matchApiUrl = `https://localhost:5001/api/matches/${idOfMatch}`;

  useEffect(() => {
    const GetData = async () => {
      const result = await axios(refreeApiUrl);
      setRefrees(result.data);
    };
    GetData();
  }, [refreeApiUrl]);

  useEffect(() => {
    const GetData = async () => {
      const result = await axios(teamApiUrl);
      setTeams(result.data);
    };
    GetData();
  }, [teamApiUrl]);

  useEffect(() => {
    const GetData = async () => {
      const result = await axios(matchApiUrl);
      setMatch(result.data);
      setIsLoading(true);
    };
    GetData();
  }, [matchApiUrl, isLoading]);

  const matchEditHandler = (match) => {    
    axios.put(matchApiUrl, match).then((res) => {
      props.history.replace("/");
    });
  };

  const backToListHandler = () => {
    props.history.replace({
      pathname: "/",
    });
  };

  return (
    <>
      {isLoading && (
        <MatchForm
          backToListHandler={backToListHandler}
          heading="Match Edit Form"
          buttonAction="Save"
          onMatchChange={matchEditHandler}
          initialMatchData={match}
          refrees={refrees}
          teams={teams}          
        />
      )}
    </>
  );
};
