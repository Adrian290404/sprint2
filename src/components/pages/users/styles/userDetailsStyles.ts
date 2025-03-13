import styled from "styled-components";

interface IconProps {
    delete?: boolean;
};

interface InfoGroupProps {
    center?: boolean;
};

interface ClockProps {
    active: boolean;
};

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f8f8f8;
`;
export const CardContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em 0;
    background: #FFFFFF;
    box-shadow: 0px 16px 30px #00000014;
    border-radius: 1em;
    width: 90%;
    max-width: 35em;
    font-family: "Poppins", sans-serif;
    color: #333;
`;
export const Head = styled.div`
    display: flex;
`;
export const ImageContainer = styled.div`
    display: flex;
    justify-content: end;
    flex: 1;
    gap: 2em;
`;
export const GoBack = styled.div`
    cursor: pointer;
    transition: transform 0.2s ease;
    &:hover {
        transform: scale(1.05);
        transform: translateY(-2px);
    }
`;
export const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: .5em;
`;
export const NameContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 1em;
`;
export const EmployeeName = styled.h2`
    font-size: 2rem;
    color: #222;
    font-family: "Playfair Display", serif;
`;
export const JobDesk = styled.p`
    font-size: 1rem;
    color: #222;
`;
export const Options = styled.div`
    display: flex;
    flex-direction: row;
    gap: .8em;
`;
export const Icon = styled.div<IconProps>`
    cursor: pointer;
    transition: transform 0.2s ease;
    &:hover {
        transform: scale(1.05);
        transform: translateY(-2px);
        color: ${(props) => (props.delete ? "#D32F2F" : "#1976D2")};
    }
`;
export const Description = styled.div`
    padding: 1em 2em;
`;
export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
`;

interface TdProps{
    withoutBorder?: boolean
}

export const TdLabel = styled.td<TdProps>`
    border-bottom: ${(props) => (props.withoutBorder ? "none" : "2px solid #BEAD8E")};
    padding: .3em .5em .3em .5em;
    vertical-align: top;
`;
export const TdValue = styled.td<TdProps>`
    border-bottom: ${(props) => (props.withoutBorder ? "none" : "2px solid #BEAD8E")};
    padding: .3em;
    vertical-align: top;
`;
export const Info = styled.span`
    font-weight: 600;
    color: #000;
    white-space: nowrap;  
`;