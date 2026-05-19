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
      title: "The Mirror Systems Benches Kinematics Development for Sirius/LNLS",
      meta: "JACoW ICALEPCS2021 - 2022",
      href: "https://inspirehep.net/literature/2076524",
      cta: "Read",
    },
    {
      title: "The Control System of the Four-Bounce Crystal Monochromators for SIRIUS/LNLS Beamlines",
      meta: "JACoW ICALEPCS2021 - 2022",
      href: "https://inspirehep.net/literature/2076537",
      cta: "Read",
    },
    {
      title: "Position Scanning Solutions at the TARUMÃ Station at the CARNAÚBA Beamline at Sirius/LNLS",
      meta: "JACoW ICALEPCS2021 - 2022",
      href: "https://inspirehep.net/literature/2076611",
      cta: "Read",
    },
    {
      title: "Four-Bounce Crystal Monochromators for the Sirius/LNLS Beamlines",
      meta: "JACoW MEDSI2020 - 2021",
      href: "https://inspirehep.net/literature/1978564",
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