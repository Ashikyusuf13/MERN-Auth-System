import jwt from "jsonwebtoken";

const userauth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "User Not Authenticated" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.SECRETKEY);

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
  next();
};

export default userauth;
