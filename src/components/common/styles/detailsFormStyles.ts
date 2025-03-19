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

interface FormProps {
    type?: string;
}

export const FormContainer = styled.div<FormProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1em 3em;
    font-size: 0.875rem;
    background-color: ${({ theme }) => theme.background};
    transition: background-color 0.3s ease;
    ${({ type }) => type === "room" && "border-radius: 0 0 1em 1em"};
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
    color: ${({ theme }) => theme.text};
    transition: color 0.3s ease;
    display: block;
    font-weight: 800;
`;
export const Input = styled.input`
    &[type='number']::-webkit-inner-spin-button, &[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    width: 100%;
    padding: .6em 0;
    border: none;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.background};
    transition: background-color 0.3s ease, color 0.3s ease;
    border-bottom: 2px solid #BEAD8E;
    outline: none;
`;
export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    gap: .6em;
    margin-top: 1em;
`;
export const CheckboxLabel = styled.label`
    font-size: 14px;
    color: ${({ theme }) => theme.text};
    transition: color 0.3s ease;
`;
export const Buttons = styled.div`
    display: flex;
    justify-content: center;
    gap: 2em;
    align-items: center;
`;
export const Button = styled.button<ButtonProps>`
    padding: .5em .7em;
    background-color: ${({ theme }) => theme.formButton};
    color: ${({ theme }) => theme.background};
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
        background-color: ${({ theme }) => theme.formButtonHover};
        color: #EBF1EF;
        box-shadow: 0px 4px 6px ${({ theme }) => theme.formButtonHoverShadow};
        transform: translateY(-2px);
    }
`;
export const Select = styled.select<SelectProps>`
    padding: 0.8em;
    font-size: 0.875rem;
    border: 1px solid ${({ theme }) => theme.formSelectBorder};
    border-radius: 0.4em;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease, border 0.3s ease;
    appearance: none;
    cursor: pointer;
    outline: none;

    &.Refund {
        color: ${({ theme }) => theme.formRefundColor};
        background-color: ${({ theme }) => theme.formRefundBgColor};
    }
    &.Booked {
        color: ${({ theme }) => theme.formBookedColor};
        background-color: ${({ theme }) => theme.formBookedBgColor};
    }
    &.Pending {
        color: ${({ theme }) => theme.formPendingColor};
        background-color: ${({ theme }) => theme.formPendingBgColor};
    }
    &.Cancelled {
        color: ${({ theme }) => theme.formCancelledColor};
        background-color: ${({ theme }) => theme.formCancelledBgColor};
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
    border: 1px solid ${({ theme }) => theme.formSelectBorder};
    border-radius: .5em;
    font-size: .8rem;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.background};
    resize: none;
    outline: none;
    transition: background-color 0.3s ease, color 0.3s ease, border 0.3s ease;
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
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.formSelectBorder};
    z-index: 1;
    overflow-y: auto;
    transition: background-color 0.3s ease, color 0.3s ease, border 0.3s ease;

    li {
        padding: .2em;
        cursor: pointer;
        &:hover {
            background-color: ${({ theme }) => theme.filterHover};;
        }
    }
`;
export const Error = styled.p`
    color: red;
`