import React from "react";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";

// actions
import { fetchDetail } from "./actions";

// styles
import "./app-recommend.scss";

function ListItem(props) {
    const { app, fetchDetail } = props;

    React.useEffect(() => {
        fetchDetail(app.id);
    }, [app.id]);

    return (
        <li className="list-item">
            <LazyLoad height={80} once>
                <div className="icon"><img src={app.artworkUrl100} alt={app.name} /></div>
            </LazyLoad>
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

export default connect(null, mapDispatchToProps)(React.memo(ListItem), (prevProps, nextProps) => {
    return prevProps.app.id === nextProps.app.id &&
    prevProps.app.description === nextProps.app.description;
});