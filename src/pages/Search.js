import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import {useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Star from '../components/Star';

import {addFavorite,getFavorite, removeFavorite} from '../functions/actions';

function Search() {

  const [searchTitle, setSearchTitle] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [result, setResult] = useState(null);
  const [inFavs, setInFavs] = useState(false);
  let searchTitleInput = null;
  const {id} = useParams()
  useEffect(()=>{
    if(id){
        searchForMovie(id);
    }
  },[])

  async function searchForMovie(id){
    let qId = id ? `i=${id}&` : '';
    const response = await fetch(`https://www.omdbapi.com/?${qId}t=${searchTitle}&apikey=59283398&y=${searchYear}`);
    const data = await response.json();
    console.log(data)
    setResult(data);
    setInFavs(!!getFavorite(data.imdbID));
  }

  let genres = '';
  let favButton = '';
  let stars = [];

  if(result && result.Response !== 'False'){
    if(result.Genre){
        genres =  result.Genre.split(',').map((g)=>{
        return <Badge key={g} pill bg="secondary">
                {g}
            </Badge>
        });
    }
    if(result.imdbRating && result.imdbRating != 'N/A'){
        stars = Math.trunc(result.imdbRating /2);
        if(stars >= 0)
            stars = [...Array(stars).keys()].map(()=><Star></Star>);
    }
    let empty = 5-stars.length;
    for(let i =0; i < empty; i++){
        stars.push(<Star empty={true}></Star>)
    }
    
    let favText = '';
    if(inFavs){
      favText = 'Remove from Favorites';
    } else{
      favText = 'Add to Favorites';
    }
    favButton = <Button variant="primary" onClick={()=>{
      if(inFavs){
        removeFavorite(result)
      } else {
        addFavorite(result);
      }
      setInFavs(!inFavs);
    }}>{favText}</Button>
  }
  return (
    <>
      <Container>
          <Row className="p-4">
            <Col className="p-4" >   
            <div style={{border: "1px solid black", padding: '20px'}}>   
            <Form onSubmit={(e)=>{
              e.preventDefault();
              searchForMovie();
            }}>
           
                <h2>Search</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label></Form.Label>
                
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Movie</Form.Label>
                  <Form.Control 
                  ref={(input) => { searchTitleInput = input; }} 
                  value={searchTitle} 
                  onChange={(e)=>{
                    setSearchTitle(e.target.value);
                  }}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Release Year</Form.Label>
                  <Form.Control onChange={(e)=>{
                    setSearchYear(e.target.value);
                  }}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Search
                </Button>
            </Form>
            </div>
          </Col>
            <Col className="p-4" >
              <h2>Results</h2>
              <hr></hr>
              {result && result.Response === 'False' ? 'No Movie Found' : ''}
              {!result || result.Response === 'False' ? '' : 
              <Container>
               <Row>
                  <Col>
                  {result.Poster !== 'N/A' ? <img src={result.Poster}></img> : '' } 
                  </Col>
                  <Col>
                  <h2>{result.Title} ({result.Year})</h2>
                  <h3>
                     {stars}
                  </h3><br/>
                  <h6>Director: {result.Director}</h6>
                  <h6>Runtime: {result.Runtime}</h6>
                  <h6>Genres: {genres}</h6>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col >
                  {result.Plot}
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <Button variant="secondary" onClick={()=>{
                    setResult(null);
                    setSearchTitle('');
                    setSearchYear('');
                    searchTitleInput.focus();

                  }}>Clear</Button>
                  </Col>
                  <Col>

                  {favButton}
                  </Col>
                </Row>
              </Container>
            }
            </Col>
          </Row>

        </Container>

    </>
  );
}

export default Search;
