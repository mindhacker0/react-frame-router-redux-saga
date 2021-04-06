import React, { useState, useEffect } from 'react';
import styles from '@/styles/index.module.less';

const stylesMap = {1: 'primary', 2: 'intermediate', 3: 'advanced'};

export default ({ level, list }) => {
  const [levelClass, setLevelClass] = useState('');

  useEffect(() => {
      setLevelClass(styles[stylesMap[level]]);
  }, [level]);

  return (
    <div className={styles['rank-list-wrap']}>
      {
        list.map(({ ranking, userName, userHeadUrl, school, gradeName, score }) => (
          <div className={styles['rank-item']}>
            <div className={styles['left-wrap']}>
              <div className={styles.rank}>{ranking}</div>
              <div className={styles.avatar}>
                <img src={userHeadUrl} alt="avatar" />
              </div>
              <div className={styles.name}>{userName}</div>
              <div className={styles.school}>{school}</div>
              <div className={styles.grade}>{gradeName}</div>
            </div>
            <div className={styles['right-wrap']}>
              <div className={styles.score}>{score}</div>
              <div className={levelClass} />
            </div>
          </div>
        ))
      }
    </div>
  );
};