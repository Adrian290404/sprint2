import styled from 'styled-components';

interface ButtonProps {
    bookings?: boolean;
};

interface SelectProps {
    Refund?: boolean;
    Booked?: boolean;
    Pending?: boolean;
    Cancelled?: boolean;
}

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1em 3em;
    font-size: 0.875rem;
`;
export const FormField = styled.div`
    margin-bottom: 1em;
`;
export const TwoFields = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 1em;
    gap: 2em;
    & > div {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
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
    gap: .6em;
`;
export const CheckboxLabel = styled.label`
    font-size: 14px;
    color: #333;
`;
export const Buttons = styled.div`
    display: flex;
    justify-content: center;
    gap: 2em;
    align-items: center;
`;
export const Icon = styled.div`
    cursor: pointer;
    transition: transform 0.2s ease;
    color: #9E9E9E;
    &:hover {
        transform: scale(1.05);
        transform: translateY(-2px);
        color: #616161;
    }
`;
export const Button = styled.button<ButtonProps>`
    padding: .5em .7em;
    background-color: #007bff;
    color: #FFFFFF;
    font-family: "Poppins", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0px;
    border-radius: .8em;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: .5em;
    ${(props) => props.bookings && "margin-top: 2em"};
    &:hover {
        background-color: #0056b3;
        color: #EBF1EF;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
    }
`;
export const Select = styled.select<SelectProps>`
    padding: 0.8em;
    font-size: 0.875rem;
    border: 1px solid #ddd;
    border-radius: 0.4em;
    background-color: #fff;
    color: #333;
    appearance: none;
    cursor: pointer;
    outline: none;

    &.Refund {
        color: #E23428;
        background-color: #FFEDEC;
    }
    &.Booked {
        color: #5AD07A;
        background-color: #E8FFEE;
    }
    &.Pending {
        color: #6D6D6D;
        background-color: #E2E2E2;
    }
    &.Cancelled {
        color: #BEBEBE;
        background-color: #575757;
    }
`;
export const Container = styled.div`
    padding: 2em;
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
export const Error = styled.p`
    color: red;
`