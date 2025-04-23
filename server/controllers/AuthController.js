import User from "../models/UserSchema.js";
import generateToken from "../utils/jwt.js";

export const GoogleSignIn = async(accessToken, refreshToken, profile, cb) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if(!user) {
            user = new User({
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                password: profile.displayName,
                isVerified: true,
                credits: 300
            });
            await user.save();
        }

        const token = generateToken(user._id);
        const credits = user.credits;

        user._doc.token = token;
        user._doc.credits = credits;
        return cb(null, user);
    } catch (error) {
        return cb(error, null)
    }
}