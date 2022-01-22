import styled from "styled-components";

export const Option = styled.option``;

export const Select = styled.select``;

export const Pick = styled.div``;

export const Bans = styled.div`
    display: flex;
    flex-direction: column;
`

export const Header = styled.div`
    color: white;
    font-size: 24px;
    font-weight: 900;
    text-align: center;
    text-transform: uppercase;
`

export const MainMap = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .5);
`;

export const MapContainer = styled.div`
    flex: 1;
    display: flex;
    flex-directon: row;
    justify-content: space-around;
    align-items: center;

    ${({ team }) => team === 'blue' ? (`
        background-color: rgba(85, 207, 194, .8);
    `) : (`
        background-color: rgba(219, 99, 99, .8);
        direction: rtl;
    `)}
`;

export const MapVetoContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 50vw;
    height: 60vh;
`;

export const MiddleContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    z-index: 1;
`;

export const LockInButton = styled.input`
    padding: 10px 10px;
    color: white;
    font-size: 20px;
    font-weight: 500;
    background-color: rgba(103, 245, 219, .8);

    &:hover {
        background-color: rgba(82, 204, 182, .8);
    }

    &:disabled,
    &[disabled]{
        background-color: rgba(103, 245, 219, .4);
    }

    border: none;
    outline: none;
`;

export const Agent = styled.div`
    width: 64px;
    height: 64px;
    ${({ imgURL }) => `
        background-image: url(${imgURL});
    `}
    background-size: cover;

    box-sizing: border-box;
    border: 1px solid white;
`

export const AgentSelectionContainer = styled.div`
    width: 576px;
    display: none;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: rgba(0, 0, 0, 0.2);

    margin-left: 64px;
`

export const SelectedAgent = styled.div`
    width: 64px;
    height: 64px;
    border: 1px solid white;

    ${({imgURL}) => `
        background-image: url(${imgURL});
    `}
    background-size: cover;

    ${({lockedIn}) => lockedIn === false && (`
        &:hover > ${AgentSelectionContainer} {
            display: flex;
        }
    `)}
`

export const AgentContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    gap: 10px;
`

export const TeamContainer = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 999;

    ${({ team }) => team === 'red' && (`
        right: 0;
        direction: rtl;

        & > ${AgentContainer} > ${SelectedAgent} > ${AgentSelectionContainer} {
            margin-left: 0px;
            margin-right: 64px;
        }
    `)}
`

export const AdminContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
`

export const Backdrop = styled.div`
    position: absolute;
    min-width: 100vw;
    min-height: 100vh;
    background-image: url(${require('../../../../assets/backdrop.jpg')});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(20px) grayscale(50%);
        pointer-events: none;
    }
`

export const Container = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    margin: 0px;
    padding: 0px;
    overflow-x: hidden;
    box-sizing: border-box;
`