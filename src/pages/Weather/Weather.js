import { DebounceInput } from "react-debounce-input";
import { background } from "../../assets/imgs";

import classNames from "classnames/bind";
import styles from "./Weather.module.scss";
import { useEffect, useState } from "react";
import { getWeather } from "../../services/weatherService";

const api = {
  key: "34f6d1d173120c19fac48e56556c7e70",
};

const cx = classNames.bind(styles);

function Weather() {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");

  const dateBuilder = (d) => {
    let months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    let days = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
  };


  const handleSearchLocation = async (e) => {
    if (e.target.value.trim() != "") {
      setQuery(e.target.value);
    }
  };

  const timeBulder = (d) => {
    const date = new Date(d*1000)
    let hour =  date.getHours()
    let minute =  date.getMinutes()
    return `${hour}:${minute}`
  }

  useEffect(() => {
    const ApiWeather = async () => {
      const apiWeather = await getWeather({
        params: {
          q: query,
          units: "metric",
          APPID: api.key,
        },
      });
      console.log(apiWeather);
      setWeather(apiWeather);
    };
    if (query != "") {
      ApiWeather();
    }
  }, [query]);

  return (
    <div
      className={cx(
        "wrapper",
        "d-flex",
        "align-items-center",
        "justify-content-center"
      )}
    >
      <div
        className={cx("content", "d-flex", "align-items-center", "flex-column")}
        style={{
          background: `url(${
            weather?.main?.temp > 22 ? background.warmBg : background.coldBg
          }) top center/contain no-repeat`,
        }}
      >
        <DebounceInput
          className={cx("search", "mt-4")}
          minLength={2}
          debounceTimeout={1000}
          onChange={handleSearchLocation}
          placeholder={"Search..."}
        />
        {Object.values(weather).length > 0 ? (
          Object.values(weather).length == 1 ? (
            <div className={cx("location-box")}>{weather?.message}</div>
          ) : (
            <>
              <div className={cx("location-box")}>
                <div className={cx("location")}>
                  {weather?.name}, {weather?.sys?.country}
                </div>
                <div className={cx("time")}>{dateBuilder(new Date())}</div>
              </div>
              <div className={cx("location-box", "position-relative")}>
                <div className={cx("temp", "position-relative")}>
                  {weather?.main?.temp}&deg;C
                  <img
                  className={cx("icon", "position-absolute")}
                  src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                />
                </div>
                
                <p className={cx("temp-detail")}>
                  Thấp nhất: {weather?.main?.temp_min}&deg;C, Cao nhất:  {weather?.main?.temp_max}&deg;C
                </p>
                <p className={cx("temp-detail")}>
                  Mặt trời mọc: {timeBulder(weather?.sys?.sunrise)}, Lặn:  {timeBulder(weather?.sys?.sunset)}
                </p>
                <div className={cx("weather", "position-absolute")}>
                  It's {weather?.weather[0]?.main}
                </div>
              </div>
            </>
          )
        ) : (
          <div className={cx("location-box")}>Nhập địa chỉ của bạn !</div>
        )}
      </div>
    </div>
  );
}

export default Weather;
