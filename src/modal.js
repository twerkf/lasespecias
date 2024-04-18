import React, {useState, useEffect} from 'react';

const Modal = ({show, data, onSubmit, onCancel, editUser}) => {

  useEffect(() => {
    console.log(editUser);
    if (editUser) setFormData(editUser);
  }, [editUser]);

  const initialFormState = () => {
    return editUser ? {id: null, name: 'Pulsera', price: '12000'} : {id: null, name: '', age: ''};
  } 

  const [formData, setFormData] = useState(initialFormState);

  const onInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: (name === 'price' ? parseInt(value) : value )});
  }

  const submitData = event => {
    event.preventDefault();
    onSubmit(formData);
    onCancel();
  }

  return (
    show ? (
    <div className="modal-overlay">
      <div className='modal'>
        <form onSubmit={submitData}>
          <h3>{editUser ? 'edit details' : 'new details'}</h3>
          <div className="modal-section">
            <label>Producto</label>
            <input type="text" name="name" value={formData.name} 
              onChange={onInputChange} autoFocus autoComplete="off" />
          </div>
          <div className="modal-section">
            <label>Precio $</label>
            <input type="text" name="price" value={formData.price} 
              onChange={onInputChange} autoComplete="off" />
          </div>
          <button type="button" onClick={onCancel}>Deshacer</button>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div> 
    ) : null
  );
}

export default Modal;
