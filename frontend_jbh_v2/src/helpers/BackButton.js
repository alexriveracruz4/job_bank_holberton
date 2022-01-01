import React from 'react';
import { useHistory } from "react-router-dom";
import "./BackButton.css"

export const BackButton = () => {
    let history = useHistory();
    return (
          <button className="btn btn-primary hBack" type="button" onClick={() => history.goBack()}> &laquo; Atrás </button>
    );
};