const sendToken = (user, statusCode, res) => {
  // Creating JWT Token
  const token = user.getJwtToken();

  // Cooking Token
  const options = {
    expires: new Date(
      Date.now() + process.env.CooKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
