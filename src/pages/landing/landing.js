import React from "react";

// components
import AppList from "../../components/AppList/app-list";
import AppRecommend from "../../components/AppRecommend/app-recommend";
import SearchBar from "../../components/SearchBar/search-bar";

function LandingPage() {
    return (
        <>
        <SearchBar />
        <AppRecommend />
        <AppList />
        </>
    );
}

export default LandingPage;