import styled, { keyframes } from 'styled-components';
import redCircle from '../../../assets/redCircle.png'

interface SubTitleContainerProps {
    active?: boolean;
};

const fadeInScale = keyframes`
    from {
        opacity: 0;
        transform: scale(0.5);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.background};
    transition: background-color 0.3s ease;
`;
export const Left = styled.div`
    display: flex;
    justify-content: start;
    margin-left: 2em;
    align-items: center;
`;
export const Right = styled.div`
    display: flex;
    justify-content: end;
    gap: 2em;
    margin-right: 2em;
`;
export const Title = styled.h1`
    font-family: "Poppins", sans-serif;
    font-size: 1.75rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    transition: color 0.3s ease;
`;
export const TitleContainer = styled.div`
    margin-left: 3em;
`;
export const SubTitleContainer = styled.div<SubTitleContainerProps>`
    color: ${({ theme }) => theme.subtitle};
    transition: color 0.3s ease;
    font-weight: 500;
    ${(props) => (props.active ? "display: flex" : "display: none")};
`;
export const Page = styled.p`
    color: ${({ theme }) => theme.pageInformation};
    transition: color 0.3s ease;
`;
export const Notification = styled.div`
    position: absolute;
    top: -0.3em;
    right: -0.6em;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center; 
    justify-content: center;
    text-align: center;
    background-image: url(${redCircle});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    font-family: "Poppins", sans-serif;
    border-radius: 50%;
    animation: ${fadeInScale} 2s ease-in;
`;