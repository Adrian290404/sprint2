import styled, { css } from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    gap: 1.5em;
`;
export const IconContainer = styled.div`
    background-color: #ffedec;
    color: #e23428;
    padding: 1em 1em 0.7em 1em;
    border-radius: 0.4em;
    display: flex;
    align-items: center;
    margin-right: 1.5em;
`;
export const Card = styled.div`
    width: 25%;
    background-color: #ffffff;
    display: flex;
    padding: 1.5em;
    align-items: center;
    border-radius: 0.4em;
    font-family: "Poppins", sans-serif;

    &:hover {
        box-shadow: 0px 16px 30px #00000014;

        ${IconContainer} {
          background-color: #e23428;
          color: #ffffff;
        }
    }
`;

export const CardNumber = styled.div`
  color: #393939;
  font-weight: 600;
  font-size: 1.875rem;
`;

export const CardText = styled.div`
  color: #787878;
  font-size: 0.875rem;
  font-weight: 300;
`;