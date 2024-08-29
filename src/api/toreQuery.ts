import {useQuery} from '@tanstack/react-query';
import {baseUrl, detailImageUrl, detailUrl} from './axios';
import {DetailItemType} from '../types/detailType';

export const useGetToreList = (
  keyword: string,
  numOfRows: number,
  contentType: number,
) => {
  const queryFn = () =>
    baseUrl
      .get('', {
        params: {
          numOfRows,
          pageNo: 1,
          keyword,
          contentTypeId: contentType,
        },
      })
      .then(res => res.data.response.body.items.item);
  return useQuery({
    queryKey: [`tourList${keyword}`],
    queryFn,
  });
};

export const useGetDetailData = (id: number, contentType: number) => {
  const queryFn = () =>
    detailUrl
      .get('', {
        params: {
          contentId: id,
          contentTypeId: contentType,
        },
      })
      .then(res => res.data.response.body.items.item);
  return useQuery({
    queryKey: [`${id}detailData`],
    queryFn,
  });
};

export const useGetDetailImage = (id: number) => {
  const queryFn = () =>
    detailImageUrl
      .get('', {
        params: {
          contentId: id,
        },
      })
      .then(res => {
        return res.data.response.body.items.item || [];
      });
  return useQuery({
    queryKey: [`${id}detailImage`],
    queryFn,
  });
};
