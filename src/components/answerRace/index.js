import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setLevel,
  toggleShowTop,
  getTopsList,
  getRankList,
  clearRankList,
  getProjectList,
  clearProjectList,
} from '@/reducers/actions';
import banner from './img/banner.png';
import styles from '@/styles/index.module.less';

import NavWrap from './nav-wrap';
import TopWrap from './top-wrap';
import RankListWrap from './rank-list-wrap';
import WorksWrap from './works-hot-wrap';
import WorksListWrap from './works-list-wrap';
import PaginationWrap from './pagination';

const Container = ({
  level,
  topList,
  rankList,
  projectList,
  setLevel,
  shouldShowTop,
  toggleShowTop,
  getTopsList,
  getRankList,
  clearRankList,
  getProjectList,
  clearProjectList,
}) => {
  useEffect(() => {
    if (shouldShowTop) {
      // clear projects
      clearProjectList();
      getRankList();
    } else {
      // clear ranks
      clearRankList();
      getProjectList();
    }
  }, [shouldShowTop]);

  useEffect(() => {
    getTopsList();
    clearProjectList();
    getRankList();
  }, [level]);

  return (
    <div className={styles.container}>
      <div className={styles.banner}><img src={banner} alt="banner" /></div>
      <NavWrap shouldShowTop={shouldShowTop} toggleShowTop={toggleShowTop} />
      {
        shouldShowTop &&
        <Fragment>
          <TopWrap level={level} setLevel={setLevel} list={topList} />
          <RankListWrap level={level} list={rankList} />
        </Fragment>
      }
      {
        !shouldShowTop &&
        <Fragment>
          <WorksWrap />
          <WorksListWrap list={projectList} />
        </Fragment>
      }
      <PaginationWrap
        current={1}
        total={150}
        pageSize={12}
      />
    </div>
  );
};

const mapStateToProps = ({
  exhibition: {
    level,
    topList,
    rankList,
    projectList,
  },
  layout: { shouldShowTop },
}) => {
  console.log("level",level);
  return {
    level,
    topList,
    rankList,
    projectList,
    shouldShowTop,
  }
};

const mapDispatchToProps = (dispatch) => ({
  setLevel: (level) => dispatch(setLevel({ level })),
  toggleShowTop: (shouldShowTop) => dispatch(toggleShowTop({ shouldShowTop })),
  getTopsList: () => dispatch(getTopsList()),
  getRankList: () => dispatch(getRankList()),
  clearRankList: () => dispatch(clearRankList()),
  getProjectList: () => dispatch(getProjectList()),
  clearProjectList: () => dispatch(clearProjectList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
