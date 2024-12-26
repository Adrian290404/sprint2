import styled from 'styled-components'

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 1em;
    font-size: 0.875rem;
`
export const FormField = styled.div`
    margin-bottom: 1em;
`
export const TwoFields = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 1em;
`
export const Label = styled.label`
    color: #333;
    display: block;
    font-weight: 600;
`
export const Input = styled.input`
    width: 100%;
    padding: .6em;
    border: 1px solid #ccc;
    border-radius: .5em;
    outline: none;
`
export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    gap: .6em;
`
export const CheckboxLabel = styled.label`
    font-size: 14px;
    color: #333;
`
export const Buttons = styled.div`
    display: flex;
    justify-content: center;
    gap: 2em;
    align-items: center;
`
export const Icon = styled.div`
    cursor: pointer;
    transition: transform 0.2s ease;
    color: #9E9E9E;
    &:hover {
        transform: scale(1.05);
        transform: translateY(-2px);
        color: #616161;
    }
`
export const Button = styled.button`
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
    ${(props) => (props.bookings && "margin-top: 2em")};
    &:hover {
        background-color: #0056b3;
        color: #EBF1EF;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
    }
`
export const Select = styled.select`
    padding: 0.8em;
    font-size: 0.875rem;
    border: 1px solid #ddd;
    border-radius: 0.4em;
    background-color: #fff;
    color: #333;
    appearance: none;
    cursor: pointer;
    outline: none;

    ${({ $type }) => $type === "Refund" && `
        color: #E23428;
        background-color: #FFEDEC;
    `}
    ${({ $type }) => $type === "Booked" && `
        color: #5AD07A;
        background-color: #E8FFEE;
    `}
    ${({ $type }) => $type === "Pending" && `
        color: #6D6D6D;
        background-color: #E2E2E2;
    `}
    ${({ $type }) => $type === "Cancelled" && `
        color: #BEBEBE;
        background-color: #575757;
    `}
`
export const Container = styled.div`
    padding: 2em;
`