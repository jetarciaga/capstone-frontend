import React from "react";
import "./Announcement.scss";

const Announcement = () => {
  return (
    <div className="announcement-container">
      <h1>Announcements</h1>
      <hr />
      <div className="announcements">
        <article>
          <header>
            <h2>Kapitan Gerry Teves 5G Agenda</h2>
            <p>
              <time datetime="2025-01-21">January 21, 2025</time> | By: Barangay
              Putatan
            </p>
          </header>
          <section>
            <p>
              Isa po sa 5G Agenda ng ating Kapitan Gerry Teves ang GARANTISADONG
              SERBISYO kaya naman ginagawa po ng ating kapitan ang lahat ng
              paraan upang makapagbaba ng mga serbisyong paki-pakinabang sa
              ating mga kabarangay. Sa darating na Martes, (January 21, 2024)
              ganap na alas 8 ng umaga ang SSS e-Wheels ay nasa Barangay
              Putatan, Covered Court para sa kanilang mga serbisyo.
              <br />
              <span>
                #AlagangTevesSerbisyongDBest #BarangayPutatan #kapitangerryteves
                #GarantisadongSerbisyo
              </span>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Announcement;
