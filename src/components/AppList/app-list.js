import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// actions
import { fetchFreeApp } from "./actions";

// styles
import "./app-list.scss";

function AppList(props) {
    const { apps, isFetching, fetchFreeApp } = props;
    React.useEffect(() => {
        fetchFreeApp();
    }, [fetchFreeApp]);
    return (
        <div className="app-list">
            <ul>
                {apps && apps.map((app, index) => <ListItem key={index} index={index} app={app} />)}
            </ul>
        </div>
    );
}

const ListItem = props => {
    const { app, index } = props;
    return (
        <li className="list-item">
            <div className="rank">{index}</div>
            <div className="app">
                <img className="icon" src={app.artworkUrl100} alt="" />
                <div className="detail">
                    <span className="name">{app.name}</span>
                    <span className="category">{app.genres.map(category => category.name)[0]}</span>
                    <div className="rating">
                        <span className="count">{`(123)`}</span>
                    </div>
                </div>
            </div>
        </li>
    );
}

AppList.propTypes = {
    apps: PropTypes.array,
    isFetching: PropTypes.bool,
    fetchFreeApp: PropTypes.func
}

const mapStateToProps = state => {
    const { apps, isFetching } = state.topFree;
    return { apps, isFetching }
}

export default connect(mapStateToProps, { fetchFreeApp })(AppList);