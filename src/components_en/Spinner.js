import styled from "styled-components";

function Spinner() {
  return (
    <Wrapper>
        <div className="loadingSpinner"></div>
    </Wrapper>
  );
}
export default Spinner;

const Wrapper = styled.div`

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

.loadingSpinner {
  width: 50px;
  height: 50px;
  border: 4px solid;
  border-color: blue transparent blue transparent;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;