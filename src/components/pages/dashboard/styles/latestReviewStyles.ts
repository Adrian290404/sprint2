import styled, { css } from "styled-components";

interface ButtonProps {
    check?: boolean;
    cross?: boolean;
    arrow?: boolean;
}
export const Container = styled.div`
    width: 100%;
    font-family: "Poppins", sans-serif;
    background-color: ${({ theme }) => theme.background};
    transition: background-color 0.3s ease;
    border-radius: 0.5em;
    margin-top: 2em;
    padding: 2em 5em 2em 2em;
`;
export const Title = styled.h2`
    color: ${({ theme }) => theme.paginationText};
    transition: color 0.3s ease;
    font-weight: 500;
    font-size: 1.25rem;
    margin-bottom: 1.5em;
`;
export const CardsContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 2em;
    position: relative;
`;
export const Card = styled.div`
    border: 1px solid ${({ theme }) => theme.cardBorder};
    transition: border 0.3s ease;
    border-radius: 0.8em;
    padding: 1.5em;
    width: 33%;
    &:hover {
        border: none;
        box-shadow: 0px 16px 30px ${({ theme }) => theme.kpiCardShadow};;
    }
`;
export const Text = styled.p`
    color: ${({ theme }) => theme.latestReviewText};
    transition: color 0.3s ease;
    font-weight: 500;
    font-size: 1rem;
`;
export const BottomContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2em;
`;
export const InfoContainer = styled.div`
    display: flex;
    gap: 1em;
    align-items: center;
`;
export const Image = styled.img`
    width: 56px;
    height: 56px;
    border-radius: 0.7em;
`;
export const Name = styled.h3`
    color: ${({ theme }) => theme.latestReviewName};
    transition: color 0.3s ease;
    font-size: 1rem;
    font-weight: 600;
`;
export const Time = styled.p`
    color: ${({ theme }) => theme.latestReviewTime};
    transition: color 0.3s ease;
    font-size: 0.875rem;
    font-weight: 500;
`;
export const Button = styled.button<ButtonProps>`
    border: none;
    background-color: transparent;
    cursor: pointer;
    ${(props) =>
        props.check &&
        css`
            color: ${({ theme }) => theme.checkIcon};
            margin-right: 0.8em;
        `}
    ${(props) =>
        props.cross &&
        css`
            color: ${({ theme }) => theme.kpiIcon};
        `}
    ${(props) =>
        props.arrow &&
        css`
            color: ${({ theme }) => theme.background};
            background-color: ${({ theme }) => theme.arrowBackground};
            padding: 0.5em 0.5em 0.3em 0.5em;
            border-radius: 0.8em;
            position: absolute;
            top: 50%;
            right: -7.6em;
            transform: translateY(-50%);
        `}
`;
