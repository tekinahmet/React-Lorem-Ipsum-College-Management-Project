export const config = {
  project: {
    name: "Lorem Ipsum College",
    slogan: "📢 Knowledge is Power, Embrace Education",
    description:
      "Our school's mission is to learn leadership, the common core, and relationships for life. Our mission is to provide a safe, disciplined learning environment that empowers all students to develop their full potential. We feel strongly about helping to build leaders that have the ability to succeed in whatever endeavor they undertake.",
    version: "1.0.0",
  },
  contact: {
    phone1: "+86 123 456 7890",
    phone2: "+86 123 456 7891",
    email: "info@example.com",
    address: "341 School Avenue Berry, AL 35546",
    mapURL: "https://maps.app.goo.gl/dA4yeBbXNFQAxWNf7",
    mapEmbedURL:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.7136964853535!2d-87.60127969999999!3d33.664579599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88862940535ee321%3A0x9bddb072ad15caa1!2s341%20School%20Ave%2C%20Berry%2C%20AL%2035546%2C%20USA!5e0!3m2!1sen!2str!4v1712534683078!5m2!1sen!2str",
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
    contactMessages: ["ADMIN", "MANAGER", "ASSISTANTMANAGER"],
    chooseLesson: ["STUDENT"],
    gradesAndMeets: ["STUDENT"],
  },
  educationTerms: [
    { label: "Fall", key: "FALL_SEMESTER" },
    { label: "Spring", key: "SPRING_SEMESTER" },
  ],
  days: [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ],
};
