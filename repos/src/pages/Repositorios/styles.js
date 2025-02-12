import styled from 'styled-components'
import {Link} from 'react-router-dom'

const color = {
    main: "#0d2636"
}

export const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #fff;
    height: 100vh;
`;

export const Container = styled.div`
    max-width: 700px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    padding: 0 30px;
    margin: 80px auto;
    position: relative;
`;

export const Owner = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #000;    
    padding: 30px 0;
    img {
        width: 150px;
        border-radius: 4px;
        margin: 2px 0;
    }
    h1 {
        font-size: 30px;
        color: ${color.main};;
        text-transform: uppercase;
    }
    p {
        font-size: 15px;
        margin-top: 5px;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }
`;

export const IssuesSelect = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    button {
        border: none;
        background: ${color.main};
        padding: 3px 7px;
        color: #fff;
        border-radius: 4px;
    }

`;

export const Backbtn = styled(Link)`
    border: none;
    position: absolute;
    left: 10px;
    top: 10px;
    background-color: transparent;
`;

export const IssuesList = styled.ul`
    list-style: none;
    padding-bottom: 15px;
    li {
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        color: #000;
        height: 70px;
        & + li {
            margin-top: 10px;
        }
        strong {
            & span {
                color: #fff;
                background: #333;
                padding: 2px 7px;
                border-radius: 5px;
                font-weight: 300;
                margin-left: 10px;
                text-transform: uppercase;
            }
        }
        a {
            text-decoration: none;
            color: #000;
            &:visited {
                color: #000;
            }
            &:hover {
                color: #444;
            }     
        }
        p {
            margin-left: 10px;
        }
        img {
            width: 44px;
            border-radius: 20%;
            margin-right: 15px;
            border: 1px solid ${color.main};;
        }
    }
    
`;

export const PageActions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    button {
        border: none;
        background: ${color.main};
        padding: 3px 7px;
        color: #fff;
        border-radius: 4px;

        &:disabled {
            cursor: not-allowed;
            opacity: 0.3;
        }
    }
`