import styled from "styled-components";

interface MarkerProps {
    active?: boolean;
};

interface ContentProps {
    active?: boolean;
};

interface ImageProps {
    dark?: boolean;
}

export const Image = styled.img<ImageProps>`
    ${(props) => (props.dark && "filter: invert(1) hue-rotate(180deg)")};
`
export const Navbar = styled.div`
    padding-top: 1.5em;
`;
export const PageNavigation = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 1em;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: 0.1s ease-in-out;
    }
`;
export const Marker = styled.div<MarkerProps>`
    position: absolute;
    left: -.2em;
    background-color: ${(props) => (props.active ? "#E23428" : "transparent")};
    height: 80%;
    border-radius: 2em;
    padding: .3em;
    align-items: center;
`;
export const Content = styled.div<ContentProps>`
    padding: 1em 0 1em 2em ;
    display: flex;
    gap: 1em;
    width: 100%;
    color: ${(props) => (props.active ? "#E23428" : "#799283")};
    font: normal normal normal 18px/27px Poppins;
    letter-spacing: 0px;
    &:hover {
        color:${(props) => (props.active ? "rgb(141, 30, 22)" : "rgb(71, 85, 76)")};
    }
`;
export const UserContainer = styled.div`
    padding: 0 2em;
    width: 100%;
    text-align: center;
`;
export const UserContent = styled.div`
    padding: 3em 0 1em 0;
    background-color: #FFFFFF;
    width: 100%;
    box-shadow: 0px 1.25rem 1.875rem #00000014;
    border-radius: 0 0 1.5em 1.5em;
`;
export const UserImage = styled.img`
    width: 4.375rem;
    height: 4.375rem;
    margin-bottom: -35px;
`;
export const UserName = styled.h2`
    font-family: "Poppins", sans-serif;
    font-size: .9rem;
    font-weight: 400;
    letter-spacing: 0px;
    color: #393939;
`;
export const UserEmail = styled.h3`
    font-family: "Poppins", sans-serif;
    font-size: .6rem;
    font-weight: 300;
    letter-spacing: 0px;
    color: #B2B2B2;
    margin: 1em 0;
`;
export const EditButton = styled.button`
    background-color: #EBF1EF;
    color: #135846;
    font-family: "Poppins", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0px;
    padding: .5em 3.5em;
    border-radius: .8em;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: #135846;
        color: #EBF1EF;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
    }
`;
export const Footer = styled.footer`
    color: #799283;
    font-family: "Poppins", sans-serif;
    font-size: 0.55rem;
    font-weight: 300;
    padding: 4em 0 0 3em;
`;
export const FooterTitle = styled.footer`
    color: #212121;
    font-size: 0.775rem;
    font-weight: 600;
`;