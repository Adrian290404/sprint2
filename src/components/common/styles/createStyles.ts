import styled from "styled-components";

interface AgrupateProps {
    default?: boolean;
};

interface SelectProps {
    create?: boolean;
};

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    font-family: "Poppins", sans-serif;
    position: relative;
`;
export const Content = styled.div`
    align-items: center;
    justify-content: center;
    max-width: 35em;
    width: 90%;
    margin: 0 auto;
    background-color: #FFFFFF;
    box-shadow: 0px 16px 30px #00000014;
    border-radius: 1em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
export const Head = styled.div`
    border-bottom: 3px solid #BEAD8E;
    display: flex;
    gap: 2em;
    align-items: center;
    justify-content: center;
    padding: 1em 0 .7em 0;
`;
export const GoBack = styled.div`
    cursor: pointer;
    transition: transform 0.2s ease;
    color: rgb(92, 92, 92);
    &:hover {
        transform: scale(1.05);
        transform: translateY(-2px);
        color: rgb(0, 0, 0);
    }
`;
export const Title = styled.h1`
    margin-bottom: .3em;
    color: #333;
    text-align: center;
    font-family: "Playfair Display", serif;
`;
export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .6em;
    padding: 2em;
`;
export const Agrupate = styled.div<AgrupateProps>`
    display: flex;
    justify-content: ${(props) => (props.default ? "space-between" : "start")};
    gap: 1em;
    align-items: end;
`;
export const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
`;
export const Default = styled.div`
    cursor: pointer;
    display: flex;
`;
export const Label = styled.label`
    color: #333;
    display: block;
    font-weight: 600;
`;
export const Input = styled.input`
    &[type='number']::-webkit-inner-spin-button, &[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    width: 100%;
    padding: .6em 0;
    border: none;
    border-bottom: 2px solid #BEAD8E;
    outline: none;
`;
export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;     
    gap: 0.5em;             
    margin-top: 1em;        
`;

export const CustomCheckbox = styled.input.attrs({ type: "checkbox" })`
    appearance: none;
    -webkit-appearance: none;

    width: 18px;
    height: 18px;
    border: 2px solid #BEAD8E;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    transition: background-color 0.2s, border-color 0.2s;

    &:hover {
        border-color: #9c8a70;
    }

    &:checked {
        background-color: #BEAD8E;
        border-color: #BEAD8E;
    }

    &:checked::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 5px;
        width: 3px;
        height: 7px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
`;
export const Button = styled.button`
    padding: 1em;
    font-size: 1rem;
    background-color: #BEAD8E;
    color: white;
    border: none;
    border-radius: .5em;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 2em;
    &:hover {
        background-color:rgb(139, 127, 103);
    }
`;
export const Select = styled.select<SelectProps>`
    padding: 0.8em;
    font-size: 0.875rem;
    border: 1px solid #ddd;
    background-color: #fff;
    color: #333;
    appearance: none;
    cursor: pointer;
    outline: none;

    &:focus {
        border-color: #BEAD8E;
        box-shadow: 0 0 5px rgba(0, #BEAD8E, 0.5);
    }

    border: none;
    border-bottom: 3px solid #BEAD8E;

`;
export const TextArea = styled.textarea`
    width: 100%;
    font-family: "Poppins", sans-serif;
    min-height: 8em;
    padding: .7em;
    border: 1px solid #ddd;
    border-radius: .5em;
    font-size: .8rem;
    color: #333;
    resize: none;
    outline: none;
    &:focus {
        border-color: #BEAD8E;
        box-shadow: 0 0 5px rgba(0, #BEAD8E, 0.5);
    }
`;
export const Error = styled.p`
    color: red;
`;
export const AutocompleteContainer = styled.div`
    position: relative;
`;
export const SuggestionsList = styled.ul`
    position: absolute;
    top: 2em;
    left: 0;
    right: 0;
    max-height: 14em;
    margin: 0;
    padding: 0;
    list-style: none;
    background-color: #fff;
    border: 1px solid #ccc;
    z-index: 1;
    overflow-y: auto;

    li {
        padding: .2em;
        cursor: pointer;
        &:hover {
            background-color: #f2f2f2;
        }
    }
`;