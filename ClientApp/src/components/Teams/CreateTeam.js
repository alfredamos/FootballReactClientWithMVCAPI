import React, { useState, useEffect } from "react";
import { TeamForm } from "../Utilities/Forms/TeamForm";
import TeamUtility from "./TeamUtility";
import axios from "axios";

const initialTeamData = {
  name: "",
  city: "",
  stadium: "",
  coachId:0,
  leagueId: 0,
};

export const CreateTeam = (props) => {
  const [coaches, setCoaches] = useState([]);
  const [leagues, setLeagues] = useState([]);

  const coachApiUrl = `https://localhost:5001/api/coaches`;
  const leagueApiUrl = `https://localhost:5001/api/leagues`;
  const teamApiUrl = `https://localhost:5001/api/teams`;

  useEffect(() => {
    const GetData = async () => {
      const result = await axios(coachApiUrl);
      setCoaches(result.data);
    };
    GetData();
  }, [coachApiUrl]);

  useEffect(() => {
    const GetData = async () => {
      const result = await axios(leagueApiUrl);
      setLeagues(result.data);
    };
    GetData();
  }, [leagueApiUrl]);

    const teamCreateHandler = (team) => {      
      axios.post(teamApiUrl, team).then((res) => {
      props.history.replace("/teamList");
    });
  };

  const backToListHandler = () => {
    props.history.replace({
      pathname: "/teamList",
    });
  };

  return (
    <>
      <TeamForm
        backToListHandler={backToListHandler}
        heading="Team Create Form"
        buttonAction="Create"
        onTeamChange={teamCreateHandler}
        initialTeamData={initialTeamData}
        coaches={coaches}
        leagues={leagues}        
      />
    </>
  );
};
