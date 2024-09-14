import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, res, next) => {


    try {
        //check Token
        const authHeader = req.headers["authorization"];
        let token = null;
        if (authHeader) {
            token = authHeader.split(" ")[1];
        } else if (req.cookies.Jwt) {
            token = req.cookies.Jwt;
        }

        // const token = req.cookies.Jwt || authHeader.split(" ")[1] || null;

        if (!token) {
            const error = new Error();
            error.message = "Unauthorized - No Token Provided !"
            error.statusCode = 401;
            throw error
        }

        //check Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            const error = new Error();
            error.message = "Unauthorized - Invalid Token !"
            error.statusCode = 401;
            throw error
        }

        //check user found
        const user = await User.findById(decoded.userId).select("-password");
        if (!decoded) {
            const error = new Error();
            error.message = "User Not Found !"
            error.statusCode = 401;
            throw error
        }

        req.user = user;
        next();

    } catch (error) {
        if (error == "TokenExpiredError: jwt expired") {
            error.message = 'jwt expired';
            error.statusCode = 401;
            next(error);
        }
        next(error);
    }

}

export default protectRoute;