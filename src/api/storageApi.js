import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class StorageApi {
  importList = params => {
    const url = MAIN_URL.concat('/imports');
    return axiosClient.get(url, { params });
  };

  exportList = params => {
    const url = MAIN_URL.concat('/exports');
    return axiosClient.get(url, { params });
  };

  reportList = params => {
    // console.log(params)
    const url = MAIN_URL.concat(`/reports`);
    return axiosClient.get(url, { params });
  };

  editReport = (id, body) => {
    const url = MAIN_URL.concat(`/reports/${id}`);
    return axiosClient.put(url, body);
  };

  editImport = (id, body) => {
    const url = MAIN_URL.concat(`/imports/${id}`);
    return axiosClient.put(url, body);
  };

  updateImportQuantityByPackage = body => {
    const url = MAIN_URL.concat(`/imports/update-quantity`);
    return axiosClient.put(url, body);
  };

  updateExportQuantityByPackage = body => {
    const url = MAIN_URL.concat(`/exports/update-quantity`);
    return axiosClient.put(url, body);
  };
}

const storageApi = new StorageApi();
export default storageApi;
