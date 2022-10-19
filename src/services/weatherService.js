import request from "../httpRequest/weatherRequest";

export const getWeather = async (option = {}) => {
  try {
    const weather = await request.get("weather", option);
    return weather.data;
  } catch (err) {
    return {
        message: 'Không tìm thấy địa chỉ của bạn'
    }
  }
};
