import styled from "styled-components";

export const ContainerCardTransacao = styled.div`
    padding: 7px 0 15px 10px;
    margin-right: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 98%;
    white-space: normal;
    word-wrap: break-word;
    
    h1 {
        font-weight: bold;
        font-size: 16px;
    }
    
    h2 {
        font-weight: bold;
        font-size: 20px;
    }
    p {
        font-weight: normal;
        font-size: 16px;
        width: 350px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
