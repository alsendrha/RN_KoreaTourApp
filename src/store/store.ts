import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {ScrollView} from 'react-native';
import {create} from 'zustand';

type BottomSheetRefType = {
  bottomSheetRef: React.RefObject<BottomSheet>;
  setBottomSheetRef: (ref: React.RefObject<BottomSheet>) => void;
};

type ScrollRefType = {
  scrollRef: React.RefObject<ScrollView>;
  setScrollRef: (ref: React.RefObject<ScrollView>) => void;
};

type areaSelected = {
  areaSelected: string;
  setAreaSelected: (area: string) => void;
};

type contentsSelected = {
  contentsSelected: number;
  setContentsSelected: (contents: number) => void;
};

export const useBottomSheetRef = create<BottomSheetRefType>(set => ({
  bottomSheetRef: {current: null},
  setBottomSheetRef: ref => set({bottomSheetRef: ref}),
}));

export const useScrollRef = create<ScrollRefType>(set => ({
  scrollRef: {current: null},
  setScrollRef: ref => set({scrollRef: ref}),
}));

export const useAreaSelected = create<areaSelected>(set => ({
  areaSelected: '서울',
  setAreaSelected: area => set({areaSelected: area}),
}));

export const useContentsSelected = create<contentsSelected>(set => ({
  contentsSelected: 12,
  setContentsSelected: contents => set({contentsSelected: contents}),
}));
