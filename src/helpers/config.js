export const config = {
  project: {
    name: "Joyful Campus",
    slogan: "📢 Knowledge is Power, Embrace Education",
    description:
      "Our school's mission is to learn leadership, the common core, and relationships for life. Our mission is to provide a safe, disciplined learning environment that empowers all students to develop their full potential. We feel strongly about helping to build leaders that have the ability to succeed in whatever endeavor they undertake.",
  },
  contact: {
    phone1: "+86 123 456 7890",
    phone2: "+86 123 456 7891",
    email: "info@example.com",
    address: "341 School Avenue Berry, AL 35546",
    mapUrl: "https://google.com",
    socialMedia: {
      facebook: "https://www.facebook.com/",
      twitter: "https://twitter.com/",
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      youtube: "https://www.youtube.com/",
      github: "https://github.com/",
    },
  },
  api: {
    baseUrl: "https://mycampusmates.com/app",
  },
  pageRoles: {
    dashboard: ["ADMIN", "MANAGER", "ASSISTANTMANAGER", "TEACHER", "STUDENT"],
    adminManagement: ["ADMIN"],
    managerManagement: ["ADMIN"],
    assistantManagerManagement: ["ADMIN", "MANAGER"],
    teacherManagement: ["ADMIN", "ASSISTANTMANAGER"],
    lessonManagement: ["ADMIN", "ASSISTANTMANAGER"],
    studentManagement: ["ADMIN", "ASSISTANTMANAGER"],
    studentInfoManagement: ["TEACHER"],
    meetManagement: ["TEACHER"],
    contactMessage: ["ADMIN", "MANAGER", "ASSISTANTMANAGER", "TEACHER"],
    chooseLesson: ["STUDENT"],
    gradesAndMeets: ["STUDENT"],
  },
  educationTerms: [{}],
};
