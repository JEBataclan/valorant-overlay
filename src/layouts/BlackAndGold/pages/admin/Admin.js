import { useEffect, useState } from 'react';
import openSocket from "socket.io-client";

import {
    Container,
    Backdrop,
    AdminContainer,
    TeamContainer,
    AgentContainer,
    SelectedAgent,
    AgentSelectionContainer,
    Agent,
    LockInButton,
    MiddleContainer,
    MapVetoContainer,
    MapContainer,
    Header,
    Bans,
    Pick,
    MainMap,
    Select,
    Option,
} from "./Admin.elements";

const socket = openSocket("http://localhost:8000", {
  transports: ["websocket"],
});

const Admin = () => {
    const [agents, setAgents] = useState();
    const [isFetched, setIsFetched] = useState(false);

    const [isMapVeto, setIsMapVeto] = useState(true);

    const [pickedAgents, setPickedAgents] = useState({
        blue: [
            {name: "", role: "", lockedIn: false},
            {name: "", role: "", lockedIn: false},
            {name: "", role: "", lockedIn: false},
            {name: "", role: "", lockedIn: false},
            {name: "", role: "", lockedIn: false},
        ],
        red: [
            {name: "", role: "", lockedIn: false},
            {name: "", role: "", lockedIn: false},
            {name: "", role: "", lockedIn: false},
            {name: "", role: "", lockedIn: false},
            {name: "", role: "", lockedIn: false},
        ],
    })
    
    const [vetoMaps, setVetoMaps] = useState({
        blue: {
            bans: ["", ""],
            pick: "",
        },
        red: {
            bans: ["", ""],
            pick: "",
        },
        mainMap: ""
    })

    useEffect(() => {
        getAgents();
    }, [])

    useEffect(() => {
        socket.emit("sendAgents", pickedAgents);
    }, [pickedAgents]);

    useEffect(() => {
        socket.emit("sendVetoMaps", vetoMaps);
    }, [vetoMaps]);
    
    const getAgents = () =>{
        fetch('agents.json' ,{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function(response){
            //console.log(response)
            return response.json();
        })
        .then(function(myJson) {
            //console.log(myJson);
            setAgents(myJson)
            setIsFetched(true);
        });
    }

    const handleSelectAgent = (e, agent, role, idx, team) => {
        setPickedAgents((previousAgents) => {
            let newAgents = Object.assign({}, previousAgents);
            newAgents[team][idx].name = agent;
            newAgents[team][idx].role = role;
            return newAgents;
        })
    }

    const handleLockIn = (idx, team) => {
        if (pickedAgents[team][idx].name === '') {
            alert ("You haven't Selected any agent on this bitch.");
        } else {
            setPickedAgents((previousAgents) => {
                let newAgents = Object.assign({}, previousAgents);
                newAgents[team][idx].lockedIn = true;
                return newAgents;
            })
        }
    }

    const handleVetoMapChange = (e, team, type, idx) => {
        let value = e.target.value;
        
        if (type === 'ban') {
            setVetoMaps((previousVetoMaps) => {
                let newVetoMaps = Object.assign({}, previousVetoMaps);
                newVetoMaps[team].bans[idx] = value;
                console.log(newVetoMaps)
                return newVetoMaps;
            })
        } else if (type === 'pick') {
            setVetoMaps((previousVetoMaps) => {
                let newVetoMaps = Object.assign({}, previousVetoMaps);
                newVetoMaps[team].pick = value;
                console.log(newVetoMaps)
                return newVetoMaps;
            })
        } else {
            setVetoMaps((previousVetoMaps) => {
                let newVetoMaps = Object.assign({}, previousVetoMaps);
                newVetoMaps.mainMap = value;
                console.log(newVetoMaps)
                return newVetoMaps;
            })
        }
    }

    return (
        isFetched && (
            <Container>
                <Backdrop/>
                <AdminContainer>
                    <TeamContainer team="blue">
                        {pickedAgents.blue.map((pick, pickIdx) => {
                            let imgURL = pick.name && require(`../../../../assets/agents/${pick.name}_icon.png`);
                            return (
                                <AgentContainer key={`blue_${pickIdx}`}>
                                    <LockInButton type="button" value="LOCK IN" disabled={pick.lockedIn} onClick={() => handleLockIn(pickIdx, 'blue')}/>
                                    <SelectedAgent imgURL={imgURL} lockedIn={pick.lockedIn}>
                                        <AgentSelectionContainer>
                                            {Object.keys(agents).map(key => {
                                                let imgURL = require(`../../../../assets/agents/${key}_icon.png`);
                                                return (
                                                    <Agent key={key} imgURL={imgURL} onClick={(e) => handleSelectAgent(e, key, agents[key].role, pickIdx, 'blue')}/>
                                                )
                                            })}
                                        </AgentSelectionContainer>
                                    </SelectedAgent>
                                </AgentContainer>
                            )
                        })}
                    </TeamContainer>

                    <MiddleContainer>
                        <MapVetoContainer>
                            <MapContainer team='blue'>
                                <Bans>
                                    <Header>Bans</Header>
                                    <Select name="maps" id="maps" onChange={(e) => handleVetoMapChange(e, 'blue', 'ban', 0)}>
                                        <Option value=""></Option>
                                        <Option value="Ascent">Ascent</Option>
                                        <Option value="Bind">Bind</Option>
                                        <Option value="Breeze">Breeze</Option>
                                        <Option value="Fracture">Fracture</Option>
                                        <Option value="Haven">Haven</Option>
                                        <Option value="Icebox">Icebox</Option>
                                        <Option value="Split">Split</Option>
                                    </Select>
                                    <Select name="maps" id="maps" onChange={(e) => handleVetoMapChange(e, 'blue', 'ban', 1)}>
                                        <Option value=""></Option>
                                        <Option value="Ascent">Ascent</Option>
                                        <Option value="Bind">Bind</Option>
                                        <Option value="Breeze">Breeze</Option>
                                        <Option value="Fracture">Fracture</Option>
                                        <Option value="Haven">Haven</Option>
                                        <Option value="Icebox">Icebox</Option>
                                        <Option value="Split">Split</Option>
                                    </Select>
                                </Bans>
                                <Pick>
                                    <Header>Pick</Header>
                                    <Select name="maps" id="maps" onChange={(e) => handleVetoMapChange(e, 'blue', 'pick')}>
                                        <Option value=""></Option>
                                        <Option value="Ascent">Ascent</Option>
                                        <Option value="Bind">Bind</Option>
                                        <Option value="Breeze">Breeze</Option>
                                        <Option value="Fracture">Fracture</Option>
                                        <Option value="Haven">Haven</Option>
                                        <Option value="Icebox">Icebox</Option>
                                        <Option value="Split">Split</Option>
                                    </Select>
                                </Pick>
                            </MapContainer>

                            <MainMap>
                                <Header>MAIN</Header>
                                <Select name="maps" id="maps" onChange={(e) => handleVetoMapChange(e, 'main', 'main', 0)}>
                                    <Option value=""></Option>
                                    <Option value="Ascent">Ascent</Option>
                                    <Option value="Bind">Bind</Option>
                                    <Option value="Breeze">Breeze</Option>
                                    <Option value="Fracture">Fracture</Option>
                                    <Option value="Haven">Haven</Option>
                                    <Option value="Icebox">Icebox</Option>
                                    <Option value="Split">Split</Option>
                                </Select>
                            </MainMap>
                            
                            <MapContainer team='red'>
                                <Bans>
                                    <Header>Bans</Header>
                                    <Select name="maps" id="maps" onChange={(e) => handleVetoMapChange(e, 'red', 'ban', 0)}>
                                        <Option value=""></Option>
                                        <Option value="Ascent">Ascent</Option>
                                        <Option value="Bind">Bind</Option>
                                        <Option value="Breeze">Breeze</Option>
                                        <Option value="Fracture">Fracture</Option>
                                        <Option value="Haven">Haven</Option>
                                        <Option value="Icebox">Icebox</Option>
                                        <Option value="Split">Split</Option>
                                    </Select>
                                    <Select name="maps" id="maps" onChange={(e) => handleVetoMapChange(e, 'red', 'ban', 1)}>
                                        <Option value=""></Option>
                                        <Option value="Ascent">Ascent</Option>
                                        <Option value="Bind">Bind</Option>
                                        <Option value="Breeze">Breeze</Option>
                                        <Option value="Fracture">Fracture</Option>
                                        <Option value="Haven">Haven</Option>
                                        <Option value="Icebox">Icebox</Option>
                                        <Option value="Split">Split</Option>
                                    </Select>
                                </Bans>
                                <Pick>
                                    <Header>Pick</Header>
                                    <Select name="maps" id="maps" onChange={(e) => handleVetoMapChange(e, 'red', 'pick')}>
                                        <Option value=""></Option>
                                        <Option value="Ascent">Ascent</Option>
                                        <Option value="Bind">Bind</Option>
                                        <Option value="Breeze">Breeze</Option>
                                        <Option value="Fracture">Fracture</Option>
                                        <Option value="Haven">Haven</Option>
                                        <Option value="Icebox">Icebox</Option>
                                        <Option value="Split">Split</Option>
                                    </Select>
                                </Pick>
                            </MapContainer>
                        </MapVetoContainer>
                        <button type="button" disabled={!isMapVeto} onClick={() => {
                            setIsMapVeto(false);
                            socket.emit('sendMapVetoConcluded', false);
                            socket.emit('sendStartTimer', true);
                        }}>PROCEED TO AGENT SELECTION</button>
                    </MiddleContainer>

                    <TeamContainer team="red">
                        {pickedAgents.red.map((pick, pickIdx) => {
                            let imgURL = pick.name && require(`../../../../assets/agents/${pick.name}_icon.png`);
                            return (
                                <AgentContainer key={`red_${pickIdx}`}>
                                    <LockInButton type="button" value="LOCK IN" disabled={pick.lockedIn} onClick={() => handleLockIn(pickIdx, 'red')}/>
                                    <SelectedAgent imgURL={imgURL} lockedIn={pick.lockedIn}>
                                        <AgentSelectionContainer>
                                            {Object.keys(agents).map(key => {
                                                let imgURL = require(`../../../../assets/agents/${key}_icon.png`);
                                                return (
                                                    <Agent key={key} imgURL={imgURL} onClick={(e) => handleSelectAgent(e, key, agents[key].role, pickIdx, 'red')}/>
                                                )
                                            })}
                                        </AgentSelectionContainer>
                                    </SelectedAgent>
                                </AgentContainer>
                            )
                        })}
                    </TeamContainer>
                </AdminContainer>
            </Container>
        )
    );
}

export default Admin;
