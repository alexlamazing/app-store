import ApiCaller from "./api-caller";
import ApiRoute from "./api-route";

export async function fetchTopFree() {
    try {
        const {
            data: {
                results
            }
        } = await ApiCaller.rss.get(ApiRoute.apps.TOP_FREE);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
        return error;
    }
}