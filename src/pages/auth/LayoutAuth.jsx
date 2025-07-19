import { Paper } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled(Paper)`
  display: flex;
  width: 900px;
  min-height: 500px;
  // height: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;
const ImageSection = styled.div`
  flex: 1;
  background: url(${(props) => props.imaageurl}) no-repeat center center;
  background-size: cover;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;
const FormSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LayoutAuth = ({ children ,coverImage }) => {
    return (
        <Wrapper>
            <Container>
                <ImageSection imaageurl={coverImage} />
                <FormSection>
                    {children}
                </FormSection>
            </Container>
        </Wrapper>)
};

export default LayoutAuth;