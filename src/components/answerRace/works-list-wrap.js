import React from 'react';
import styles from '@/styles/index.module.less';

export default ({ list }) => {
  return (
    <div className={styles['works-list-wrap']}>
      {
        list.map(({ id, thumbnailUrl, title, viewsNum, commentNum, praisenhNum, ownerUrl, ownerName, pushDateStr }) => (
          <div className={styles['works-item']} key={id}>
            <div className={styles['works-cover']} style={thumbnailUrl ? { backgroundImage: `url(${thumbnailUrl})` } : {}} />
            <div className={styles['works-name']}>{title}</div>
            <div className={styles['works-info-wrap']}>
              <div className={styles['works-visit']}>{viewsNum}</div>
              <div className={styles['works-comments']}>{commentNum}</div>
              <div className={styles['works-likes']}>{praisenhNum}</div>
            </div>
            <div className={styles['works-bottom']}>
              <div className={styles['works-user-info']}>
                <div className={styles['works-user-avatar']}><img src={ownerUrl} alt='avatar' /></div>
                <div className={styles['works-user-name']}>{ownerName}</div>
              </div>
              <div className={styles['works-time']}>{pushDateStr}</div>
            </div>
          </div>
        ))
      }
    </div>
  );
};
