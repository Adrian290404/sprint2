import styled from 'styled-components';

export const Container = styled.div`
    background-color: #f8f8f8;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    position: relative;
`;
export const Content = styled.div`
    width: 90%;
    max-width: 40em;
    border-radius: 1em;
    box-shadow: 0px 16px 30px #00000014;
    background-color: #FFFFFF;
    font-family: "Poppins", sans-serif;
    color: #333;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
export const ImageContainer = styled.div`
    position: relative;
`;
export const Image = styled.img`
    width: 100%;
    height: 40vh;
    object-fit: cover;
    border-radius: 1em 1em 0 0;
`;
export const ImageInformation = styled.img`
    width: 120px;
    height: 120px;
    position: absolute;
    top: .5em;
    left: .5em;
`;
export const Price = styled.p`
    display: inline;
    font-weight: bold;
    color: black;
    font-size: 1.2rem;
    background-color: #FFFFFF;
    color: #BEAD8E;
    border-radius: .6em .6em 0 0;
    padding: .5em 1em;
    position: absolute;
    bottom: 0;
    right: 1em;
`;
export const Small = styled.span`
    font-size: .6rem;
    color: #222;
`;
export const Details = styled.div`
    font-size: 1.2rem;
`;
export const Head = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .8em 1em;
    border-bottom: 4px solid #BEAD8E;
`;
export const GoBack = styled.div`
    cursor: pointer;
    transition: transform 0.2s ease;
    &:hover {
        transform: scale(1.05);
        transform: translateY(-2px);
    }
`;
export const Title = styled.h1`
    font-size: 2rem;
    font-family: "Playfair Display", serif;
    color:#222;
    text-align: center;
    font-weight: bold;
    margin-bottom: .3em;
`;
export const Options = styled.div`
    display: flex;
    gap: .8em;
`;

interface IconProps {
    delete?: boolean;
};

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
    padding: .3em 2.5em .3em .5em;
    vertical-align: top;
`;
export const TdValue = styled.td<TdProps>`
    border-bottom: ${(props) => (props.withoutBorder ? "none" : "2px solid #BEAD8E")};
    padding: 8px;
    vertical-align: top;
`;
export const Info = styled.span`
    font-weight: 600;
    color: #000;
    white-space: nowrap;  
`;