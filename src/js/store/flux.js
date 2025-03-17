const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			currentEdit:{},
			// setCurrentEdit: (contact) => {
	
			// 	setStore({ currentEdit: contact });
			// },
			

		},
		actions: {
			setCurrentEdit: (contact) => {
	
				setStore({ currentEdit: contact });
			},
			
			// Use getActions to call a function within a fuction
			/*Obtener contactos creados*/
			getContacts: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/JuanParedes/contacts")
					if (response.status === 404) {
						console.log(" Usuario no encontrado, creando usuario...");
						await getActions().createAgenda();
						return;
					  }

					const data = await response.json()
					console.log(data.contacts)
					setStore({ contacts: data.contacts })


				} catch (error) {
					console.log(error)

				}

			},
			/* Crear usuario */
			createAgenda:async()=>{
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/JuanParedes", {
					  method: "POST",
					  headers: { "Content-Type": "application/json" },
					  body: JSON.stringify({}),
					});
			  
					if (response.ok) {
					  console.log(" Usuario creado exitosamente");
					  getActions().getContacts();
					} else {
					  console.error("Error al crear usuario");
					}
				  } catch (error) {
					console.error(" Error en la creación de usuario:", error);
				  }


			},
           /*Añadir contacto*/
		   addContact: async (contactData) => {
			try {
				const response = await fetch("https://playground.4geeks.com/contact/agendas/JuanParedes/contacts", {
					method: "POST",
					body: JSON.stringify(contactData),
					headers: {
						"Content-Type": "application/json",
					},
				});
		
				if (response.ok) {
					console.log("Contacto agregado correctamente");
					getActions().getContacts();
		
					setStore({ currentEdit: {} }); // Asegurar que se limpia el formulario al añadir
				} else {
					console.error("Error al agregar contacto:", response.status);
				}
			} catch (error) {
				console.error("Error al agregar contacto:", error);
			}
		}
		
		
		,
			/*Actualizar contacto */
			updateContact: async (id, updatedContact) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/JuanParedes/contacts/${id}`, {
						method: "PUT",
						body: JSON.stringify(updatedContact),
						headers: { "Content-Type": "application/json" },
					});
			
					if (response.ok) {
						console.log("Contacto actualizado");
						getActions().getContacts();
						setStore({ currentEdit: {} }); // Limpiar después de editar
					} else {
						console.error("Error al actualizar contacto:", response.status);
					}
				} catch (error) {
					console.error("Error al actualizar contacto:", error);
				}
			},
			
			setCurrentEdit: (contact) => {
				setStore({ currentEdit: contact });
			},

			 	/*Borrar contacto */

				deleteContact: async (id) => {
					try {
					  const response = await fetch(`https://playground.4geeks.com/contact/agendas/JuanParedes/contacts/${id}`, {
						method: "DELETE",
					  });
				
					  if (response.ok) {
						console.log(" Contacto eliminado");
						getActions().getContacts();
					  } else {
						console.error(" Error al eliminar contacto:", response.status);
					  }
					} catch (error) {
					  console.error(" Error al eliminar contacto:", error);
					}
				  }


		},

	}
};


export default getState;