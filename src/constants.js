export const params = {
  facebook: {
    url: {
      base: "//www.facebook.com/sharer/sharer.php",
      params: {
        u: "",
      },
    },
    text: "Share via Facebook",
  },
  twitter: {
    url: {
      base: "//twitter.com/intent/tweet",
      params: {
        text: "",
        url: "",
        via: "",
      },
    },
    text: "Share via Twitter",
  },
  linkedin: {
    url: {
      base: "//www.linkedin.com/shareArticle",
      params: {
        mini: true,
        title: "",
        url: "",
        source: "",
        summary: "",
      },
    },
    text: "Share via Linkedin",
  },
  pinterest: {
    url: {
      base: "//pinterest.com/pin/create/link/",
      params: {
        url: "",
        media: "",
        description: "",
      },
    },
    text: "Share via Pinterest",
  },
  vk: {
    url: {
      base: "//vk.com/share.php",
      params: {
        noparse: true,
        url: "",
        title: "",
        image: "",
        description: "",
      },
    },
    text: "Share via VK",
  },
  reddit: {
    url: {
      base: "//www.reddit.com/submit",
      params: {
        url: "",
        title: "",
      },
    },
    text: "Share via Reddit",
  },
  tumblr: {
    url: {
      base: "//www.tumblr.com/share/link",
      params: {
        url: "",
        description: "",
      },
    },
    text: "Share via tumblr",
  },
};
