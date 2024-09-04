import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {baseUrl, detailImageUrl, detailUrl} from './axios';

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

export const useGetToreList1 = (
  keyword: string,
  numOfRows: number,
  contentType: number,
) => {
  const queryFn = ({pageParam = 1}) =>
    baseUrl
      .get('', {
        params: {
          numOfRows,
          pageNo: pageParam,
          keyword,
          contentTypeId: contentType,
        },
      })
      .then(res => {
        const items = res.data.response.body.items.item;
        const totalCount = res.data.response.body.totalCount;
        const totalPages = Math.ceil(totalCount / numOfRows);
        return {
          items,
          nextPage: pageParam < totalPages ? pageParam + 1 : undefined,
        };
      });
  return useInfiniteQuery({
    queryKey: [`tourList${keyword}`],
    queryFn,
    getNextPageParam: lastPage => lastPage.nextPage,
    initialPageParam: 1,
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
