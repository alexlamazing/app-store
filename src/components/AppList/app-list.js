import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// components
import ListItem from "./list-item";
import ListItemSkeleton from "./list-item-skeleton";
import { ReactComponent as Spinner } from "../../static/spinner.svg";

// actions
import { fetchFreeApp, loadMore } from "./actions";

// styles
import "./app-list.scss";

const NUM_OF_APPS_PER_PAGE = 10;

function AppList(props) {
    const {
        apps,
        error,
        isFetching,
        isLoadingMore,
        keyword,
        fetchFreeApp,
        page,
        loadMore
    } = props;

    React.useEffect(() => {
        fetchFreeApp();
    }, []);

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [page, isLoadingMore, loadMore]);
    
    // check if the app contains the keyword
    const containKeyword = (app) => {
        const substring = keyword.toLowerCase();

        if (app.name.toLowerCase().includes(substring)) {
            return true;
        }
        app.genres.map(category => {
            if (category.name.toLowerCase().includes(substring)) {
                return true;
            };
        })
        if (app.artistName.toLowerCase().includes(substring)) {
            return true;
        }
        if (app.description) {
            if (app.description.toLowerCase().includes(substring)) {
                return true;
            }
        }

        return false;
    }

    const filteredApps = React.useMemo(() => {
        return keyword.length === 0 ? apps : apps.filter(containKeyword);
    }, [keyword, apps.length]);

    const filteredAppsTotal = React.useMemo(() => filteredApps.length, [filteredApps.length]);
    const filteredAppsPages = React.useMemo(() => Math.ceil(filteredAppsTotal / NUM_OF_APPS_PER_PAGE), [filteredAppsTotal]);

    const displayApps = React.useMemo(() => filteredApps.slice(0, page * NUM_OF_APPS_PER_PAGE), [page, filteredApps]);

    const handleScroll = React.useCallback((event) => {
        const body = document.body,
              html = document.documentElement;
    
        const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

        if (isLoadingMore || page === filteredAppsPages) { return; }

        if (window.innerHeight + document.documentElement.scrollTop >= height - 0) {
            loadMore(page + 1);
        }
    }, [page, isLoadingMore, loadMore]);

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
                            filteredApps.length === 0 &&
                            <div className="message">
                                沒有相關結果
                            </div>
                        )
                    )
                }
                <ul>
                    {
                        displayApps.map((app, index) => <ListItem key={index} index={index + 1} app={app} />)
                    }
                </ul>
                {
                    isLoadingMore && (
                        <div className="load-more">
                            <Spinner />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

AppList.propTypes = {
    apps: PropTypes.array,
    error: PropTypes.string,
    isFetching: PropTypes.bool,
    isLoadingMore: PropTypes.bool,
    keyword: PropTypes.string,
    loadMore: PropTypes.func
}

const mapStateToProps = state => {
    const { keyword } = state;
    const { apps, error, isFetching, isLoadingMore, page } = state.topFree;
    return { apps, error, isFetching, isLoadingMore, keyword, page }
}

export default connect(mapStateToProps, {
    fetchFreeApp,
    loadMore
})(AppList);