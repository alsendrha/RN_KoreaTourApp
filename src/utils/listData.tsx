import Category01 from './svg/Category01';
import Category02 from './svg/Category02';
import Category03 from './svg/Category03';
import Category04 from './svg/Category04';
import Category05 from './svg/Category05';
import Category06 from './svg/Category06';
import Category07 from './svg/Category07';
import Category08 from './svg/Category08';

export const areaList = [
  {id: 1, name: '서울'},
  {id: 2, name: '경기'},
  {id: 3, name: '인천'},
  {id: 4, name: '강원'},
  {id: 5, name: '충북'},
  {id: 6, name: '충남'},
  {id: 7, name: '대전'},
  {id: 8, name: '경북'},
  {id: 9, name: '경남'},
  {id: 10, name: '대구'},
  {id: 11, name: '울산'},
  {id: 12, name: '부산'},
  {id: 13, name: '전북'},
  {id: 14, name: '전남'},
  {id: 15, name: '광주'},
  {id: 16, name: '제주'},
];

export const contentList = [
  {
    id: 1,
    number: 12,
    name: '관광지',
    icon: 'rocket-outline',
    img: <Category01 />,
  },
  {
    id: 2,
    number: 14,
    name: '문화시설',
    icon: 'body-outline',
    img: <Category02 />,
  },
  {
    id: 3,
    number: 15,
    name: '행사/공연등',
    icon: 'game-controller-outline',
    img: <Category03 />,
  },
  {
    id: 4,
    number: 25,
    name: '여행코스',
    icon: 'footsteps-outline',
    img: <Category04 />,
  },
  {
    id: 5,
    number: 28,
    name: '레포츠',
    icon: 'football-outline',
    img: <Category05 />,
  },
  {
    id: 6,
    number: 32,
    name: '숙박',
    icon: 'storefront-outline',
    img: <Category06 />,
  },
  {
    id: 7,
    number: 38,
    name: '쇼핑',
    icon: 'cart-outline',
    img: <Category07 />,
  },
  {
    id: 8,
    number: 39,
    name: '음식점',
    icon: 'fast-food-outline',
    img: <Category08 />,
  },
];

export const myPageMenuList = [
  {
    id: 1,
    title: '나의 정보',
    icon: 'body-outline',
  },
  {
    id: 2,
    title: '공지사항',
    icon: 'newspaper-outline',
  },
  {
    id: 3,
    title: '내 후기글',
    icon: 'chatbox-outline',
  },
  {
    id: 4,
    title: '앱정보',
    icon: 'alert-circle-outline',
  },
  {
    id: 5,
    title: '로그아웃',
    icon: 'exit-outline',
  },
];
