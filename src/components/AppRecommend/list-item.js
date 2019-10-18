import React from "react";

// styles
import "./app-recommend.scss";

function ListItem(props) {
    const { app } = props;
    return (
        <li className="list-item">
            <div className="icon"><img src={app.artworkUrl100} /></div>
            <div className="name">{app.name}</div>
            <div className="category">{app.genres.map(category => category.name)[0]}</div>
            <a href={app.url} target="_blank" rel="noopener noreferrer" />
        </li>
    );
}

export default ListItem;