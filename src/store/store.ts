import BottomSheet from '@gorhom/bottom-sheet';
import {RefObject} from 'react';
import {ScrollView} from 'react-native';
import {create} from 'zustand';

type PageInfo = {
  pageInfo: string;
  setPageInfo: (pageName: string) => void;
};

type BottomSheetRefType = {
  bottomSheetRef: RefObject<BottomSheet>;
  setBottomSheetRef: (ref: RefObject<BottomSheet>) => void;
};

type ScrollRefType = {
  scrollRef: RefObject<ScrollView>;
  setScrollRef: (ref: RefObject<ScrollView>) => void;
};

type AreaSelected = {
  areaSelected: string;
  setAreaSelected: (area: string) => void;
};

type ItemInfo = {
  itemTitle: string;
  itemId: string;
  setItemTitle: (item: string) => void;
  setItemId: (id: string) => void;
};

type ContentsSelected = {
  contentsSelected: number;
  contentTitle: string;
  setContentsSelected: (contents: number, title: string) => void;
};

export const usePageInfo = create<PageInfo>(set => ({
  pageInfo: '',
  setPageInfo: pageName => set({pageInfo: pageName}),
}));

export const useBottomSheetRef = create<BottomSheetRefType>(set => ({
  bottomSheetRef: {current: null},
  setBottomSheetRef: ref => set({bottomSheetRef: ref}),
}));

export const useScrollRef = create<ScrollRefType>(set => ({
  scrollRef: {current: null},
  setScrollRef: ref => set({scrollRef: ref}),
}));

export const useAreaSelected = create<AreaSelected>(set => ({
  areaSelected: '서울',
  setAreaSelected: area => set({areaSelected: area}),
}));

export const useContentsSelected = create<ContentsSelected>(set => ({
  contentsSelected: 12,
  contentTitle: '관광지',
  setContentsSelected: (contents, title) =>
    set({contentsSelected: contents, contentTitle: title}),
}));

export const useItemInfo = create<ItemInfo>(set => ({
  itemTitle: '',
  itemId: '',
  setItemTitle: item => set({itemTitle: item}),
  setItemId: id => set({itemId: id}),
}));
