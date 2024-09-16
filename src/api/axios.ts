import axios from 'axios';
import {
  TOUR_DETAIL_BASE_URL,
  TOUR_IMAGE_BASE_URL,
  TOUR_SEARCH_BASE_URL,
  TOUR_SERVICE_KEY,
} from 'react-native-dotenv';

export const baseUrl = axios.create({
  baseURL: TOUR_SEARCH_BASE_URL,
  params: {
    serviceKey: TOUR_SERVICE_KEY,
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    _type: 'json',
    listYN: 'Y',
    arrange: 'A',
  },
});

export const detailUrl = axios.create({
  baseURL: TOUR_DETAIL_BASE_URL,
  params: {
    serviceKey: TOUR_SERVICE_KEY,
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    _type: 'json',
    defaultYN: 'Y',
    overviewYN: 'Y',
    numOfRows: 1,
    pageNo: 1,
    firstImageYN: 'Y',
    areacodeYN: 'Y',
    addrinfoYN: 'Y',
    mapinfoYN: 'Y',
  },
});

export const detailImageUrl = axios.create({
  baseURL: TOUR_IMAGE_BASE_URL,
  params: {
    serviceKey: TOUR_SERVICE_KEY,
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    _type: 'json',
    imageYN: 'Y',
    subImageYN: 'Y',
    numOfRows: 10,
    pageNo: 1,
  },
});
