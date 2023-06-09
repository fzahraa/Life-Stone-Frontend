import React from "react";
import styled from "styled-components";
import { ButtonsWrapper } from "../../Shared/CardLayout";

const Buttons = ({ activeStep }) => {

  const steps = [
    "About",
    "Experience",
    "Resource",
    "Service",
    "Contact",
    "CoverPhoto",
  ];
  
  return (
    <Wrapper>
      <ButtonsWrapper>
        {activeStep === null ? null :
          <button
            className="btn active"
            id="show-on-mobile"
          >
            Step {activeStep + 1}
          </button>
        }
        {steps.map((label, index) => (
          <button
            key={label}
            id={activeStep === null ? "hide-on-mobile" : "hide-on-mobile"}
            className={index === activeStep ? "btn active" : "btn nonActive"}
          >
            {label}
          </button>
        ))}
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default Buttons;

const Wrapper = styled.div`
  .active {
    background-color: #003C68;
  }
  .nonActive {
    background-color: #003C68;
    opacity: 0.7;
  }
  .btn {
    color: white;
    width: 150px;
  }
  #show-on-mobile {
    display: none;
    @media only screen and (max-width: 960px) {
      display: block;
    }
  }
  #hide-on-mobile {
    @media only screen and (max-width: 960px) {
      display: none;
    }
  }
`;