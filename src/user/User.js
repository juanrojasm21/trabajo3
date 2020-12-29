import React, { useState, useEffect } from 'react';
import { Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useAppContext } from '../lib/contextLib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './User.css';

function User(props) {
  const { isAuthenticated } = useAppContext();
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`../json/${props.match.params.id}.json`)
      .then(res => res.json())
      .then(setUser)
      .catch(console.error);
  }, [props]);

  if (user) {
    return (
      <article className="user">
        <img src={user[0].image} alt={user.nombre} />
        <Container>
          <section>
          <h2>{user[0].nombre} </h2>
          <h4>Fecha de nacimiento:</h4>
          <p>{user[0].fecha_nacimiento}</p>
          <h4>Sexo:</h4>
          <p>{user[0].sexo}</p>
          <h4>Alergias:</h4>
          <p>{user[0].alergias}</p>
          <h4>Antecedentes:</h4>
          <p>{user[0].antecedentes}</p>
          <h4>Citas médicas:</h4>
          </section>
          <section>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Cod.Cita</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Peso</th>
                  <th scope="col">Estatura</th>
                  <th scope="col">Presión</th>
                  <th scope="col">Médico</th>
                  <th scope="col">Medicamento</th>
                  <th scope="col">Ex.laboratorio</th>
                  { isAuthenticated &&
                  <>
                    <th scope="col">Editar</th>
                    </>
                    }
                  
                </tr>
              </thead>
              <tbody>
                {user.map(user => (
                  <tr>
                    <th scope="row">{user.cita.cod_cita}</th>
                    <td>{user.cita.descripcion_cita}</td>
                    <td>{user.cita.hora_fecha}</td>
                    <td>{user.cita.peso}</td>
                    <td>{user.cita.estatura}</td>
                    <td>{user.cita.presion_arterial}</td>
                    <td>{user.cita.medico.nombre}</td>
                    <td>{user.cita.medicamento.nombre_medicamento}</td>
                    <td>{user.cita.examenlaboratorio.nombre_examen}</td>
                    <td>
                    { isAuthenticated &&
                    <>
                      <Button variant="primary"><FontAwesomeIcon icon={faEdit} /></Button>
                    </>
                    }
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </Container>
      </article>
    );
  }
  return null;
}

export default User;