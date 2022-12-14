import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [coins, setCoins] = useState([]);
  const [timePeriod, setTimePeriod] = useState("24h");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b77330c3e0msh45c6f54ef5955d1p19f6d4jsnf3111eb84e00",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };
  useEffect(() => {
    fetch(
      `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=100&offset=0`,
      options
    )
      .then((response) => response.json())
      .then((response) => setCoins(response.data.coins))
      .catch((err) => console.error(err));
  }, [timePeriod]);

  const TimePeriods = ["1h", "3h", "12h", "24h", "7d", "30d", "3m", "1y"];

  return (
    <>
      <select
        defaultValue="24h"
        onChange={(e) => setTimePeriod(e.target.value)}
      >
        {TimePeriods.map((timePeriod) => (
          <option key={timePeriod} value={timePeriod}>
            {timePeriod}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            return (
              <tr key={coin.uuid}>
                <td>{coin.rank}</td>
                <td>{coin.name}</td>

                {coin.sparkline.slice(14).map((sparkline, i) => {
                  return (
                    <td
                      className={`${
                        coin.sparkline[i + 13] < coin.sparkline[i + 14]
                          ? "green"
                          : "red"
                      }`}
                      key={i}
                    >
                      {sparkline.substring(0, 7)}{" "}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default App;
