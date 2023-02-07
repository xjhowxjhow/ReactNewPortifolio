import React from 'react';
import styled from 'styled-components';



function Container(props) {


  const StyledContainer = styled.div`
      position: relative;
      top: 70px;
      width: 80%;
      height: 100%;
      margin: 0 auto;
      padding: 10px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      /* flex-wrap: wrap; */
      gap: 20px;

  `;

  return (
    <StyledContainer>
      {props.children}
    </StyledContainer>
  );

}

export default Container;