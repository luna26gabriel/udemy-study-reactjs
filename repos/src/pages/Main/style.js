import styled, {keyframes, css} from 'styled-components'

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
        border-bottom: 1px solid ${props => props.error ? 'red' : '#333'} ;
        border-radius: 0;
    }
`;

//Animation
const animate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const SubmitButton = styled.button.attrs(props =>({
    type: 'submit',
    disabled: props.loading
}))`
    height: 28px;
    width: 28px;
    display: block;
    background: #333 !important;
    border: none;

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.4;
    }

    ${props => props.loading && (
        css`
            svg{
                animation: ${animate} 2s linear infinite;
            }
        `
    )}
`;

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`
    border: none;
`

export const List = styled.ul`
    list-style: upper-roman;
    padding: 0 10px;

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;     
        padding: 5px 0;
        & svg {
            color: #333;
        }
        & + li {
            border-top: 1px dotted #ccc;
        }
        & a:hover {
            color: #aaa;
            resize: 1.5;
        }
        & a:visited {
            color: #333;
        }
        & span {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    }
`