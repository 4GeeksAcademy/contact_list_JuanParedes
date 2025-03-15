import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const CurrentEdit = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    // Estado local para el formulario
    const [contact, setContact] = useState({
        id: "",
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    // Cargar datos si es edición

    useEffect(() => {
        console.log("store.currentEdit:", store.currentEdit); // Verifica si tiene datos correctos
        if (store.currentEdit && store.currentEdit.id) {
            setContact({
                id: store.currentEdit.id,
                name: store.currentEdit.name || "",
                phone: store.currentEdit.phone || "",
                email: store.currentEdit.email || "",
                address: store.currentEdit.address || ""
            });
        }
    }, [store.currentEdit]);


    // Manejar cambios en los inputs
    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (store.currentEdit.id) {
            await actions.updateContact(contact.id, contact);
        } else {
            await actions.addContact(contact);
        }

        navigate("/"); // Volver a la lista de contactos
    };

    return (
        <div className="container mt-5">
            <h2>{store.currentEdit.id ? "Editar Contacto" : "Añadir Contacto"}</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="name" value={contact.name} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="text" className="form-control" name="phone" value={contact.phone} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input type="email" className="form-control" name="email" value={contact.email} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input type="text" className="form-control" name="address" value={contact.address} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-success">
                    {store.currentEdit.id ? "Actualizar Contacto" : "Guardar Contacto"}
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}  // Regresa a Home.js
                >
                    Volver a Agenda
                </button>
            </form>
        </div>
    );
};

export default CurrentEdit;

