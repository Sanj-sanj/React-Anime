import React from "react";
import "./externalLinks.css";

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
//add instagram
export default function ExternalLinks({ externalLinks }) {
  return (
    <div>
      <h5 className="card-title">External links</h5>
      <ul className="links-section">
        {externalLinks
          ? externalLinks.map((link) => {
              let found = externals.find((entry) => entry[link.site]);
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
