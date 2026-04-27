import React from "react";
import { useUserAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requireNonAdmin = false }) => {
    const { session, authReady, isAdmin } = useUserAuth();

    if (!authReady) {
        return null;
    }

    if (!session) {
        return <Navigate to="/" replace />;
    }

    if (requireNonAdmin && isAdmin) {
        return <Navigate to="/admin" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;