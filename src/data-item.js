import React from 'react';

const DataItem = ({data, onEdit, onDelete}) => (
  <table>
    <thead>
      <tr>
        <th>Fecha</th>
        <th>Ocupado</th>
      </tr>
    </thead>
    <tbody>
      {(
        data.map(user => (
          <tr key={user.name}>
            <td>{user.name}</td>
            <td>{user.price}</td>
            <td>
              <button onClick={() => onEdit(user)}>Editar</button>
              <button onClick={() => onDelete(user)}>Borrar</button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>        
);


export default DataItem;
