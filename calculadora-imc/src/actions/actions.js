import { GET_RESULTS, POST_RESULT } from "../constants/actionsStrings";
import { getResults, postResult } from "../services/services";

export const postResultAction = (result) => async (dispatch) => {
    try {
        const res = await postResult(result);
        dispatch({
            type: POST_RESULT,
            payload: res.data,
        });
        return res;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const getResultsAction = () => async (dispatch) => {
    try {
        const res = await getResults();
        dispatch({
            type: GET_RESULTS,
            payload: res.data.reverse(),
        });
        return res;
    } catch (err) {
        console.log(err);
        return false;
    }
};