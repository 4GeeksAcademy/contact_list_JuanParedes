import React, { useContext } from "react";
import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom"; // Para redirigir a la edición
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

const Card = ({ id, name, email, phone, address }) => {
    const { actions } = useContext(Context);
   const navigate = useNavigate(); // Hook de navegación

    return (
        <div className="d-flex justify-content-center">
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
                <div className="row g-0">
                    <div className="col-md-4 p-2">
                        <img src={rigoImage} className="img-fluid rounded-start" alt={name} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text"><strong>Address:</strong> {address}</p>
                            <p className="card-text"><strong>Email:</strong> {email}</p>
                            <p className="card-text"><strong>Phone:</strong> {phone}</p>

                            {/* Botón de Editar */}
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                
                                    actions.setCurrentEdit(id, name, phone, email, address );
                                    navigate("/edit"); // Espera un momento antes de navegar
                                }}
                            >
                                Editar
                            </button>


                            {/* Botón de Eliminar */}
                            <button
                                className="btn btn-danger"
                                onClick={() => actions.deleteContact(id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;