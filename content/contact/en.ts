/** Contact band and form copy, shared by Home, Contact and every "Let's talk" band. */
export const enContact = {
  /** The Contact page; its lede is the band's. */
  page: {
    title: "Contact",
    directTitle: "Reach me directly",
    whatsappValue: "Message me",
  },
  band: {
    title: "Let's talk.",
    lede: "Write to me about a role you're hiring for or a product you want built.",
    hiring: { prefix: "Hiring?", label: "Tell me about the role" },
    project: { prefix: "Have a project?", label: "Let's build it" },
  },
  reply: "I reply within 24 hours.",
  form: {
    label: "Contact form",
    title: "Send a message",
    required: "All fields are required.",
    topic: {
      legend: "I'm reaching out about",
      options: { role: "A role", project: "A project", other: "Something else" },
    },
    name: "Name",
    email: "Email",
    message: "Message",
    messageHint: "The role, or the product you want built.",
    submit: "Send message",
    sending: "Sending…",
    sendingStatus: "Sending your message…",
    sent: {
      title: "Message sent.",
      text: "Thanks. I'll reply within 24 hours at the email you gave.",
      again: "Send another message",
    },
    summary: {
      one: "*Your message wasn't sent.* Fix the field below, or email me directly at {$email}.",
      many: "*Your message wasn't sent.* Fix the fields below, or email me directly at {$email}.",
      network: "*Your message wasn't sent.* Check your connection and try again, or email me directly at {$email}.",
      unavailable: "*Your message wasn't sent.* The form isn't working right now. Email me directly at {$email}.",
    },
    errors: {
      topicMissing: "Choose what you're writing about.",
      nameMissing: "Add your name.",
      emailMissing: "Add your email address, like sara@company.com",
      emailNoAt: "Add the @, like sara@company.com",
      emailNoLocal: "Add the part before the @, like sara",
      emailNoDomain: "Add the part after the @, like company.com",
      emailInvalid: "Check the email address, like sara@company.com",
      messageMissing: "Add your message: the role, or the product you want built.",
    },
  },
};

export type ContactCopy = typeof enContact;
export type FormCopy = ContactCopy["form"];
