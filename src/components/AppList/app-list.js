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

    // fetch data when the AppList component did mount
    React.useEffect(() => {
        fetchFreeApp();
    }, []);
    
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

    // do filter apps when keyword is updated
    const filteredApps = React.useMemo(() => {
        return keyword.length === 0 ? apps : apps.filter(containKeyword);
    }, [keyword, apps]);
    const filteredAppsTotal = React.useMemo(() => filteredApps.length, [filteredApps.length]);
    const filteredAppsPages = React.useMemo(() => Math.ceil(filteredAppsTotal / NUM_OF_APPS_PER_PAGE), [filteredAppsTotal]);

    // actual apps being displayed
    const displayApps = React.useMemo(() => filteredApps.slice(0, page * NUM_OF_APPS_PER_PAGE), [page, filteredApps]);

    const handleScroll = React.useCallback((event) => {
        const body = document.body,
              html = document.documentElement;
    
        const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

        // break if it's loading more OR already the last page
        if (isLoadingMore || page === filteredAppsPages) { return; }

        // if scrolled to the bottom, load more
        if (window.innerHeight + document.documentElement.scrollTop >= height - 0) {
            loadMore(page + 1);
        }
    }, [page, filteredAppsPages, isLoadingMore, loadMore]);

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [page, filteredAppsPages, isLoadingMore, loadMore]);

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
                        displayApps.map((app, index) => <ListItem key={index} app={app} />)
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
    const {
        keyword,
        topFree: {
            apps,
            error,
            isFetching,
            isLoadingMore,
            page
        }
    } = state;
    return { apps, error, isFetching, isLoadingMore, keyword, page }
}

export default connect(mapStateToProps, {
    fetchFreeApp,
    loadMore
})(AppList);