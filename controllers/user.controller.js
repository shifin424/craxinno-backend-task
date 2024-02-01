import userRepository from "../repositories/user.repositories.js";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../services/jwt.services.js";
import ErrorResponse from "../middleware/errors/error.response.js";
import MailerService from "../services/node.mailer.services.js";

const User = new userRepository();

export const createAccount = async (req, res, next) => {
    try {
        const { email, mobile, password, confirmPassword } = req.body;

        const isAdminExists = await User.checkUserExists(email);
        if (isAdminExists) {
            return next(ErrorResponse.badRequest("User already exists"));
        }

        const isMobileExists = await User.checkMobileExists(mobile);
        if (isMobileExists) {
            return next(ErrorResponse.badRequest("Mobile number already registered"));
        }

        if (password !== confirmPassword) {
            return next(ErrorResponse.badRequest("Password and confirm password do not match"));
        }

        const newUser = await User.createUser({ email, mobile, password });

        const accessToken = generateAccessToken({ userId: newUser._id });
        const refreshToken = generateRefreshToken({ userId: newUser._id });

        res.json({ message: "Account Created Successfully", accessToken, refreshToken });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

export const saveAllInfo = async (req, res, next) => {
    try {
        const { titles, name, dateOfBirth, address, lived, about } = req.body;
        const { status, additional } = req.body.financialInfo;
        const { userId } = req.user;

        const user = await User.findById(userId);

        if (!user) {
            return next(ErrorResponse.unauthorized("User not found"));
        }

        user.title = titles;
        user.fullName = name;
        user.dateOfBirth = dateOfBirth;
        user.currentAddress = address;
        user.durationAtCurrentAddress = lived;
        user.about = about;
        user.employmentStatus = status;
        user.additionalSavings = additional;

        await User.save(user);

        await MailerService(user.email, user._id)

    } catch (error) {
        console.log(error);
        return next(error);
    }
};


export const getSavedData = async (req, res, next) => {
    try {
        const { id } = req.params
        console.log(id)
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        console.log(error)
        return next(error)
    }
}

export const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req?.body?.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token not provided' });
        }
        const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const newAccessToken = generateAccessToken({ id: user._id });
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        return next(err)
    }
}
