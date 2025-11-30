import styled from 'styled-components';

export const PageLayout = styled.div`
  display: flex;
  gap: 40px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px;
//   padding-top: 120px;
`;

export const FormSection = styled.div`
  flex: 1.5;
  h1 {
    font-size: 32px;
    margin-top: 0;
    margin-bottom: 30px;
  }
`;

export const SummarySection = styled.div`
  flex: 1;
  position: sticky;
  top: 120px;
  height: fit-content;
`;

export const FormGroup = styled.div`
  margin-bottom: 40px;
`;

export const Title = styled.h2`
  font-size: 22px;
  border-bottom: 2px solid #f1f1f1;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

export const PaymentMethods = styled.div`
  display: flex;
  gap: 20px;
  label {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;