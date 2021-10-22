import React, { useState, useEffect } from "react";

const initailForm = {
  name: "",
  description:"",
  email: "",
  nation: "",
  phonenumber: "",
  region: "",
  web: "",
  password: ""
};

const CrudForm = ({ createData }) => {
  const [form, setForm] = useState(initailForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createData(form);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={form.name}
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          onChange={handleChange}
          value={form.description}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          type="text"
          name="nation"
          placeholder="nation"
          onChange={handleChange}
          value={form.nation}
        />
        <input
          type="text"
          name="phonenumber"
          placeholder="phonenumber"
          onChange={handleChange}
          value={form.phonenumber}
        />
         <input
          type="text"
          name="region"
          placeholder="region"
          onChange={handleChange}
          value={form.region}
        />
        <input
          type="text"
          name="web"
          placeholder="web"
          onChange={handleChange}
          value={form.web}
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={form.password}
        />
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default CrudForm;