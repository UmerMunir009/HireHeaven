const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { generateToken } = require("../../utils/jwtToken");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const { uploadFromBuffer } = require("../../config/cloudinary");
const { emitUserSignedUp } = require('../../utils/kafka'); 

const signUpJobSeeker = asyncErrorHandler(async (req, res) => {
  const { email, password, name, phoneNumber } = req.body;
 

  if (!email || !password || !name || !phoneNumber) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: "Email, password, name, and phone number are mandatory.",
    });
  }

  if (!req.files || !req.files.profile_pic || !req.files.resume) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: "Profile picture and Resume are both required for job seekers.",
    });
  }

  const isExist = await User.findOne({ where: { email } });
  if (isExist) {
    return res.status(STATUS_CODES.CONFLICT).json({
      statusCode: STATUS_CODES.CONFLICT,
      message: "Email already registered.",
    });
  }

  const profileResult = await uploadFromBuffer(req.files.profile_pic[0].buffer, 'HireHeaven/Profiles');
  const resumeResult = await uploadFromBuffer(req.files.resume[0].buffer, 'HireHeaven/Resumes', 'raw');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    role: 'job_seeker',
    profile_pic: profileResult.secure_url,
    profile_pic_public_key: profileResult.public_id,
    resume: resumeResult.secure_url,
    resume_public_id: resumeResult.public_id
  });

  await emitUserSignedUp(newUser);

  const userData = newUser.toJSON();
  delete userData.password;
  const accessToken = generateToken(userData);

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: userData,
    token: accessToken,
  });
});

const signUpRecruiter = asyncErrorHandler(async (req, res) => {
  const { email, password, name, phoneNumber } = req.body;

  if (!email || !password || !name || !phoneNumber) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: "Email, password, name, and phone number are mandatory.",
    });
  }

  if (!req.file) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: "Profile picture is required.",
    });
  }

  const isExist = await User.findOne({ where: { email } });
  if (isExist) {
    return res.status(STATUS_CODES.CONFLICT).json({
      statusCode: STATUS_CODES.CONFLICT,
      message: "Email already registered.",
    });
  }

  const profileResult = await uploadFromBuffer(req.file.buffer, 'HireHeaven/Profiles');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    role: 'recruiter',
    profile_pic: profileResult.secure_url,
    profile_pic_public_key: profileResult.public_id
  });
    await emitUserSignedUp(newUser);


  const userData = newUser.toJSON();
  delete userData.password;

  const accessToken = generateToken(userData);

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: userData,
    token: accessToken,
  });
});

const login = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
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
    token: accessToken,
  });
});

module.exports = {
  signUpJobSeeker,
  signUpRecruiter,
  login,
};