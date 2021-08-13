import React from 'react';
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { CoachList } from "./components/Coaches/CoachList";
import { CreateCoach } from "./components/Coaches/CreateCoach";
import { EditCoach } from "./components/Coaches/EditCoach";
import { DeleteCoach } from "./components/Coaches/DeleteCoach";
import { DetailCoach } from "./components/Coaches/DetailCoach";

import { LeagueList } from "./components/Leagues/LeagueList";
import { CreateLeague } from "./components/Leagues/CreateLeague";
import { EditLeague } from "./components/Leagues/EditLeague";
import { DeleteLeague } from "./components/Leagues/DeleteLeague";
import { DetailLeague } from "./components/Leagues/DetailLeague";

import { MatchList } from "./components/Matches/MatchList";
import { CreateMatch } from "./components/Matches/CreateMatch";
import { EditMatch } from "./components/Matches/EditMatch";
import { DeleteMatch } from "./components/Matches/DeleteMatch";
import { DetailMatch } from "./components/Matches/DetailMatch";

import { RefreeList } from "./components/Refrees/RefreeList";
import { CreateRefree } from "./components/Refrees/CreateRefree";
import { EditRefree } from "./components/Refrees/EditRefree";
import { DeleteRefree } from "./components/Refrees/DeleteRefree";
import { DetailRefree } from "./components/Refrees/DetailRefree";

import { TeamList } from "./components/Teams/TeamList";
import { CreateTeam } from "./components/Teams/CreateTeam";
import { EditTeam } from "./components/Teams/EditTeam";
import { DeleteTeam } from "./components/Teams/DeleteTeam";
import { DetailTeam } from "./components/Teams/DetailTeam";


import "./custom.css";

function App() {
    return (
        <Layout>
            <Route path="/coachList" component={CoachList} />
            <Route path="/createCoach" component={CreateCoach} />
            <Route path="/deleteCoach/:id" component={DeleteCoach} />
            <Route path="/detailCoach/:id" component={DetailCoach} />
            <Route path="/editCoach/:id" component={EditCoach} />

            <Route path="/leagueList" component={LeagueList} />
            <Route path="/createLeague" component={CreateLeague} />
            <Route path="/deleteLeague/:id" component={DeleteLeague} />
            <Route path="/detailLeague/:id" component={DetailLeague} />
            <Route path="/editLeague/:id" component={EditLeague} />

            <Route path="/" exact component={MatchList} />
            <Route path="/createMatch" component={CreateMatch} />
            <Route path="/deleteMatch/:id" component={DeleteMatch} />
            <Route path="/detailMatch/:id" component={DetailMatch} />
            <Route path="/editMatch/:id" component={EditMatch} />

            <Route path="/refreeList" component={RefreeList} />
            <Route path="/createRefree" component={CreateRefree} />
            <Route path="/deleteRefree/:id" component={DeleteRefree} />
            <Route path="/detailRefree/:id" component={DetailRefree} />
            <Route path="/editRefree/:id" component={EditRefree} />

            <Route path="/teamList" component={TeamList} />
            <Route path="/createTeam" component={CreateTeam} />
            <Route path="/deleteTeam/:id" component={DeleteTeam} />
            <Route path="/detailTeam/:id" component={DetailTeam} />
            <Route path="/editTeam/:id" component={EditTeam} />

        </Layout>
    );
}

export default App;
