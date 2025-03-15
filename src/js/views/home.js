import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Card from "../component/card.jsx";

export const Home = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();  // <-- Aquí usamos useNavigate

    useEffect(() => {
        actions.getContacts();
    }, []);

    return (
        <div className="text-center mt-5">
            <h1>Contact List</h1>

            {/* Botón para ir al formulario */}
            <button onClick={() => navigate("/contact")} className="btn btn-primary">
                Añadir Contacto
            </button>

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
    );
};
