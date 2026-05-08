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

    label.textContent = contact.label;
    item.append(label, document.createElement("br"), createLink(contact.href, contact.text));
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

    label.textContent = contact.label;
    item.append(label, document.createElement("br"), createLink(contact.href, contact.text));
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

  const contactList = document.getElementById("contact-list");
  clearNode(contactList);
  contacts.forEach((contact) => {
    const item = document.createElement("li");
    item.appendChild(createLink(contact.href, contact.text));
    contactList?.appendChild(item);
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

  const projectRoot = document.getElementById("project-list");
  clearNode(projectRoot);
  projects.forEach((entry) => renderArticle(entry, projectRoot));
}