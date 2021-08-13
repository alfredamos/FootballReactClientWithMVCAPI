import React, { useState, useEffect } from "react";
import { TeamForm } from "../Utilities/Forms/TeamForm";
import TeamUtility from "./TeamUtility";
import axios from "axios";

export const EditTeam = (props) => {
  const [coaches, setCoaches] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [team, setTeam] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const idOfTeam = props.match.params.id;
  const coachApiUrl = `https://localhost:5001/api/coaches`;
  const leagueApiUrl = `https://localhost:5001/api/leagues`;
  const teamApiUrl = `https://localhost:5001/api/teams/${idOfTeam}`;

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

  useEffect(() => {
    const GetData = async () => {
      const result = await axios(teamApiUrl);
      setTeam(result.data);
      setIsLoading(true);
    };
    GetData();
  }, [teamApiUrl, isLoading]);

  const teamEditHandler = (team) => {   
    axios.put(teamApiUrl, team).then((res) => {
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
      {isLoading && (
        <TeamForm
          backToListHandler={backToListHandler}
          heading="Team Edit Form"
          buttonAction="Save"
          onTeamChange={teamEditHandler}
          initialTeamData={team}
          coaches={coaches}
          leagues={leagues}          
        />
      )}
    </>
  );
};
