import React, { useState, useEffect } from 'react'
import { Card } from "react-bootstrap";
import PokeForm from './PokeForm';

import './styles/App.css';
const MainPage = () => {

    const [pokemonImage, setPokemonImage] = useState(); //Imagen del pokemon
    const [pokemonID] = useState(Math.floor(Math.random() * 800) + 1); //function that returns a random number between 1 and 800
    const [pokemonName, setPokemonName] = useState(""); //Nombre del pokemon
    const [pokemonWeight, setPokemonWeight] = useState(0);  //Peso del pokemon
    const [pokemonHeight, setPokemonHeight] = useState(0);//altura del pokemon

    useEffect(() => {
        console.log("El id del pokemon es: " + pokemonID);
        const fetchImage = async () => {
            const res = await fetch("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemonID + ".png");
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setPokemonImage(imageObjectURL);
        };
        fetchImage();

        const fetchPokemonStats = async () => {
            const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonID);
            const pokemon = await res.json();

            let weight =  parseFloat(pokemon.weight)*0.1;
            let height =  parseFloat(pokemon.height)*0.1; 
            height = height.toFixed(1); //redondea a 1 decimal
            weight = weight.toFixed(1); //redondea a 1 decimal
            console.log("¡Ha aparecido un " + pokemon.name + " salvaje!");
            console.log("De tipo: " + pokemon.types[0].type.name);
            console.log("Su peso es: " + weight + "kg");
            console.log("Su altura es: " + height + "m");

            setPokemonName((pokemon.name).toUpperCase());
            setPokemonHeight(height);
            setPokemonWeight(weight);
        };
        fetchPokemonStats();
    }, []);


    return (
        <div >
            <Card
                style={{
                    width: '320px', margin: "auto", marginTop: "80px", marginBottom: "20px", 
                    boxShadow: "0px 0px 10px #888888", borderRadius: "50px", alignItems: "center"
                }}>
                <Card.Title style={{ textAlign: "center", marginTop: "20px" }}>¡Haz aparecer este pokemon salvaje en Instagram!</Card.Title>
                <Card.Img style={{
                    height: "200px"
                }}
                    variant="top" src={pokemonImage} />
                <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>{pokemonName}</Card.Title>
                    <Card.Text style={{ textAlign: "center" }}>
                        Peso: {pokemonWeight}kg 
                        - Altura: {pokemonHeight}m
                    </Card.Text>
                </Card.Body>
                <PokeForm ID={pokemonID}/>
            </Card>
        </div>
    );
}
export default MainPage;