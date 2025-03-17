import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Card from "../component/card.jsx";

export const Home = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getContacts();
    }, []);

    return (
        <div className="container mt-5">
            {/* Contenedor para centrar todo */}
            <div className="d-flex flex-column align-items-center">
                {/* Contenedor del título y el botón */}
                <div className="d-flex justify-content-between align-items-center w-100 mb-3" style={{ maxWidth: "600px" }}>
                    <h1 className="text-center flex-grow-1">Contact List</h1>
                    <button onClick={() => navigate("/contact")} className="btn btn-success">
                        Añadir Contacto
                    </button>
                </div>

                <div className="d-flex flex-column align-items-center w-100">
                    {store.contacts.length > 0 ? (
                        store.contacts.map((contact) => (
                            <Card
                                key={contact.id}
                                name={contact.name}
                                phone={contact.phone}
                                email={contact.email}
                                address={contact.address}
                                id={contact.id}
                            />
                        ))
                    ) : (
                        <p>No hay contactos disponibles</p>
                    )}
                </div>
            </div>
        </div>
    );
};
