import {
  EXHIBITION_SETLEVEL,
  EXHIBITION_SETTOPSLIST,
  EXHIBITION_SETRANKTLIST,
  EXHIBITION_CLEARRANKTLIST,
  EXHIBITION_SETPROJECTLIST,
  EXHIBITION_CLEARPROJECTLIST,
  } from '../actions';

const initialState = {
  level: 1,
  size: 12,
  page: 1,
  total: 0,
  topList: [],
  rankList: [],
  projectList: [],
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case EXHIBITION_SETLEVEL:
      return {
        ...state,
        level: payload.level,
      };
    case EXHIBITION_SETTOPSLIST:
      const gold = payload.topList[0] || {};
      const silver = payload.topList[1] || {};
      const cuprum = payload.topList[2] || {};
      return {
        ...state,
        topList: [silver, gold, cuprum],
      };
    case EXHIBITION_SETRANKTLIST:
      return {
        ...state,
        rankList: payload.rankList,
        total: payload.total,
      };
    case EXHIBITION_CLEARRANKTLIST:
      return {
        ...state,
        level: 1,
        page: 1,
        total: 0,
        rankList: [],
      };
    case EXHIBITION_SETPROJECTLIST:
      return {
        ...state,
        projectList: payload.projectList,
        total: payload.total,
      };
    case EXHIBITION_CLEARPROJECTLIST:
      return {
        ...state,
        projectList: [],
        page: 1,
        total: 0,
      }
    default:
      return state;
  }
};
