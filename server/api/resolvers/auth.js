const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function setCookie({ tokenName, token, res }) {
  /**
   *  @TODO: Authentication - Server
   *
   *  This helper function is responsible for attaching a cookie to the HTTP
   *  response. 'apollo-server-express' handles returning the response to the client.
   *  We added the 'req' object to the resolver context so we can use it to atttach the cookie.
   *  The 'req' object comes from express.
   *
   *  A secure cookie that can be used to store a user's session data has the following properties:
   *  1) It can't be accessed from JavaScript
   *  2) It will only be sent via https (but we'll have to disable this in development using NODE_ENV)
   *  3) A boomtown cookie should oly be valid for 2 hours.
   */
  // Refactor this method with the correct configuration values.
  res.cookie(tokenName, token, {
    maxAge: 1000 * 60 * 120,
    httpOnly: true
  });
}

function generateToken(user, secret) {
  const { id, email, fullname, bio } = user; // Omit the password from the token
  /**
   *  @TODO: Authentication - Server
   *
   *  This helper function is responsible for generating the JWT token.
   *  Here, we'll be taking a JSON object representing the user (the 'J' in JWT)
   *  and cryptographically 'signing' it using our app's 'secret'.
   *  The result is a cryptographic hash representing out JSON user
   *  which can be decoded using the app secret to retrieve the stateless session.
   */
  // Refactor this return statement to return the cryptographic hash (the Token)
  return jwt.sign(user, secret);
  // -------------------------------
}

module.exports = app => {
  return {
    async signup(parent, args, { pgResource, req, token }) {
      try {
        /**
         * @TODO: Authentication - Server
         *
         * Storing passwords in your project's database requires some basic security
         * precautions. If someone gains access to your database, and passwords
         * are stored in 'clear-text' your users accounts immediately compromised.
         *
         * The solution is to create a cryptographic hash of the password provided,
         * and store that instead. The password can be decoded using the original password.
         */

        const viewer = await jwt.decode(token, app.get('JWT_SECRET'));
        if (viewer) throw 'No signup allowed for an authenticated user';
        if (!/.*@.*\..*/.test(args.user.email)) throw 'Invalid email';
        if (args.user.password === '') throw 'Invalid password';
        if (args.user.fullname === '') throw 'Invalid username';

        const hashedPassword = await bcrypt.hash(args.user.password, 10);

        const user = await pgResource.createUser({
          fullname: args.user.fullname,
          email: args.user.email,
          password: hashedPassword
        });

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: req.res
        });

        return user;
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    async login(parent, args, { pgResource, req, token }) {
      try {
        const viewer = await jwt.decode(token, app.get('JWT_SECRET'));
        if (viewer) throw 'No login allowed for an authenticated user';

        if (!/.*@.*\..*/.test(args.user.email)) throw 'Invalid email';
        if (args.user.password === '') throw 'Invalid password';

        const user = await pgResource.getUserAndPasswordForVerification(
          args.user.email
        );
        if (!user) throw 'User was not found';
        const valid = await bcrypt.compare(args.user.password, user.password);
        if (!valid) throw 'User was not found.';

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: req.res
        });
        return user;
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    logout(parent, args, { req }) {
      req.res.clearCookie(app.get('JWT_COOKIE_NAME'));
      return true;
    }
  };
};
