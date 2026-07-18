import "./about.css";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h2>About HealthCare+</h2>
        <p>Your health, our priority.</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h3>Our Mission</h3>
          <p>
            HealthCare+ is a modern platform designed to simplify the daily
            management of our clinic. Our goal is to provide healthcare
            professionals with an intuitive tool to manage patients, doctors,
            appointments, and medical records in a centralized and secure
            manner.
          </p>
        </section>

        <section className="about-section">
          <h3>Infos</h3>
          <ul className="info-list">
            <li>
              <strong>Adress :</strong> 123 Silk road, 75000 Los Angeles, USA
            </li>
            <li>
              <strong>Phone :</strong> +1 234 567 890
            </li>
            <li>
              <strong>Email :</strong> contact@healthcare-plus.com
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h3>Opening Hours</h3>
          <table className="hours-table">
            <tbody>
              <tr>
                <td>Monday - Friday</td>
                <td>08:00 - 20:00</td>
              </tr>
              <tr>
                <td>Saturday</td>
                <td>09:00 - 13:00</td>
              </tr>
              <tr>
                <td>Sunday</td>
                <td>Closed</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
