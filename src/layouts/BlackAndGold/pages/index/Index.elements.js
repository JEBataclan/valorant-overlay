import styled from "styled-components";

export const MainMap = styled.div`
    width: 320px;
    height: 180px;
    box-sizing: border-box;
    border: 5px solid #BBA151;

    ${({ imgURL }) => imgURL && (`
        background-image: url(${imgURL});
        background-size: cover;
        background-repeat: no-repeat;
    `)}
`

export const PickedMap = styled.div`
    width: 320px;
    height: 180px;
    box-sizing: border-box;
    border: 5px solid #BBA151;

    ${({ imgURL }) => imgURL && (`
        background-image: url(${imgURL});
        background-size: cover;
        background-repeat: no-repeat;
    `)}
`

export const BannedMap = styled.div`
    width: 320px;
    height: 180px;
    box-sizing: border-box;
    border: 5px solid #BBA151;

    ${({ imgURL }) => imgURL && (`
        background-image: url(${imgURL});
        background-size: cover;
        background-repeat: no-repeat;
    `)}
`

export const MapHeader = styled.div`
    color: white;
    font-family: Impact;
    font-size: 36px;
    font-weight: 900;
    letter-spacing: 8px;
    text-align: center;
`

export const MainMapContainer = styled.div`
    display: flex;
    flex-direction: column;
    & > * {
        margin-bottom: 20px;
    }

    ${({ isMapVeto }) => !isMapVeto && (`
        & > ${MainMap} {
            transition: 2s;
            width: 800px;
            height: 450px;
        }
    `)}
`

export const PickedMapContainer = styled.div`
    display: flex;
    flex-direction: column;
    & > * {
        margin-bottom: 20px;
    }

    ${({ isMapVeto }) => !isMapVeto && (`
        & > ${PickedMap} {
            transition: 2s;
            width: 0px;
            border: 0px solid #BBA151;
        }

        & > ${MapHeader} {
            transition: 2s;
            width: 0px;
            font-size: 0px;
        }
    `)}
`

export const BannedMapsContainer = styled.div`
    display: flex;
    flex-direction: column;
    transition: 2s;

    & > * {
        margin-bottom: 20px;
    }

    ${({ isMapVeto }) => !isMapVeto && (`
        & > ${BannedMap} {
            transition: 2s;
            width: 0px;
            border: 0px solid #BBA151;
        }

        & > ${MapHeader} {
            transition: 2s;
            width: 0px;
            font-size: 0px;
        }
    `)}
`

export const ShowMapVetoContainer = styled.div`
    ${({ isMapVeto }) => isMapVeto ? (`
        width: 1920px;
        height: 930px;
    `) : (`
        width: 800px;
        height: 600px;
    `)}

    display: flex;
    flex-directon: row;
    justify-content: space-evenly;
    align-items: center;

    transition: 3s;
`

export const CenterMapVetoContainer = styled.div`
    position: absolute;
    width: 1920px;
    height: 930px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PlayerName = styled.div`
    flex: 1;
    color: white;
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
`

export const Class = styled.div`
    width: 25px;
    height: 25px;
    ${({ imgURL }) => imgURL !== '' && (`
        background-image: url(${imgURL});
    `)}
    background-size: contain;
    background-repeat: no-repeat;
`

export const BottomInfo = styled.div`
    display: flex;
    align-self: stretch;
    align-items: center;
    background: linear-gradient(90deg, rgba(9,12,13,1) 0%, rgba(0,0,0,0) 100%);
    gap: 20px;
    
`

export const Agent = styled.div`
    height: 132.4px;
    width: 132.4px;
    ${({ imgURL }) => imgURL !== '' && (`
        background-image: url(${imgURL});
    `)}
    background-repeat: no-repeat;
    background-size: contain;

    ${({ lockedIn }) => lockedIn ? (`
        opacity: 1;
    `) : (`
        opacity: 0.5;
    `)}
`;

export const IconContainer = styled.div`
    flex: 1;
    display: flex;
    align-self: stretch;
`;

export const PlayerInfo = styled.div`
    width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: linear-gradient(90deg, rgba(187,161,81,1) 0%, rgba(0,212,255,0) 100%);

`

export const FlexChild = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const PlayersContainer = styled.div`
    position: absolute;
    top: 150px;
    ${({isMapVeto, team}) => isMapVeto ? team === "blue" ? `left: -600px;` : `right: -600px;` : team === "blue" ? `left: 0;` : `right: 0;`}
    width: 500px;
    height: 890px;

    transition: 3s;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-top: 20px;
    & > * {
        margin-bottom: 20px;
    }

    background-color: rgba(18,23,26,.9);

    
    ${({team}) => team === "red" && (`
        & > ${FlexChild} > ${PlayerInfo} {
            direction: rtl !important;
            background: linear-gradient(-90deg, rgba(187,161,81,1) 0%, rgba(0,212,255,0) 100%) !important;
        }

        & > ${FlexChild} > ${PlayerInfo} > ${BottomInfo} {
            background: linear-gradient(-90deg, rgba(9,12,13,1) 0%, rgba(0,0,0,0) 100%);
        }

        & > ${FlexChild} > ${PlayerInfo} > ${IconContainer} > ${Agent} {
            transform: scaleX(-1);
        }
    `)}
`

export const Game = styled.div`
    font-size: 14px;
    margin-bottom: 5px;
`;
export const Round = styled.div`
    font-size: 20px;
`;

export const Timer = styled.div`
    font-size: 60px;
`;

export const TimerContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
`

export const GameInfo = styled.div`
    width: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background-color: #BBA151;
`;

export const Score = styled.div`
    color: #D4AF37;
    font-size: 100px;
    font-weight: 500;
    font: 500 100px 'Montserrat', sans-serif;
`

export const TeamName = styled.div`
    font: 600 12px "Montserrat", sans-serif;
    letter-spacing: 14px;
    text-transform: uppercase;
`

export const TeamInitials = styled.div`
    font-family: Akira Expanded;
    font-size: 65px;
    line-height: 65px;
    text-transform: uppercase;
`

export const TeamInfoContainer = styled.div`
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    color: #D4AF37;
`

export const Bar = styled.div`
    width: 45%;
    height: inherit;
    background: linear-gradient(90deg, rgba(9,12,13,1) 0%, rgba(18,23,26,1) 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    & > ${Score} {
        margin-right: 50px;
    }

    & > ${TeamInfoContainer} {
        margin-left: 40px;
    }

    ${({ team }) => team === 'red' && (`
        direction: rtl;
        background: linear-gradient(-90deg, rgba(9,12,13,1) 0%, rgba(18,23,26,1) 100%);

        & > ${TeamInfoContainer} {
            margin-right: 40px;
        }

        & > ${Score} {
            margin-left: 50px;
        }
    `)}
`

export const BarContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 150px;
    width: 100%;
    text-transform: uppercase;
`

export const IndexContainer = styled.div`
`

export const Container = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    margin: 0px;
    padding: 0px;
    overflow-x: hidden;
    box-sizing: border-box;
    background-color: black;
`