import React, { useState, useEffect } from "react";
import { MatchForm } from "../Utilities/Forms/MatchForm";
import MatchUtility from "./MatchUtility";
import axios from "axios";

const initialMatchData = {
  homeTeamId: "",
  awayTeamId: "",
  homeTeamScore: "",
  awayTeamScore: "",
  venue: "",
  location: "",
  refreeId: "",
};

export const CreateMatch = (props) => {
  const [refrees, setRefrees] = useState([]);
  const [teams, setTeams] = useState([]);

  const matchApiUrl = `https://localhost:5001/api/matches`;
  const refreeApiUrl = `https://localhost:5001/api/refrees`;
  const teamApiUrl = `https://localhost:5001/api/teams`;

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

  const matchCreateHandler = (match) => {   
    axios.post(matchApiUrl, match).then((res) => {
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
      <MatchForm
        backToListHandler={backToListHandler}
        heading="Match Create Form"
        buttonAction="Create"
        onMatchChange={matchCreateHandler}
        initialMatchData={initialMatchData}
        refrees={refrees}
        teams={teams}        
      />
    </>
  );
};
