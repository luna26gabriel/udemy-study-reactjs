import styled from 'styled-components'

export const Container = styled.div`
    color: #000;
    background: #fff;
    padding: 40px;
    margin: 60px 40px;

    h1 svg {
        margin-right: 20px;
    }
`;

export const Form = styled.form`
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    input {
        flex: 1;
        padding: 5px;
        border: none;
        border-bottom: 1px solid #333;
        border-radius: 0;
    }
`;

export const SubmitButton = styled.button.attrs({
    type: 'submit'
})`
    height: 28px;
    width: 28px;
    display: block;
    background: #333 !important;
    border: none;
`;