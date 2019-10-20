import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// components
import ListItem from "./list-item";
import ListItemSkeleton from "./list-item-skeleton";

// actions
import { fetchFreeApp, filterFreeApp } from "./actions";

// styles
import "./app-list.scss";

function AppList(props) {
    const { apps, appsFiltered, error, isFetching, keyword, fetchFreeApp, filterFreeApp } = props;
    React.useEffect(() => {
        fetchFreeApp();
    }, []);
    React.useEffect(() => {
        filterFreeApp(keyword);
    }, [keyword]);
    return (
        <div className="app-list">
            <div className="content">
                {
                    isFetching ? (
                        <ul>
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                        </ul>
                    ) : (
                        error.length > 0 ? (
                            <div className="message">
                                {error}
                            </div>
                        ) : (
                            keyword.length > 0 &&
                            appsFiltered.length === 0 &&
                            <div className="message">
                                沒有相關結果
                            </div>
                        )
                    )
                }
                <ul>
                    {
                        keyword.length === 0
                        ? apps && apps.map((app, index) => <ListItem key={index} index={index + 1} app={app} />)
                        : appsFiltered && appsFiltered.map((app, index) => <ListItem key={index} index={index + 1} app={app} />)
                    }
                </ul>
            </div>
        </div>
    );
}

AppList.propTypes = {
    apps: PropTypes.array,
    appsFiltered: PropTypes.array,
    isFetching: PropTypes.bool,
    fetchFreeApp: PropTypes.func,
    keyword: PropTypes.string,
    error: PropTypes.string
}

const mapStateToProps = state => {
    const { keyword } = state;
    const { apps, appsFiltered, error, isFetching } = state.topFree;
    return { apps, appsFiltered, error, isFetching, keyword }
}

export default connect(mapStateToProps, {
    fetchFreeApp,
    filterFreeApp
})(AppList);