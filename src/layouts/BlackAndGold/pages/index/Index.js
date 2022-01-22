import { useEffect, useState } from 'react';
import openSocket from "socket.io-client";

import {
    Container,
    IndexContainer,
    BarContainer,
    Bar,
    TeamInfoContainer,
    TeamInitials,
    TeamName,
    Score,
    GameInfo,
    TimerContainer,
    Timer,
    Round,
    Game,
    PlayersContainer,
    FlexChild,
    PlayerInfo,
    IconContainer,
    Agent,
    BottomInfo,
    Class,
    PlayerName,
    CenterMapVetoContainer,
    ShowMapVetoContainer,
    BannedMapsContainer,
    PickedMapContainer,
    MainMapContainer,
    MapHeader,
    BannedMap,
    PickedMap,
    MainMap,
    MapName,
} from "./Index.elements";

const socket = openSocket("http://localhost:8000", {
  transports: ["websocket"],
});

const TimerComponent = ({ startTimer }) => {
    const [seconds, setSeconds] = useState(85);
  
    useEffect(() => {
      const timer = seconds > 0 && setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds <= 0) clearInterval(timer);
      }, 1000);
      return () => clearInterval(timer);
    }, [seconds])
  
    useEffect(() => {
      setSeconds(85);
    }, [startTimer])

    
    if (startTimer) {
        return (<Timer id={`timer`}>{`:${seconds}`}</Timer>);
    } else {
        return (<Timer id={`timer`}>{`:00`}</Timer>);
    }
};

const Index = () => {
    const [data, setData] = useState();
    const [isFetched, setIsFetched] = useState(false);

    const [startTimer, setStartTimer] = useState(false);
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

    useEffect(()=>{
        getData();

        socket.on("receiveAgents", (pickedAgents) => {
            setPickedAgents(pickedAgents);
        });

        socket.on("receiveVetoMaps", (vetoMaps) => {
            setVetoMaps(vetoMaps);
        });

        socket.on("receiveMapVetoConcluded", (value) => {
            setIsMapVeto(value);
        })

        socket.on("receiveStartTimer", (value) => {
            setStartTimer(value);
        })
    },[])

    const getData=()=>{
        fetch('data.json'
        ,{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
             }
        }
        )
            .then(function(response){
                //console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                //console.log(myJson);
                setData(myJson)
                setIsFetched(true);
            });
    }

    return (
        isFetched && (
            <Container>
                <IndexContainer>
                    <BarContainer>
                        <Bar team="blue">
                            <TeamInfoContainer>
                                <TeamInitials>{data.blue.initials}</TeamInitials>
                                <TeamName>{data.blue.name}</TeamName>
                            </TeamInfoContainer>
                            <Score>{data.blue.score}</Score>
                        </Bar>

                        <GameInfo>
                            <TimerContainer>
                                <TimerComponent startTimer={startTimer}/>
                            </TimerContainer>
                            <Round id={"phase_round"}>{data.round}</Round>
                            <Game id={"phase_game"}>{`GAME ${data.game}`}</Game>
                        </GameInfo>

                        <Bar team="red">
                            <TeamInfoContainer>
                                <TeamInitials>{data.red.initials}</TeamInitials>
                                <TeamName>{data.red.name}</TeamName>
                            </TeamInfoContainer>
                            <Score>{data.red.score}</Score>
                        </Bar>
                    </BarContainer>

                    <PlayersContainer team='blue' isMapVeto={isMapVeto}>
                        {data.blue.IGNs.map((IGN, playerIdx) => {
                            let agentImgURL = pickedAgents.blue[playerIdx].name === '' ? '' : require(`../../../../assets/agents/${pickedAgents.blue[playerIdx].name}_icon.png`)
                            let roleImgURL = pickedAgents.blue[playerIdx].role === '' ? '' : require(`../../../../assets/roles/${pickedAgents.blue[playerIdx].role}ClassSymbol.png`)
                            return (
                                <FlexChild key={`blue_${playerIdx}`}>
                                    <PlayerInfo team="blue">
                                        <IconContainer><Agent imgURL={agentImgURL} lockedIn={pickedAgents.blue[playerIdx].lockedIn}/></IconContainer>
                                        <BottomInfo>
                                            <Class imgURL={roleImgURL}/>
                                            <PlayerName>{IGN}</PlayerName>
                                        </BottomInfo>
                                    </PlayerInfo>
                                </FlexChild>
                            )
                        })}
                    </PlayersContainer>

                    <PlayersContainer team='red' isMapVeto={isMapVeto}>
                        {data.red.IGNs.map((IGN, playerIdx) => {
                            let agentImgURL = pickedAgents.red[playerIdx].name === '' ? '' : require(`../../../../assets/agents/${pickedAgents.red[playerIdx].name}_icon.png`)
                            let roleImgURL = pickedAgents.red[playerIdx].role === '' ? '' : require(`../../../../assets/roles/${pickedAgents.red[playerIdx].role}ClassSymbol.png`)
                            return (
                                <FlexChild key={`red_${playerIdx}`}>
                                    <PlayerInfo team="red">
                                        <IconContainer><Agent imgURL={agentImgURL} lockedIn={pickedAgents.red[playerIdx].lockedIn}/></IconContainer>
                                        <BottomInfo>
                                            <Class imgURL={roleImgURL}/>
                                            <PlayerName>{IGN}</PlayerName>
                                        </BottomInfo>
                                    </PlayerInfo>
                                </FlexChild>
                            )
                        })}
                    </PlayersContainer>

                    <CenterMapVetoContainer>
                        <ShowMapVetoContainer isMapVeto={isMapVeto}>
                            <BannedMapsContainer team='bue' isMapVeto={isMapVeto}>
                                <MapHeader>BANS</MapHeader>
                                {vetoMaps.blue.bans.map((ban, idx) => {
                                    let mapImgURL = ban ? require(`../../../../assets/maps/${ban}.png`) : '';
                                    return (
                                        <BannedMap key={`blue_ban_${idx}`} imgURL={mapImgURL}><MapName>{ban}</MapName></BannedMap>
                                    )
                                })}
                            </BannedMapsContainer>
                            <PickedMapContainer team='blue' isMapVeto={isMapVeto}>
                                <MapHeader>PICK</MapHeader>
                                <PickedMap imgURL={vetoMaps.blue.pick ? require(`../../../../assets/maps/${vetoMaps.blue.pick}.png`) : ""}><MapName>{vetoMaps.blue.pick}</MapName></PickedMap>
                            </PickedMapContainer>
                            <MainMapContainer isMapVeto={isMapVeto}>
                                <MapHeader>ROUND MAP</MapHeader>
                                <MainMap imgURL={vetoMaps.mainMap ? require(`../../../../assets/maps/${vetoMaps.mainMap}.png`) : ""}><MapName>{vetoMaps.mainMap}</MapName></MainMap>
                            </MainMapContainer>
                            <PickedMapContainer team='red' isMapVeto={isMapVeto}>
                                <MapHeader>PICK</MapHeader>
                                <PickedMap imgURL={vetoMaps.red.pick ? require(`../../../../assets/maps/${vetoMaps.red.pick}.png`) : ""}><MapName>{vetoMaps.red.pick}</MapName></PickedMap>
                            </PickedMapContainer>
                            <BannedMapsContainer team='red' isMapVeto={isMapVeto}>
                                <MapHeader>BANS</MapHeader>
                                {vetoMaps.red.bans.map((ban, idx) => {
                                    let mapImgURL = ban ? require(`../../../../assets/maps/${ban}.png`) : '';
                                    return (
                                        <BannedMap key={`red_ban_${idx}`} imgURL={mapImgURL}><MapName>{ban}</MapName></BannedMap>
                                    )
                                })}
                            </BannedMapsContainer>
                        </ShowMapVetoContainer>
                    </CenterMapVetoContainer>
                </IndexContainer>
            </Container>
        )
    );
}

export default Index;
