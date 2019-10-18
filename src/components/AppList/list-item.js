import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import withLazyLoad from "./lazy-load";

// actions
import { fetchDetail } from "./actions";

// styles
import "./app-list.scss";

function ListItem(props) {
    const { app, index, fetchDetail } = props;
    React.useEffect(() => {
        fetchDetail(app.id);
    }, [app.id, fetchDetail]);
    return (
        <li className="list-item">
            <div className="rank">{index}</div>
            <div className="app">
                <img className="icon" src={app.artworkUrl100} alt="" />
                <div className="detail">
                    <span className="name">{app.name}</span>
                    <span className="category">{app.genres.map(category => category.name)[0]}</span>
                    <div className="rating">
                        <span className="count">{`(${app.ratingCount || 0})`}</span>
                    </div>
                </div>
            </div>
            <a href={app.url} target="_blank" rel="noopener noreferrer" />
        </li>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDetail: bindActionCreators(fetchDetail, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(withLazyLoad(ListItem));