import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hook";
import { getCurrentUser } from "../../modules/auth/api/api.getme";
import { setAuthChecked, setCredentials } from "../../modules/auth/store/auth.slice";





export const useAuthPolling = (shouldPoll: boolean) => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (!shouldPoll) return

        const interval = setInterval(async () => {
            try {
                const response = await getCurrentUser();
                console.log("User authenticated:", response);
                dispatch(
                    setCredentials({
                        user: response.user,
                        accessToken: response.accessToken,
                        isAuthenticated: true
                    })
                )

                navigate("/");
            } catch (error) {
                console.log("Waiting for verification...");
            }finally {
                dispatch(setAuthChecked(true))
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [dispatch, navigate, shouldPoll]);
};


