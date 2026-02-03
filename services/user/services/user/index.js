const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { sequelize, Skill } = require("../../models");

const getProfile = asyncErrorHandler(async (req, res) => {
  const userId = req.user.id;

  const skills = await Skill.findAll({
    where: {
      userId: userId,
      deleted: null
    },
    attributes: ["id", "skillName", "proficiency", "created"],
    order: [["created", "DESC"]]
  });

  const profileData = {
    ...req.user,
    skills: skills
  };

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: "Profile fetched successfully",
    data: profileData,
  });
});

const addSkill = asyncErrorHandler(async (req, res) => {
  const { skillName, proficiency } = req.body;
  const userId = req.user.id;

  if (!skillName) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: "Skill name is required.",
    });
  }

  const newSkill = await Skill.create({
    userId,
    skillName,
    proficiency: proficiency || 'Intermediate'
  });

  res.status(STATUS_CODES.CREATED).json({
    statusCode: STATUS_CODES.CREATED,
    message: "Skill added successfully",
    data: newSkill,
  });
});

const deleteSkill = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const skill = await Skill.findOne({
    where: { id, userId }
  });

  if (!skill) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      message: "Skill not found or unauthorized",
    });
  }

  await skill.destroy();

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: "Skill deleted successfully",
  });
});

const getPublicProfile = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const results = await sequelize.query(
    `
  SELECT 
    u.id, u.name, u.email, "phoneNumber", u.role, u.bio, profile_pic, u.resume,
    s.id as "skillId", s."skillName", s.proficiency
  FROM "users" u
  LEFT JOIN "skills" s ON u.id = s."userId" AND s.deleted IS NULL
  WHERE u.id = :id AND u.deleted IS NULL
  `,
    {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  if (!results || results.length === 0) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      statusCode: STATUS_CODES.NOT_FOUND,
      message: "User profile not found",
    });
  }

  const profile = {
    id: results[0].id,
    name: results[0].name,
    email: results[0].email,
    phoneNumber: results[0].phoneNumber,
    role: results[0].role,
    bio: results[0].bio,
    profile_pic: results[0].profile_pic,
    resume: results[0].resume,
    skills: results
      .map(row => row.skillId ? {
        id: row.skillId,
        name: row.skillName,
        proficiency: row.proficiency
      } : null)
      .filter(Boolean)
  };

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: "Public Profile retrieved successfully",
    data: profile,
  });
});

module.exports = {
  getProfile,
  addSkill,
  deleteSkill,
  getPublicProfile
};