import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import React, { useState,useEffect } from 'react';
import {getAllFavorites,removeFavorite} from '../functions/actions';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Favorites() {

  const [favs, setFavs] = useState([]);

  useEffect(()=>{
    setFavs(getAllFavorites());
  },[])
  
  let divs = <div></div>;
  if(favs){
    divs = favs.map(m=>{
        return (
        <Col className="mb-3">
        <Container>
            <Row>
                <Col>
                    <img width="200" height="300" src={m.Poster}></img>
                <button className="img-button" onClick={()=>{
                        setFavs(removeFavorite(m));
                    }}>
                        <svg width="33" height="33" fill="red" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </Col>
            </Row>
            <Row>
                <Col> <Link to={'/search/' + m.imdbID}>{m.Title}</Link></Col>
            </Row>
        </Container>
        </Col>
        )
    })
  }
  return (
    <Container>
        <Row>
        <h1>Your Favorites</h1>
        <hr></hr>
        </Row>
        <Row>
        {divs}
        </Row>
    </Container>
  );
}

export default Favorites;
