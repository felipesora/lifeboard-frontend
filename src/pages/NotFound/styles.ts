import styled from "styled-components";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--cor-fundo);
  color: var(--cor-principal);
  text-align: center;
  padding: 0 20px;
`;

export const NotFoundImage = styled.img`
  width: 250px;
  max-width: 80%;
  margin-bottom: 2rem;
`;

export const NotFoundTitle = styled.h1`
  font-size: 6rem;
  margin: 0;
  font-weight: bold;
`;

export const NotFoundSubtitle = styled.h2`
  font-size: 2rem;
  margin: 0.5rem 0 1rem;
`;

export const NotFoundText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

export const NotFoundButton = styled.button`
  border: none;
  cursor: pointer;
  width: 180px;
  font-size: 1.2rem;
  text-decoration: none;
  color: white;
  background-color: var(--cor-principal);
  font-family: var(--fonte-principal);
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #263238;
    transform: translateY(-2px);
  }
`;