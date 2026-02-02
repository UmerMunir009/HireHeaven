module.exports = {
  authenticateRoutes: {
    path: [
      { url: "/user/sign-up/job-seeker", method: "POST" },
      { url: "/user/sign-up/recruiter", method: "POST" },
      { url: "/user/login", method: "POST" },
      { url: "/user/forgot-password", method: "POST" },
      { url: "/user/reset-password", method: "POST" },
      // { url: "/invite-agent", method: "POST" },
      // { url: "/get-code", method: "GET" },
      // { url: "/get-user-info", method: "POST" },
      // { url: "/change-balance", method: "POST" },
      // { url: "/show-host-level-info", method: "GET" },
      // { url: "/show-sender-level-info", method: "GET" },
    
      // { url: "/^\/api\/v1\/test\/*/", method: "PATCH" },
    ],
  },
};
