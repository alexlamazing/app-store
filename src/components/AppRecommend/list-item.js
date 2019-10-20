import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// actions
import { fetchDetail } from "./actions";

// styles
import "./app-recommend.scss";

function ListItem(props) {
    const { app, fetchDetail } = props;

    // React.useEffect(() => {
    //     fetchDetail(app.id);
    // }, [app.id]);

    return (
        <li className="list-item">
            <div className="icon"><img src={app.artworkUrl100} alt={app.name} /></div>
            <div className="name">{app.name}</div>
            <div className="category">{app.genres.map(category => category.name)[0]}</div>
            <a href={app.url} target="_blank" rel="noopener noreferrer" />
        </li>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDetail: appId => dispatch(fetchDetail(appId))
    }
}

export default connect(null, mapDispatchToProps)(ListItem);