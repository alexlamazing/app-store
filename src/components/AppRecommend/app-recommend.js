import React from "react";
import { connect } from "react-redux";

// components
import ListItem from "./list-item";
import ListItemSkeleton from "./list-item-skeleton";

// actions
import { fetchGrossingApp } from "./actions";

// styles
import "./app-recommend.scss";

function AppRecommend(props) {
    const {
        apps,
        error,
        fetchGrossingApp,
        isFetching,
        keyword
    } = props;

    // fetch data when AppRecommend component did mount
    React.useEffect(() => {
        fetchGrossingApp();
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
    

    return (
        <div className="recommend-list">
            <div className="content">
                <h1>推介</h1>
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
                        filteredApps.map((app, index) => <ListItem key={index} app={app} />)
                    }
                </ul>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    const {
        keyword,
        topGrossing: {
            apps,
            error,
            isFetching
        }
    } = state;
    return {
        apps, error, isFetching, keyword
    }
}

export default connect(mapStateToProps, {
    fetchGrossingApp,
})(AppRecommend);