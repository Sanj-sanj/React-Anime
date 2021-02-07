import React from "react";

export default function ExternalLinks({ externalLinks }) {
  const externals = [
    { ["Official Site"]: "site_ico" },
    { ["Twitter"]: "twt_ico" },
    { ["Crunchyroll"]: "crn_ico" },
    { ["VRV"]: "vrv_ico" },
    { ["Funimation"]: "funi_ico" },
    { ["Hulu"]: "hulu_ico" },
    { ["Youtube"]: "ytb_ico" },
    { ["AnimeLab"]: "alab_ico" },
    { ["Hidive"]: "hidive_ico" },
  ];
  return (
    <div className="external-links">
      <h5 className="card-title external-links-title">External links</h5>
      <ul className="links-section">
        {externalLinks
          ? externalLinks.map((link) => {
              let found;
              externals.forEach((entry) =>
                Object.prototype.hasOwnProperty.call(entry, link.site) == true
                  ? (found = entry)
                  : false
              );
              if (found) {
                return (
                  <li key={link.id}>
                    <a
                      className={found[link.site]}
                      title={link.site}
                      href={link.url}
                    >
                      #
                    </a>
                  </li>
                );
              }
            })
          : "No links found."}
      </ul>
    </div>
  );
}
