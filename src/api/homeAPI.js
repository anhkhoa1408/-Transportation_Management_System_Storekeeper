import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class HomeAPI {
  getDriverStatus = () => {
    const url = MAIN_URL.concat('/driver/status');
    return axiosClient.get(url);
  };
  getStorekeeperStatus = () => {
    const url = MAIN_URL.concat('/storekeeper/status');
    return axiosClient.get(url);
  };
}
const homeAPI = new HomeAPI();
export default homeAPI;
