import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class PackageApi {
  getImportedPackage = params => {
    const url = MAIN_URL.concat('/packages/in-storage');
    return axiosClient.get(url, { params });
  };

  editPackage = (id, data) => {
    const url = MAIN_URL.concat(`/packages/${id}`);
    return axiosClient.put(url, data);
  };

  editPackage = (id, data) => {
    const url = MAIN_URL.concat(`/packages/${id}`);
    return axiosClient.put(url, data);
  };

  getPackage = id => {
    const url = MAIN_URL.concat(`/packages/${id}`);
    return axiosClient.get(url);
  };

  getScannedPackage = id => {
    const url = MAIN_URL.concat(`/packages/scanned/${id}`);
    return axiosClient.get(url);
  };
}

const packageApi = new PackageApi();
export default packageApi;
