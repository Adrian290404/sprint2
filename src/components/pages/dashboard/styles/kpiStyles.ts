import styled, { css } from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    gap: 1.5em;
`;
export const IconContainer = styled.div`
    background-color: ${({ theme }) => theme.kpiIconBackground};
    color: ${({ theme }) => theme.kpiIcon};
    padding: 1em 1em 0.7em 1em;
    border-radius: 0.4em;
    display: flex;
    align-items: center;
    margin-right: 1.5em;
    transition: color 0.3s ease, background-color 0.3s ease;
`;
export const Card = styled.div`
    width: 25%;
    background-color: ${({ theme }) => theme.background};
    transition: background-color 0.3s ease;
    display: flex;
    padding: 1.5em;
    align-items: center;
    border-radius: 0.4em;
    font-family: "Poppins", sans-serif;
    &:hover {
        box-shadow: 0px 16px 30px ${({ theme }) => theme.kpiCardShadow};
        ${IconContainer} {
            background-color: ${({ theme }) => theme.kpiIcon};
            color: ${({ theme }) => theme.background};
        }
    }
`;
export const CardNumber = styled.div`
    color: ${({ theme }) => theme.kpiCardNumber};
    font-weight: 600;
    font-size: 1.875rem;
    transition: color 0.3s ease;
`;
export const CardText = styled.div`
    color: ${({ theme }) => theme.kpiCardText};
    font-size: 0.875rem;
    font-weight: 300;
    transition: color 0.3s ease;
`;