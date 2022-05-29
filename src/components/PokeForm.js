import React, { useState} from 'react'
import { Form} from "react-bootstrap";
import './styles/PokeballStyles.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PokeForm = (props) => {
    const [trainerName, setTrainerName] = useState("Anonimo"); //Nombre anonimo por defecto
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("https://wildpokemon-app.herokuapp.com/posting",
       // axios.post("http://localhost:4000/posting",
            {
                trainerName: trainerName,
                pokemonID: props.ID
            }).then(res => {
                if(res.data.received){
                    console.log(res.data.message);
                    toast.success(res.data.message, { position: "bottom-right" });
                    // toast("Wow so easy !");
                }
              //  console.log(res.data);
            }).catch(err => {
                console.log(err);
            });
    };
    return (
        <div >
            <Form id='my-form'
                style={{
                    marginRight: "50px", marginLeft: "50px"
                }}
                onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control type="text" placeholder="Entrenador/a..."
                        onChange={(e) => { setTrainerName(e.currentTarget.value); }} />
                    <Form.Text className="text-muted">
                        Tu nombre aparecerá en la publicación.
                    </Form.Text>
                </Form.Group>
                <div className="pokeball" >
                    <button type="submit" form='my-form' className="pokeball__button" > </button>
                </div>
            </Form>
            <ToastContainer />
        </div>
    );
};



export default PokeForm;
