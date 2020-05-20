import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import CardItem from "../components/CardItem";
import moment from "moment";

function Home({ res }) {
  const [currentTab, setCurrentTab] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [holidays, setHolidays] = useState({
    national: [],
    observance: [],
    all: [],
  });
  const months = moment.months();

  useEffect(() => {
    if (res.meta.code === 200) {
      const nationalDays = res.response.holidays.filter((item) =>
        item.type.includes("National holiday")
      );

      const observanceDays = res.response.holidays.filter((item) =>
        item.type.includes("Observance")
      );

      const nationalGrouped = months.map((month, index) =>
        nationalDays.filter((day) => day.date.datetime.month === index + 1)
      );

      const observanceGrouped = months.map((month, index) =>
        observanceDays.filter((day) => day.date.datetime.month === index + 1)
      );

      const allGrouped = months.map((month, index) =>
        [...nationalDays, ...observanceDays].filter(
          (day) => day.date.datetime.month === index + 1
        )
      );

      setHolidays({
        national: nationalGrouped,
        observance: observanceGrouped,
        all: allGrouped,
      });
    }
  }, []);

  const monthChange = ({ target: { value } }) => {
    setSelectedMonth(value);
  };

  return (
    <Layout>
      <div className="container section">
        <div className="tabs is-centered is-boxed">
          <ul>
            <li
              className={`${currentTab === "all" ? "is-active" : ""}`}
              onClick={() => setCurrentTab("all")}>
              <a>
                <span>All</span>
              </a>
            </li>
            <li
              className={`${currentTab === "national" ? "is-active" : ""}`}
              onClick={() => setCurrentTab("national")}>
              <a>
                <span>National</span>
              </a>
            </li>
            <li
              className={`${currentTab === "observance" ? "is-active" : ""}`}
              onClick={() => setCurrentTab("observance")}>
              <a>
                <span>Observance</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="is-100w flex-content-right">
          {selectedMonth ? (
            <button
              className="delete is-medium has-background-danger mr-2"
              onClick={() => setSelectedMonth("")}></button>
          ) : null}

          <div className="select">
            <select value={selectedMonth} onChange={monthChange}>
              <option value="" disabled>
                Month
              </option>
              {months.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="content columns is-multiline">
          {holidays[currentTab].length ? (
            holidays[currentTab].map((month, index) =>
              (month.length || index + 1 == Number(selectedMonth)) &&
              (Number(selectedMonth) === index + 1 ||
                !Number(selectedMonth)) ? (
                <section key={index} className="is-100w mb-4">
                  <h1 className="title is-100w has-text-danger">
                    {months[index]}
                  </h1>
                  <div className="columns is-multiline">
                    {month.length ? (
                      month.map((day, index) => (
                        <div
                          key={index}
                          className="column is-4 is-flex reverse-columns">
                          <CardItem day={day} />
                        </div>
                      ))
                    ) : (
                      <div key={index} className="column">
                        <h1 className="title is-size-4">No results</h1>
                      </div>
                    )}
                  </div>
                </section>
              ) : null
            )
          ) : (
            <h1 className="has-text-centered is-100w mt-4">No results</h1>
          )}
        </div>
      </div>
    </Layout>
  );
}

Home.getInitialProps = async (ctx) => {
  const options = {
    year: 2020,
    country: "PL",
  };
  const res = await fetch(
    `https://calendarific.com/api/v2/holidays?&api_key=${process.env.API_KEY}&country=${options.country}&year=${options.year}`
  );

  const json = await res.json();
  return { res: json };
};

export default Home;
