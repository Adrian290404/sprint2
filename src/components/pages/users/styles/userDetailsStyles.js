import styled from "styled-components"

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f8f8f8;
`
export const CardContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background:#FFFFFF;
    box-shadow: 0px 16px 30px #00000014;
    border-radius: 1em;
    width: 90%;
    max-width: 35em;
`
export const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: .5em;
`
export const CardContent = styled.div`
    padding: 1em;
    width: 90%;
    position: relative;
`
export const EmployeeName = styled.h2`
    
    font-size: 1.5rem;
    color: #333333;
    margin-bottom: .5em;
    text-decoration: underline;
    text-align:center;
`
export const Agrupate = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
`
export const InfoGroup = styled.div`
    display: flex;
    margin-bottom: 1em;
    align-items: center;
    justify-content: start;
    gap: .5em;
    ${(props) => (props.center) && (
        "justify-content:center; text-align: center; margin: 2.5em 0 1em 0;"
    )};
`
export const InfoText = styled.span`
    color: #777777;
    font-size: 1rem;
`
export const Clock = styled.div`
    color: ${(props) => (props.active ? "green" : "red" )};
    margin-top: .2em;
`
export const GoBack = styled.div`
    position: absolute;
    top: 1em;
    left: 8%;
    cursor: pointer;
    transition: transform 0.2s ease;
    color: #9E9E9E;
    &:hover {
        transform: scale(1.05);
        transform: translateY(-2px);
        color: #616161;
    }
`
export const Options = styled.div`
    display: flex;
    position: absolute;
    gap: .8em;
    top: 1em;
    right: 6%;
`
export const Icon = styled.div`
    cursor: pointer;
    transition: transform 0.2s ease;
    color: ${(props) => (props.delete ? "#E57373" : "#64B5F6")};
    &:hover {
        transform: scale(1.05);
        transform: translateY(-2px);
        color: ${(props) => (props.delete ? "#D32F2F" : "#1976D2")};
    }
`