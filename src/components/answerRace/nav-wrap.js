import React from 'react';
import styles from '@/styles/index.module.less';

export default ({ shouldShowTop, toggleShowTop }) => {
    const checkNavBtnClass = (flag) => {
        if (shouldShowTop === flag) {
            return `${styles['nav-btn']} ${styles.active}`;
        }
        return styles['nav-btn'];
    };

    return (
        <div className={styles['nav-wrap']}>
            <div className={styles['nav-item']}>
                <div className={styles['nav-title']}>排行榜</div>
                <div className={styles['nav-content']}>不积跬步无以至千里，结果不重要超越自己才是赢。</div>
                <div className={checkNavBtnClass(true)} onClick={() => toggleShowTop(true)}>查看详情</div>
            </div>
            <div className={styles['nav-item']}>
                <div className={styles['nav-title']}>作品展示</div>
                <div className={styles['nav-content']}>自己的作品这么棒，快让我们欣赏欣赏吧。</div>
                <div className={checkNavBtnClass(false)} onClick={() => toggleShowTop(false)}>查看详情</div>
            </div>
        </div>
    );
};