import styled from "styled-components";

interface ButtonProps {
    controller?: boolean;
    isSelected?: boolean;
};

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: "Poppins", sans-serif;
    font-size: .8rem;
    font-weight: 400;
    color: ${({ theme }) => theme.text};
    align-items: center;
    margin-top: 2em;
`;
export const Button = styled.button<ButtonProps>`
    padding: ${(props) => (props.controller ? "1em 2em" : "1em 1.2em")};
    margin: 0.2em;
    border: ${(props) => (props.controller ? `1px solid ${props.theme.filterActive}` : "none")};
    border-radius: 1em;
    background: ${(props) => (props.isSelected ? props.theme.filterActive : props.theme.background)};
    color: ${(props) => (props.controller ? props.theme.filterActive : (props.isSelected ? props.theme.background : props.theme.text))};
    cursor: pointer;
`;
export const Input = styled.input`
    &[type='number']::-webkit-inner-spin-button, &[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    padding: 1em 0;
    margin: 0.2em;
    border: none;
    border-radius: 1em;
    background: ${({ theme }) => theme.background};;
    cursor: pointer;
    text-align: center;
    font-family: "Poppins", sans-serif;
    font-size: 0.8rem;
    font-weight: 400;

    &:focus {
        outline: none;
    }
`;
export const Content = styled.div`
    display: "flex";
    align-items: "center";
    gap: 0.5em;
`;