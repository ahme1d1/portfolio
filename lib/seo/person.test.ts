import { describe, expect, it } from "vitest";
import { personJsonLd, serializeJsonLd } from "./person";

describe("personJsonLd", () => {
  it("describes Ahmed as a Person in the page's language", () => {
    const person = personJsonLd("ar", "/_next/static/media/portrait.png");
    expect(person).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "أحمد جبل",
      alternateName: "Ahmed Gabal",
      jobTitle: "مهندس واجهات أمامية أول",
      url: "https://ahmedgabal.vercel.app/ar/",
      image: "https://ahmedgabal.vercel.app/_next/static/media/portrait.png",
      email: "mailto:ahmedadel8045@gmail.com",
      sameAs: ["https://www.linkedin.com/in/ahmedadelgabal", "https://github.com/ahme1d1"],
      worksFor: { "@type": "Organization", name: "VOIS", url: "https://www.voiscentre.com/" },
      knowsLanguage: ["en", "ar"],
    });
  });

  it("has no inline markup left in its text", () => {
    expect(JSON.stringify(personJsonLd("ar", "/p.png"))).not.toMatch(/[{}*]\w/);
  });
});

describe("serializeJsonLd", () => {
  it("cannot close the script tag it sits in", () => {
    const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("<");
    expect(JSON.parse(out)).toEqual({ name: "</script><script>alert(1)</script>" });
  });
});
