import styled from "styled-components";

export const CardLayout = styled.div`
  position: relative;
  height: calc(100vh - 7.5rem);
  width: 100rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem 0rem;
  @media only screen and (max-width: 960px) {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
  }
  @media only screen and (max-width: 750px) {
    width: 92%;
  }

  .card {
    width: 70rem;
    position: relative;
    height: calc(100vh - 12.5rem);
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px rgba(0, 0, 0, 0.05);
    @media only screen and (max-width: 750px) {
      width: 100%;
    }
    @media only screen and (max-width: 650px) {
      box-shadow: none;
    }
  }

  .card::-webkit-scrollbar-track
  {
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    border-radius: 12px;
    background-color: #f8f8f8;
  }

  .card::-webkit-scrollbar
  {
    width: 5px;
    border-radius: 12px;
    background-color: #f8f8f8;
  }

  .card::-webkit-scrollbar-thumb
  {
    border-radius: 12px;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #003C68;
  }

  .join__img > img {
    width: 100%;
    height: 250px;
  }
  
  .join__content {
    padding-left: 2rem;
  }

  .join__title,
  .join__subTitle,
  .join__passage {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    color: var(--clr-black);
    margin: 1rem 0rem;
  }

  .join__title {
    font-size: 2.3rem;
    font-weight: 700;
    color: #003C68;
  }

  .join__subTitle {
    font-size: 1.7rem;
  }

  .join__passage {
    font-size: 1.5rem;
    color: #000000;
  }

  .join__btn {
    font-size: 1.6rem;
    border-radius: 25px;
    margin-bottom: 2rem;
  }

  .card__content {
    margin: 1rem 1.2rem;
    @media only screen and (max-width: 650px) {
      margin: 1rem 5px;
    }
  }

  .card__title {
    background-color: var(--clr-blue-2);
    color: #ffffff;
    padding: 1.2rem 2rem 1.2rem 2rem;
    font-size: 2rem;
    margin: 1rem 1.2rem;
    border-radius: 5px;
    @media only screen and (max-width: 650px) {
      margin: 1rem 5px;
    }
  }

  .card__subtitle {
    font-size: 1.8rem;
    margin: 2rem 0rem;

  }

 .btn-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
  }
  
  .card-btn {
    font-size: 1.6rem;
    border-radius: 25px;
    margin: 0.1rem;
    font-weight: 500;
  }
  
  .thumbsContainer{
    display: flex;
    flex-direction:row;
    flex-wrap: wrap;
    margin-top: 16px;
  }

  .thumb{
    display: inline-flex;
    border-radius:2px;
    border : 1px solid #eaeaea;
    margin-bottom: 8px;
    margin-right:8px;
    width: 100px;
    height: 100px;
    padding: 4px;
    box-sizing:border-box;
  }

  .thumbInner{
    display:flex;
    min-width:0px;
    overflow:hidden ;
  }

  .img{
    display: block;
    width: auto;
    height: 100%;
  }

  .thumbPadding {
    padding: 10px 0px;
  }

 .drop {
    font-size: 1.5rem;
    color: var(--clr-black);
  }

  .error {
    font-size: 1.3rem;
    color: red;
    margin-top: 8px;
  }
  
  .helper {
    font-size: 1.5rem;
  }

  .info {
    font-size: 1.3rem;
    color: blue;
    margin-top: 8px;
  }
  
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-right: 1rem;

 button {
  cursor: pointer;
  font-size: 1.7rem;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  padding: 1.2rem 0.5rem;
  margin-bottom: 8px;
 }

`;