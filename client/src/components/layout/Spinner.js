import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  a {
    color: #ee4b5e !important;
    text-decoration: none;
  }
  a:hover {
    color: #ffffff !important;
    text-decoration: none;
  }

  .text-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-size: 4em;
    font-weight: 700;
    color: #ee4b5e;
  }

  .subtitle {
    font-size: 40px;
    font-weight: 700;
    color: #1fa9d6;
  }
  .isi {
    font-size: 15px;
    text-align: center;
    margin: 30px;
    padding: 20px;
    color: white;
  }
  .buttons {
    margin: 30px;
    font-weight: 700;
    border: 2px solid #ee4b5e;
    text-decoration: none;
    padding: 15px;
    text-transform: uppercase;
    color: #ee4b5e;
    border-radius: 26px;
    transition: all 0.2s ease-in-out;
    display: inline-block;

    &:hover {
      background-color: #ee4b5e;
      color: white;
      transition: all 0.2s ease-in-out;
    }
  }
`;

const Spinner = ({path = "login"}) => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
              setCount((prevValue) => --prevValue);  
        }, 1000);
        count === 0 && navigate(`/${path}`, {
            state: location.pathnfame,
        });
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);
  return (
    <Wrapper>
      <div className="text-wrapper">
        <div className="title" data-content={404}>
          403 - ACCESS DENIED
        </div>
        <div className="subtitle">
          Oops, You don't have permission to access this page.
        </div>
        <div className="isi">
          A web server may return a 403 Forbidden HTTP status code in response
          to a request from a client for a web page or resource to indicate that
          the server can be reached and understood the request, but refuses to
          take any further action. Status code 403 responses are the result of
          the web server being configured to deny access, for some reason, to
          the requested resource by the client.
        </div>
        <h1 className="Text-center">Redirecting you in {count} seconds</h1>
        <div className="buttons">
          <Link to="/login">
            <a className="button" href="https://www.brodroid.com">
              Go to homepage
            </a>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Spinner;
