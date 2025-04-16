import User from "../models/UserSchema.js";

export const GoogleSignIn = async(accessToken, refreshToken, profile, cb) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if(!user) {
            user = new User({
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                password: profile.displayName
            });
            await user.save();
        }
        return cb(null, user);
    } catch (error) {
        return cb(error, null)
    }
}