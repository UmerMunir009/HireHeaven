const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { generateToken } = require("../../utils/jwtToken");
const { User } = require("../../models");
const bcrypt = require("bcrypt");

const signUp = asyncErrorHandler(async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name || !role) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: "All fields (email, password, name, role) are required",
    });
  }

  const isExist = await User.findOne({ where: { email } });

  if (isExist) {
    return res.status(STATUS_CODES.CONFLICT).json({
      statusCode: STATUS_CODES.CONFLICT,
      message: "Email already registered.",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  const userData = newUser.toJSON();
  delete userData.password;

  const accessToken = generateToken(userData);

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: userData,
    accessToken,
  });
});


const login = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(STATUS_CODES.CONFLICT).json({
      statusCode: STATUS_CODES.CONFLICT,
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      statusCode: STATUS_CODES.UNAUTHORIZED,
      message: "Invalid email or password",
    });
  }

  const userData = user.toJSON();
  delete userData.password;

  const accessToken = generateToken(userData);

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: "Login successful",
    data: userData,
    accessToken,
  });
});

module.exports = {
  signUp,
  login,
};