function setMetaDescription(content) {
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = content;
  }
}

function setTextById(id, value) {
  const node = document.getElementById(id);
  if (node) {
    node.textContent = value;
  }
}

function createLink(href, text) {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = text;
  return link;
}

function normalizeEmailOptions(emails) {
  if (!Array.isArray(emails)) {
    return [];
  }

  return emails
    .map((entry) => {
      if (typeof entry === "string") {
        return { address: entry, description: "" };
      }

      if (entry && typeof entry === "object") {
        const address = typeof entry.address === "string" ? entry.address : "";
        const description = typeof entry.description === "string" ? entry.description : "";
        return { address, description };
      }

      return { address: "", description: "" };
    })
    .filter((entry) => entry.address.length > 0);
}

function getContactLinkData(contact) {
  const emailOptions = normalizeEmailOptions(contact.emails);
  if (emailOptions.length > 0) {
    return {
      href: `mailto:${emailOptions.map((entry) => entry.address).join(",")}`,
      text: emailOptions.map((entry) => entry.address).join(" / "),
    };
  }

  return {
    href: contact.href,
    text: contact.text,
  };
}

function chooseEmailRecipient(emails) {
  const emailOptions = normalizeEmailOptions(emails);
  if (emailOptions.length === 0) {
    return Promise.resolve(null);
  }

  if (emailOptions.length === 1) {
    return Promise.resolve(emailOptions[0].address);
  }

  return new Promise((resolve) => {
    const dialog = document.createElement("dialog");
    const card = document.createElement("div");
    const title = document.createElement("p");
    const buttonGroup = document.createElement("div");
    const cancelButton = document.createElement("button");

    dialog.className = "email-picker";
    card.className = "email-picker-card";
    title.className = "email-picker-title";
    buttonGroup.className = "email-picker-buttons";
    cancelButton.className = "email-picker-cancel";

    title.textContent = "Choose an email recipient";

    const closeWith = (value) => {
      if (dialog.open) {
        dialog.close();
      }
      dialog.remove();
      resolve(value);
    };

    emailOptions.forEach((option) => {
      const button = document.createElement("button");
      const label = document.createElement("span");
      button.type = "button";
      button.className = "email-picker-option";

      label.className = "email-picker-option-label";
      label.textContent = option.address;
      button.appendChild(label);

      if (option.description) {
        const description = document.createElement("span");
        description.className = "email-picker-option-description";
        description.textContent = option.description;
        button.appendChild(description);
      }

      button.addEventListener("click", () => closeWith(option.address));
      buttonGroup.appendChild(button);
    });

    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", () => closeWith(null));

    dialog.addEventListener("cancel", () => closeWith(null));
    dialog.addEventListener("close", () => {
      if (document.body.contains(dialog)) {
        dialog.remove();
      }
    });

    card.append(title, buttonGroup, cancelButton);
    dialog.appendChild(card);
    document.body.appendChild(dialog);
    dialog.showModal();
  });
}

function wireMultiEmailClick(link, contact) {
  const emailOptions = normalizeEmailOptions(contact.emails);
  if (emailOptions.length <= 1) {
    return;
  }

  link.href = "#";
  link.addEventListener("click", async (event) => {
    event.preventDefault();

    const selectedEmail = await chooseEmailRecipient(contact.emails);
    if (!selectedEmail) {
      return;
    }

    window.location.href = `mailto:${selectedEmail}`;
  });
}

function createNetworkIcon(label) {
  const svgNS = "http://www.w3.org/2000/svg";
  const icon = document.createElementNS(svgNS, "svg");
  const normalized = label.toLowerCase();

  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("focusable", "false");

  if (normalized === "linkedin") {
    icon.innerHTML =
      '<path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.96 1.96 0 1 0 5.3 6.92 1.96 1.96 0 0 0 5.25 3ZM12.15 20h3.38v-5.63c0-1.48.28-2.9 2.11-2.9 1.8 0 1.83 1.68 1.83 3V20h3.38v-6.22c0-3.06-.66-5.41-4.24-5.41-1.72 0-2.87.94-3.34 1.84h-.05V8.5h-3.24V20Z"/>';
    return icon;
  }

  if (normalized === "github") {
    icon.innerHTML =
      '<path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.68c-2.78.61-3.37-1.18-3.37-1.18-.46-1.17-1.11-1.48-1.11-1.48-.91-.62.07-.6.07-.6 1 .07 1.54 1.05 1.54 1.05.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.97 1.03-2.67-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02A9.42 9.42 0 0 1 12 6.8c.85 0 1.7.12 2.5.36 1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.66.64.7 1.03 1.58 1.03 2.67 0 3.83-2.34 4.67-4.58 4.92.36.31.68.92.68 1.86v2.76c0 .27.18.59.69.48A10 10 0 0 0 12 2Z"/>';
    return icon;
  }

  icon.innerHTML =
    '<path d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 2v.5L12 13 4 7.5V7h16ZM4 17V9.74l7.4 5.15a1 1 0 0 0 1.2 0L20 9.74V17H4Z"/>';
  return icon;
}

function clearNode(node) {
  if (node) {
    node.textContent = "";
  }
}

export function renderShowcaseLayout(siteContent, currentYear) {
  const { contacts, profile, projects, publications } = siteContent;

  setMetaDescription(siteContent.metaDescription);
  setTextById("profile-name", profile.name);
  setTextById("profile-headline", profile.headline);
  setTextById("profile-summary", profile.summary);
  setTextById("yr", String(currentYear));

  const contactList = document.getElementById("contact-list");
  clearNode(contactList);
  contacts.forEach((contact) => {
    const item = document.createElement("li");
    const label = document.createElement("span");
    const linkData = getContactLinkData(contact);

    label.textContent = contact.label;
    item.append(label, document.createElement("br"), createLink(linkData.href, linkData.text));
    contactList?.appendChild(item);
  });

  const renderListItem = (entry, list) => {
    const item = document.createElement("li");
    const title = document.createElement("span");
    const meta = document.createElement("span");

    title.className = "pub-title";
    title.textContent = entry.title;
    meta.className = "pub-meta";
    meta.textContent = entry.meta;

    item.append(
      title,
      document.createElement("br"),
      meta,
      document.createElement("br"),
      createLink(entry.href, `${entry.cta} →`)
    );
    list?.appendChild(item);
  };

  const publicationList = document.getElementById("publication-list");
  clearNode(publicationList);
  publications.forEach((entry) => renderListItem(entry, publicationList));

  const projectSection = document.getElementById("projects-section");
  if (projectSection) projectSection.hidden = projects.length === 0;
  const projectList = document.getElementById("project-list");
  clearNode(projectList);
  projects.forEach((entry) => renderListItem(entry, projectList));
}

export function renderCleanLayout(siteContent, currentYear) {
  const { contacts, profile, projects, publications } = siteContent;

  setMetaDescription(siteContent.metaDescription);
  setTextById("profile-name", profile.name);
  setTextById("profile-headline", profile.headline);
  setTextById("profile-summary", profile.summary);
  setTextById("yr", String(currentYear));

  const contactList = document.getElementById("contact-list");
  clearNode(contactList);
  contacts.forEach((contact) => {
    const item = document.createElement("li");
    const label = document.createElement("span");
    const linkData = getContactLinkData(contact);

    label.textContent = contact.label;
    item.append(label, document.createElement("br"), createLink(linkData.href, linkData.text));
    contactList?.appendChild(item);
  });

  const renderArticle = (entry, root, ctaSuffix) => {
    const article = document.createElement("article");
    const title = document.createElement("h3");
    const meta = document.createElement("p");

    article.className = "item";
    title.textContent = entry.title;
    meta.textContent = entry.meta;
    article.append(title, meta, document.createElement("br"), createLink(entry.href, `${entry.cta} ${ctaSuffix}`));
    root?.appendChild(article);
  };

  const publicationRoot = document.getElementById("publication-list");
  clearNode(publicationRoot);
  publications.forEach((entry) => renderArticle(entry, publicationRoot, "publication"));

  const projectSection = document.getElementById("projects-section");
  if (projectSection) projectSection.hidden = projects.length === 0;
  const projectRoot = document.getElementById("project-list");
  clearNode(projectRoot);
  projects.forEach((entry) => renderArticle(entry, projectRoot, "project"));
}

export function renderEditorialLayout(siteContent, currentYear) {
  const { contacts, profile, projects, publications } = siteContent;

  setMetaDescription(siteContent.metaDescription);
  setTextById("profile-name", profile.name);
  setTextById("profile-headline", profile.headline);
  setTextById("profile-summary", profile.summary);
  setTextById("hero-photo-fallback", profile.portrait.fallback);
  setTextById("yr", String(currentYear));

  const portrait = document.getElementById("hero-portrait");
  if (portrait) {
    portrait.src = profile.portrait.src;
    portrait.alt = profile.portrait.alt;
  }

  const profileNetworkList = document.getElementById("profile-network-list");
  clearNode(profileNetworkList);
  contacts.forEach((contact) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    const linkData = getContactLinkData(contact);
    const isMail = linkData.href.startsWith("mailto:");

    item.className = "profile-network-item";
    link.href = linkData.href;
    link.className = "profile-network-link";
    link.ariaLabel = contact.label;
    link.title = linkData.text || contact.label;
    wireMultiEmailClick(link, contact);
    if (!isMail) {
      link.target = "_blank";
      link.rel = "noreferrer noopener";
    }
    link.appendChild(createNetworkIcon(contact.label));
    item.appendChild(link);
    profileNetworkList?.appendChild(item);
  });

  const renderArticle = (entry, root) => {
    const article = document.createElement("article");
    const title = document.createElement("h3");
    const meta = document.createElement("p");

    title.textContent = entry.title;
    meta.textContent = entry.meta;
    article.append(title, meta, document.createElement("br"), createLink(entry.href, entry.cta));
    root?.appendChild(article);
  };

  const publicationRoot = document.getElementById("publication-list");
  clearNode(publicationRoot);
  publications.forEach((entry) => renderArticle(entry, publicationRoot));

  const projectSection = document.getElementById("projects-section");
  if (projectSection) projectSection.hidden = projects.length === 0;
  const projectRoot = document.getElementById("project-list");
  clearNode(projectRoot);
  projects.forEach((entry) => renderArticle(entry, projectRoot));
}