import styled from "styled-components";

export const Footer = () => {
  return (
    <Wrapper>
      <ul>
        <li>Legale mentions</li>
        <li>About us</li>
        <li>Contact</li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  margin-top: 2em;
  background-color: #2c3038;
  height: 300px;
`;
