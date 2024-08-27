import axios from 'axios';

export const baseUrl = axios.create({
  baseURL: 'https://apis.data.go.kr/B551011/KorService1/searchKeyword1',
  params: {
    serviceKey:
      'D6HvbqfFj6otDTGY3883h0C51xIplWlMUXEF+l5ZX9DTpTTNODdcI/6StO1BbYtjTAtOOKyj25hhnMVj4ASszw==',
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    _type: 'json',
    listYN: 'Y',
    arrange: 'A',
  },
});

export const detailUrl = axios.create({
  baseURL: 'https://apis.data.go.kr/B551011/KorService1/detailCommon1',
  params: {
    serviceKey:
      'D6HvbqfFj6otDTGY3883h0C51xIplWlMUXEF+l5ZX9DTpTTNODdcI/6StO1BbYtjTAtOOKyj25hhnMVj4ASszw==',
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
  baseURL: 'https://apis.data.go.kr/B551011/KorService1/detailImage1',
  params: {
    serviceKey:
      'D6HvbqfFj6otDTGY3883h0C51xIplWlMUXEF+l5ZX9DTpTTNODdcI/6StO1BbYtjTAtOOKyj25hhnMVj4ASszw==',
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    _type: 'json',
    imageYN: 'Y',
    subImageYN: 'Y',
    numOfRows: 10,
    pageNo: 1,
  },
});
