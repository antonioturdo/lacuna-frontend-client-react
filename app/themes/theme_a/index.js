import styled from 'styled-components';

const Block = styled.div`
    padding: 1.5rem 0;
    display: flex

    label {
        width: 40%;
        textAlign: right;
        paddingRight: 1rem            
    }

    input {
        border: 1px solid red; 
        borderRadius: 2px            
    }
`;

const Label = styled.label`
    width: 40%;
    textAlign: right;
    paddingRight: 1rem
`;

const Input = styled.input`
    border: 1px solid red; 
    borderRadius: 2px
`;

const theme = {
  BlockInput: {
    block: Block,
    input: Input
  }
}

export default theme