/**
 * ─────────────────────────────────────────────────────────────
 *  Constant Clean — SINGLE SOURCE FOR EVERY IMAGE & VIDEO
 *  All photos are royalty-free stock from Pexels (https://www.pexels.com/license/).
 *  Every entry is flagged `todo: true` → replace with the client's own job photos.
 *  To swap one: change `src` (local "/images/…" or a Pexels/Unsplash URL), `alt`, `credit`,
 *  and regenerate `blurDataURL` (any ~20px-wide base64 JPEG works).
 * ─────────────────────────────────────────────────────────────
 */

export interface MediaImage {
  src: string;
  alt: string;
  credit: string;
  /** Link to the original source page (for attribution / re-download) */
  source: string;
  blurDataURL: string;
  /** TODO: replace with client photo */
  todo: boolean;
}

const pexels = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const px = (id: number, alt: string, credit: string, blurDataURL: string): MediaImage => ({
  src: pexels(id),
  alt,
  credit: `${credit} / Pexels`,
  source: `https://www.pexels.com/photo/${id}/`,
  blurDataURL,
  todo: true, // replace with client photo
});

// ── Hero video (client-provided, AI-generated with Gemini; compressed to mp4 + webm, audio removed) ──
export const heroVideo = {
  mp4: "/videos/hero.mp4",
  webm: "/videos/hero.webm",
  credit: "Client-provided (Gemini-generated)",
  source: "gemini_generated_video_634b5488.mp4",
  todo: false,
};

/** Poster = a frame from the hero video, so the swap from image → video is seamless. */
export const heroPoster: MediaImage = {
  src: "/images/hero-poster.jpg",
  alt: "Detailers foam-washing a black SUV under hexagon LED lights",
  credit: heroVideo.credit,
  source: heroVideo.source,
  blurDataURL: "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABeAAEBAQAAAAAAAAAAAAAAAAAFBgcBAQEAAAAAAAAAAAAAAAAAAAADEAACAQMCBwEBAAAAAAAAAAABAhEAAwQhEiLwMYGxcjJhUREBAQAAAAAAAAAAAAAAAAAAADH/wAARCAAJABADASIAAhEAAxEA/9oADAMBAAIRAxEAPwDPHZrb7HIWIPb928mmMa9hM8XBbAiJbcNRPEGGonTrQGV9H0XyamP7U6P/2Q==",
  todo: false,
};

const img = {
  serviceBasic: px(4876654, "Foam-covered car being hand washed in a home driveway", "Erik Mclean", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABiAAEBAQAAAAAAAAAAAAAAAAAGAQMBAQEAAAAAAAAAAAAAAAAAAAIDEAABAwMDAwUBAAAAAAAAAAABAhEDABIhBCJxgZFSIwWxMUFREQEBAQEAAAAAAAAAAAAAAAABAAIR/8AAEQgACgAQAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8AP6eNFnrFSR427m/Mn6HSrJpopSZIbsl0gl35/lINOkLTCVAKcZcO/esPcTYCE7eMfFU4QdLf/9k="),
  servicePremium: px(6873119, "Detailer vacuuming the interior of a white car", "Tima Miroshnichenko", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABcAAEBAQAAAAAAAAAAAAAAAAAHBQYBAQEAAAAAAAAAAAAAAAAAAAECEAACAQMDBQEAAAAAAAAAAAABAhESAwBBBKEhwoFxImERAQEAAAAAAAAAAAAAAAAAAAAB/8AAEQgACgAQAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8AO7aXaLrU0VMluYIVVmSZPgT+5UG2tUfbyxMBVLKORHGb/ek0HrocKNV99pyxK//Z"),
  serviceClub: px(4870664, "Hand washing a car wheel with a sponge outdoors", "Karola G.", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABnAAEBAQEAAAAAAAAAAAAAAAAGBQcDAQEBAQAAAAAAAAAAAAAAAAACAwUQAAIBBAIBAgcBAAAAAAAAAAECEQMhBAASMUFRBSITgbFywWJhEQADAQEBAAAAAAAAAAAAAAABACERAgP/wAARCAAYABADASIAAhEAAxEA/9oADAMBAAIRAxEAPwDplge4Z7BiPlY6ju45G5MeT1pHOK4VZDTVQrrfjaR/SiwI1ZSw61dW5TSIZXKkBQ4m7PEkxFrxoD3kuMjixHwzxA8Cej6n/dmDtWY6zUzqTQwMNxIgwQQfBv8AXcYyaVWu71HqISTMGQTPp9tut4/H9bOq97ieffQmoL//2Q=="),
  how1: px(5693653, "Close-up of thick snow foam on car paint", "Jarne Aerts", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABnAAEBAQEAAAAAAAAAAAAAAAAFBAYDAQEBAQAAAAAAAAAAAAAAAAAAAQMQAAIABAQCCwEBAAAAAAAAAAECEQADEgRBISIxUcKyNAXhoYORM/CCExQRAQAAAAAAAAAAAAAAAAAAAAD/wAARCAAYABADASIAAhEAAxEA/9oADAMBAAIRAxEAPwDTVN9OKqyHUZawyPMGQaeHox2o1J+IemSCDzt1XSaP9UaBYBWZW4ZcPsJz4xjswMABdCCidBJgW/pephuXzU+Inth1AqxIutucAewhzzhJ3dnyH1OjLGF7R+R1jJH/2Q=="),
  how2: px(4876645, "Detailer pressure-washing a car beside a house", "Erik Mclean", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABZAAEBAQAAAAAAAAAAAAAAAAAFBAcBAQAAAAAAAAAAAAAAAAAAAAIQAAEEAgIDAQAAAAAAAAAAAAERAgMEACExErJxQkERAQEAAAAAAAAAAAAAAAAAAAEA/8AAEQgACgAQAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8Asv33MswuCOYYyW8oqoTpF1xymNm5E6Je8f4U7AEL7wucAikoB0/wzI5QBK7X1hJpf//Z"),
  how3: px(4876678, "Clean white car wheel being rinsed in a driveway", "Erik Mclean", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABfAAADAQAAAAAAAAAAAAAAAAAABAUGAQEBAAAAAAAAAAAAAAAAAAAAARAAAQMEAgEFAQAAAAAAAAAAAQIDETESIQAiBFEjYUEysQURAQEAAAAAAAAAAAAAAAAAAAAR/8AAEQgACgAQAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8AaV2g0llhhwtfa6ZkRRIKh8+1YxojvI9RD7wNpFhWRORmggx5qJ2h/H59ZF3LKq5/d0T7aLVcU08DVWP/2Q=="),
  areas: px(4876641, "Foamed sports car being washed on a residential driveway", "Erik Mclean", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABfAAADAQAAAAAAAAAAAAAAAAACAwQFAQEAAAAAAAAAAAAAAAAAAAACEAACAgEDBAMBAAAAAAAAAAABAgMREiEAQVEEMSITBWFxEQEBAQEAAAAAAAAAAAAAAAAAASEx/8AAEQgACgAQAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8AgUrPF8vcqzDI+xZsQP4NB0FDeY8ypHNFEWMTqaVzeFcrrz+7f9cSZlW/UhrXg6cjxs+8URISgCZaHEY2OhrztzYHH//Z"),
  galExt1After: px(3399937, "Glossy clean alloy wheel with water beads", "Jan Kop\u0159iva", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABeAAEBAQAAAAAAAAAAAAAAAAAGAgcBAQEAAAAAAAAAAAAAAAAAAAIDEAACAQMEAwEBAAAAAAAAAAABAhEhAAMSEzFBYVEEgQURAQEBAQAAAAAAAAAAAAAAAAECABL/wAARCAAKABADASIAAhEAAxEA/9oADAMBAAIRAxEAPwAAuLHUs5UiCsiO5oayfBi6+lRtLQKQWLNNDPH7Frf6IGvGYE7Zr3eYuzayNR59m5S9A50c0m//2Q=="),
  galExt2After: px(16505293, "Clean red car parked on a home driveway", "FBO Media", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABbAAEBAQAAAAAAAAAAAAAAAAAGBQcBAQAAAAAAAAAAAAAAAAAAAAMQAQABBAMBAQEAAAAAAAAAAAECEhEDADNxBJFhIREAAwEBAAAAAAAAAAAAAAAAABEhgTH/wAARCAAJABADASIAAhEAAxEA/9oADAMBAAIRAxEAPwDNsOaRyVA/yqMbJf8ATaOT2EaiE5pS1CXHpbofNUYOPTvt459abGi5dP/Z"),
  galIntAfter: px(1633602, "Spotless white leather car seats", "Mike Bird", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABZAAEBAQAAAAAAAAAAAAAAAAAEBQYBAQEAAAAAAAAAAAAAAAAAAAIDEAACAgEFAQEBAAAAAAAAAAABAhEDIQUAMRIEQWFREQEAAAAAAAAAAAAAAAAAAAAA/8AAEQgACgAQAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8ARQteo0lEjsGWSAG6kGJ+Ajkfo3GSNM9V9Flkg9XrJAhpGeMA/N4nwOyelerMsnMEieP5tupktqCyScJzndRf/9k="),
  ig1: px(5693651, "Foam-covered wheel during an outdoor wash", "Jarne Aerts", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABjAAEBAQEAAAAAAAAAAAAAAAAGBAMFAQEBAQAAAAAAAAAAAAAAAAACAAEQAAEDAwMCBwEAAAAAAAAAAAECAxIRADEEIVFBcbHBodGBIlJhEQEBAAAAAAAAAAAAAAAAAAAAAf/AABEIABgAEAMBIgACEQADEQD/2gAMAwEAAhEDEQA/AOqdVIJUUJ+xIxM7dKc2Z1WpnJptEP1tE7/y8mEQCkKlULSDSpiCMgcnFbVKbZYaIUFTVQnBKR0HvbpJnHmWKBIk4AAXOaD172JdfUtUqntW7n8j58LOnyvE/9k="),
  ig2: px(6873020, "Detailing brush cleaning a foamed car", "Tima Miroshnichenko", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABdAAEBAAAAAAAAAAAAAAAAAAAGAQEBAQAAAAAAAAAAAAAAAAAAAAEQAAEDBAEFAQAAAAAAAAAAAAECAxEAITFhEiKxcUEjMxEBAQEBAAAAAAAAAAAAAAAAAAERIf/AABEIAAoAEAMBIgACEQADEQD/2gAMAwEAAhEDEQA/ABheZLYUltbYJzygSNXmqtt9XEtrB6ZKck7Ta9EW/wA1D1I7UkeJBMW+aceKLeXH/9k="),
  ig3: px(20856506, "Foam-covered rear of a red car", "Erik Mclean", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABoAAEBAQAAAAAAAAAAAAAAAAAHBQYBAQEBAAAAAAAAAAAAAAAAAAQAAhAAAgEDAgMJAQAAAAAAAAAAAQIRAyEAEjFRBEEGBRQTcYFiskIyEQADAAMBAAAAAAAAAAAAAAAAEgECEYEh/8AAEQgAGAAQAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8AagE3DnIPMVXUGE1AX1ahEceJzC+LejNI6maJkX3HDfKK8wa4g66RS8i4PxIAO/URkITJW15wNUrO9y0CIPS2b/u0l6tRVcMvl6gbRqm4kYX0/wCG9sQ+z/79G+2bDtaf/9k="),
  ig4: px(7154631, "Detailer wiping a car hood with a microfiber towel", "Torque Detail", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABfAAEBAAAAAAAAAAAAAAAAAAAHCAEBAQAAAAAAAAAAAAAAAAAAAgMQAAIBAwQDAQEAAAAAAAAAAAECAxEhABJBMRMEIlGxBREAAgMBAAAAAAAAAAAAAAAAAQACEXFh/8AAEQgACgAQAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8AQ3n8sNaNytaWC6uOaGlv3DX+pP3tGPIeaFPbSdAvf2qBcHgYiqxq1zvvkzysWklLEk9m5r9y0ggGu6//2Q=="),
  ig5: px(6870296, "Buffer polishing a car hood", "Gustavo Fring", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABhAAEBAAAAAAAAAAAAAAAAAAAFBgEBAQAAAAAAAAAAAAAAAAAAAgMQAAEEAQMDBQEAAAAAAAAAAAECAxEhAAQSIsFhgXFRI0ExExEAAwEBAAAAAAAAAAAAAAAAAgEAMRH/wAARCAAKABADASIAAhEAAxEA/9oADAMBAAIRAxEAPwAhSzp2mjuVCuRCiIgj8J9ffD9Il7WO/wAwYIBUZNEdsbTbCwbG5HXJlni+mK+VIqqIMjz95Q1wnEcV/9k="),
  ig6: px(4892130, "Man washing a car with a hose outside a home", "Amiel Joseph Labrador", "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgUFBcUFxsbGxsbGyAeICEhISAgICAhISEkJCQqKiokJCQhISQkKCgqKi4vLisrKisvLzIyMjw8OTlGRkhWVmf/xABYAAEBAAAAAAAAAAAAAAAAAAAGBAEBAQAAAAAAAAAAAAAAAAAAAQIQAAICAgIDAQEAAAAAAAAAAAECEQMABCFRsXI0MTIRAQAAAAAAAAAAAAAAAAAAAAD/wAARCAAKABADASIAAhEAAxEA/9oADAMBAAIRAxEAPwANVfrIqzUC0cmJg9xGXbYmhyqqFhHDCQYY/g4GG0Y9n+h4OPdr5G9a8gv/2Q=="),
} satisfies Record<string, MediaImage>;

export const media = {
  hero: { poster: heroPoster, video: heroVideo },
  services: {
    full: img.serviceBasic,
    interior: img.servicePremium,
    maintenance: img.serviceClub,
  },
  howItWorks: [img.how1, img.how2, img.how3],
  areas: img.areas,
  /**
   * TODO: Replace with client's real before/after photos of the same car.
   * For now each item has ONE stock photo; BeforeAfter fakes the "before" with a dirt filter.
   * Real pairs: add `before` and `after` next to `image` — both must exist to be used.
   */
  gallery: {
    ext1: { image: img.galExt1After },
    ext2: { image: img.galExt2After },
    int1: { image: img.galIntAfter },
  } satisfies Record<string, { image: MediaImage; before?: MediaImage; after?: MediaImage }>,
  instagram: [img.ig1, img.ig2, img.ig3, img.ig4, img.ig5, img.ig6],
  /**
   * Review avatars: intentionally null → initials are shown.
   * Only use real customer photos with their permission (never stock faces for testimonials).
   */
  reviewAvatars: {} as Record<string, MediaImage | null>,
  /** Open Graph / social share image: the client logo centred on the brand black (1200×630). */
  og: {
    src: "/images/og.png",
    alt: "Constant Clean Auto Detailing logo",
    width: 1200,
    height: 630,
  },
};
