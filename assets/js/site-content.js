const portraitSrc = new URL("../images/portrait.jpg", import.meta.url).href;

export const siteContent = Object.freeze({
  metaDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  profile: {
    name: "Leandro Martins dos Santos",
    headline: "Mechatronics and Motion Control Engineering for High-Precision Systems",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    portrait: {
      src: portraitSrc,
      alt: "Portrait of Leandro Martins",
      fallback: "LMdS",
    },
  },
  contacts: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/leandro-martins-dos-santos",
      text: "linkedin.com/in/leandro-martins-dos-santos",
    },
    {
      label: "GitHub",
      href: "https://github.com/LeandroMartinsdS",
      text: "github.com/LeandroMartinsdS",
    },
    {
      label: "Email",
      href: "mailto:leandro.martins.ctrleng@gmail.com",
      text: "leandro.martins.ctrleng@gmail.com",
    },
  ],
  publications: [
    {
      title: "Your Paper Title",
      meta: "Lorem ipsum dolor sit amet - 2026",
      href: "#",
      cta: "Read",
    },
  ],
  projects: [
    {
      title: "Project Name",
      meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      href: "#",
      cta: "View",
    },
  ],
});

export const currentYear = new Date().getFullYear();