import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppContext } from '../lib/contextLib';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import Users from '../users/Users';

function UserSearcher() {
  
  
  const { isAuthenticated } = useAppContext();
  const history = useHistory();
  const [users, setUsers] = useState(null);
  const [usersComplete, setUsersComplete] = useState(null);
  const [userFind, setUserFind] = useState(null);
  const [userToFind, setUserToFind] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`json/users.json`);
        const usersJson = await response.json();
        setUsers(usersJson);
        setUsersComplete(usersJson);
      } catch (e) {
        console.error(e);
      }
    }
    fetchUsers();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [doc_identidad, setDoc] = useState('');
  const [nombre, setNombre] = useState('');
  const [fecha_nacimiento, setFechaNacimiento] = useState('');
  const [sexo, setSexo] = useState('');
  const [alergias, setAlergias] = useState('');
  const [antecedentes, setAntecedentes] = useState('');

  function handleSave() {
    console.log(users);
    setUsers([...users, {
      id: users[users.length - 1].id + 1, doc_identidad,nombre, fecha_nacimiento, sexo,alergias,antecedentes
    }]);
    handleClose();
  }
  

  if (users) {
    return (
      <>
        <Container>
          
          <section>
            {isAuthenticated && <Button className="mb-3" variant="primary" onClick={handleShow}>Crear paciente</Button>}
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Doc.Identidad</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Fecha de nacimiento</th>
                  <th scope="col">Sexo</th>
                  <th scope="col">Alergias</th>
                  <th scope="col">Antecedentes</th>
                  <th scope="col">Más información</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr>
                    <th scope="row">{user.doc_identidad}</th>
                    <td>{user.nombre}</td>
                    <td>{user.fecha_nacimiento}</td>
                    <td>{user.sexo}</td>
                    <td>{user.alergias}</td>
                    <td>{user.antecedentes}</td>
                    
                    <td>
                    <Button className="mb-1 mr-1" variant="primary" onClick={()=>{
                      history.push(`/user/${user.id}`);
                    }
                    //``
                    }><FontAwesomeIcon icon={faFolderPlus} /></Button>
                    { isAuthenticated &&
                    <>
                      <Button variant="primary"><FontAwesomeIcon icon={faEdit} /></Button>
                      <Button variant="primary"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                    </>
                    }
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </Container>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Crear pelicula</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Documento de id</Form.Label>
                <Form.Control type="text" value={doc_identidad} onChange={(e) => setDoc(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control type="text" value={fecha_nacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Sexo</Form.Label>
                <Form.Control type="text" value={sexo} onChange={(e) => setSexo(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Alergias</Form.Label>
                <Form.Control type="text" value={alergias} onChange={(e) => setAlergias(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Antecedentes</Form.Label>
                <Form.Control type="text" value={antecedentes} onChange={(e) => setAntecedentes(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
          </Button>
            <Button variant="primary" onClick={handleSave}>
              Guardar
          </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  return null;
}

export default UserSearcher;