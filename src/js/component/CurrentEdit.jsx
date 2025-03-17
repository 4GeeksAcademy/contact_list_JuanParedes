import React, { useContext, useState, useEffect } from "react"; // Importamos React y hooks necesarios
import { Context } from "../store/appContext"; // Importamos el contexto global
import { useNavigate } from "react-router-dom"; // Hook para redirigir a otras páginas

const CurrentEdit = () => {
    const { store, actions } = useContext(Context); // Obtenemos el estado global (store) y las acciones (actions)
    const navigate = useNavigate(); // Hook para cambiar de página

    // Estado local para manejar los datos del formulario
    const [contact, setContact] = useState({
        id: "",       // ID del contacto (en caso de edición)
        name: "",     // Nombre del contacto
        phone: "",    // Número de teléfono
        email: "",    // Correo electrónico
        address: ""   // Dirección
    });

    // useEffect se ejecuta cuando el componente se monta o cuando store.currentEdit cambia
    useEffect(() => {
        console.log("store.currentEdit:", store.currentEdit); // Muestra en consola el contacto actual a editar

        // Si store.currentEdit tiene datos y un ID válido, significa que estamos editando un contacto
        if (store.currentEdit && store.currentEdit.id) {
            setContact({
                id: store.currentEdit.id,            // ID del contacto a editar
                name: store.currentEdit.name || "", // Si no hay nombre, dejamos un string vacío
                phone: store.currentEdit.phone || "",
                email: store.currentEdit.email || "",
                address: store.currentEdit.address || ""
            });
        }
    }, [store.currentEdit]); // Se ejecuta cada vez que store.currentEdit cambia

    // Función que actualiza el estado local cuando el usuario escribe en los inputs
    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value }); 
        // Copia el estado actual y actualiza solo el campo que cambió
    };

    // Función que maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        if (store.currentEdit.id) {
            // Si hay un ID en el contacto, significa que estamos editando un contacto existente
            await actions.updateContact(contact.id, contact);
        } else {
            // Si no hay ID, estamos agregando un nuevo contacto
            await actions.addContact(contact);
        }

        navigate("/"); // Redirige a la lista de contactos después de guardar
    };

    return (
        <div className="container mt-5">
            {/* Título dinámico: cambia si estamos agregando o editando un contacto */}
            <h2>{store.currentEdit.id ? "Editar Contacto" : "Añadir Contacto"}</h2>

            {/* Formulario */}
            <form onSubmit={handleSubmit}>
                {/* Campo Nombre */}
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        value={contact.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* Campo Teléfono */}
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="phone" 
                        value={contact.phone} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* Campo Correo Electrónico */}
                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        value={contact.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* Campo Dirección */}
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="address" 
                        value={contact.address} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* Botón para guardar o actualizar contacto */}
                <button type="submit" className="btn btn-success">
                    {store.currentEdit.id ? "Actualizar Contacto" : "Guardar Contacto"}
                </button>

                {/* Botón para volver a la agenda sin guardar */}
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}  // Redirige a la lista de contactos
                >
                    Volver a Agenda
                </button>
            </form>
        </div>
    );
};

export default CurrentEdit;



/*
==========================================
FLUJO DE INTERACCIÓN EN LA INTERFAZ
==========================================

1. Añadir un contacto 🆕
📌 Escenario: El usuario hace clic en "Añadir Contacto", completa el formulario y lo guarda.

🔹 Flujo del código:
1️⃣ El usuario hace clic en "Añadir Contacto" en Home.js.
   - Esto navega a CurrentEdit.js (el formulario de edición).

2️⃣ CurrentEdit.js monta el formulario con campos vacíos porque no hay un contacto en store.currentEdit.

3️⃣ El usuario completa el formulario.
   - Cada vez que escribe en un campo, handleChange actualiza el estado local contact.

4️⃣ El usuario presiona "Guardar Contacto".
   - Esto dispara handleSubmit(), que:
     - Detecta que no hay contact.id (porque es un nuevo contacto).
     - Llama a actions.addContact(contact).

5️⃣ Context.js maneja la acción addContact(contact):
   - Hace una petición POST a la API con los datos del nuevo contacto.
   - Actualiza el store.contacts con la nueva lista de contactos.

6️⃣ El sistema redirige a Home.js, donde se muestra la lista actualizada con el nuevo contacto.

--------------------------------------------------------

2. Editar un contacto ✏️
📌 Escenario: El usuario presiona "Editar" en un contacto existente, modifica los datos y los guarda.

🔹 Flujo del código:
1️⃣ En Home.js, cada contacto tiene un botón "Editar".
   - Al hacer clic en este botón:
     - Llama actions.setCurrentEdit(contact), que guarda el contacto en store.currentEdit.
     - Navega a CurrentEdit.js.

2️⃣ CurrentEdit.js se monta y carga store.currentEdit.
   - Como store.currentEdit ya tiene datos, el formulario se llena con los datos del contacto.

3️⃣ El usuario edita los datos en los campos del formulario.
   - handleChange actualiza el estado local contact con los nuevos valores.

4️⃣ Al hacer clic en "Actualizar Contacto", handleSubmit detecta que contact.id existe.
   - Llama a actions.updateContact(contact.id, contact).

5️⃣ Context.js maneja la acción updateContact(id, contact):
   - Hace una petición PUT a la API para actualizar el contacto en el servidor.
   - Modifica store.contacts con la nueva versión del contacto.

6️⃣ El sistema redirige a Home.js, donde la lista de contactos muestra los cambios.

--------------------------------------------------------

3. Eliminar un contacto 🗑
📌 Escenario: El usuario presiona el botón "Eliminar" en un contacto y este desaparece de la lista.

🔹 Flujo del código:
1️⃣ En Home.js, cada contacto tiene un botón "Eliminar".

2️⃣ Al hacer clic en "Eliminar":
   - Se ejecuta actions.deleteContact(contact.id).

3️⃣ Context.js maneja la acción deleteContact(id):
   - Hace una petición DELETE a la API con el id del contacto.
   - Filtra store.contacts para eliminar el contacto localmente.

4️⃣ Como store.contacts se actualiza, Home.js vuelve a renderizar la lista sin el contacto eliminado.
*/
