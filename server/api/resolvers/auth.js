const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    maxAge: 1000 * 60 * 120,
    httpOnly: true
  });
}

function generateToken(user, secret) {
  const { id, email, fullname, bio } = user; // Omit the password from the token
  return jwt.sign(user, secret);
}

module.exports = app => {
  return {
    async signup(parent, args, { pgResource, req, token }) {
      try {
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
