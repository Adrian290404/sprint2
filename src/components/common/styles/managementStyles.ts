import styled from "styled-components";

interface ItemProps {
    isSelected: boolean;
};

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    font-weight: 400;
`;
export const List = styled.ul`
    display: flex;
    list-style-type: none;
    margin-bottom: 2em;
`;
export const Item = styled.li<ItemProps>`
    padding: .6em 2em;
    cursor: pointer;
    transition: color 0.3s ease;
    ${({ isSelected, theme }) => (isSelected ? `border-bottom: 1px solid ${theme.filterActive}; color: ${theme.filterActive}` : `border-bottom: 1px solid ${theme.filterBorder}; color: ${theme.filterInactive}`)};
    &:hover{
        background-color: ${({ theme }) => theme.filterHover};
        color: ${({ theme }) => theme.filterActive};
        border-radius: 1em 1em 0 0;
    }
`;
export const Create = styled.button`
    color: #FFFFFF;
    background-color:rgb(24, 109, 86);
    font-weight: 500;
    padding: .8em 2.5em;
    border: none;
    border-radius: 1em;
    cursor: pointer;
    margin-right: 1em;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #0f4d3d;
        transition: background-color 0.3s ease;
    }
`;
export const Filter = styled.select`
    background-color: ${({ theme }) => theme.background};
    padding: .8em 2.5em;
    border-radius: 1em;
    appearance: none;
    color: ${({ theme }) => theme.filterActive};
    border: 1px solid ${({ theme }) => theme.filterActive};
    outline: none;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
`;