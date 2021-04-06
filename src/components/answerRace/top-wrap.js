import React, { useState, useEffect } from 'react';
import styles from '@/styles/index.module.less';

const stylesMap = {1: 'primary', 2: 'intermediate', 3: 'advanced'};

export default ({ level, setLevel, list }) => {
  // const [level, setLevel] = useState('primary');
  const [scroeClass, setScoreClass] = useState('');
  const [selectClass, setSelectClass] = useState('');
  const [shouldShowSelect, toggleShowSelect] = useState(false);

  const handleShowSelect = () => toggleShowSelect(true);

  const handleHideSelect = () => toggleShowSelect(false);

  const handleChangeLevel = (level) => {
    setLevel(level);
    handleHideSelect();
  }

  const setSelectItemClass = (current) => {
    if (current === level) {
      return `${styles['select-item']} ${styles.active}`;
    }
    return styles['select-item'];
  };

  useEffect(() => {
    setScoreClass(`${styles['top-item-score']} ${styles[stylesMap[level]]}`);
  }, [level]);

  useEffect(() => {
    if (shouldShowSelect) {
      setSelectClass(`${styles['difficulty-level-select']} ${styles.active}`);
    } else {
      setSelectClass(styles['difficulty-level-select']);
    }
  }, [shouldShowSelect]);

  return (
      <div className={styles['top-wrap']}>
        {
          list.map((item, index) => (
            <div className={styles['top-item']} key={item.userId || index}>
              <div className={styles['top-item-avatar']}><img src={item.userHeadUrl} alt="avatar" /></div>
              <div className={styles['top-item-name']}>{item.userName}</div>
              <div className={scroeClass}>{item.totalScore}分</div>
              <div className={styles['top-item-info']}>{item.schoolName} {item.gradeName}</div>
            </div>
          ))
        }
        <div className={styles['difficulty-level-wrap']}>
          <div className={styles.title} onClick={handleShowSelect}>难度等级</div>
          {shouldShowSelect && <div className={styles['difficulty-level-masked']} onClick={handleHideSelect} />}
          <div className={selectClass}>
            <div className={styles['select-title']}>总分？</div>
            <div className={setSelectItemClass(1)} onClick={() => handleChangeLevel(1)}>初级</div>
            <div className={setSelectItemClass(2)} onClick={() => handleChangeLevel(2)}>中级</div>
            <div className={setSelectItemClass(3)} onClick={() => handleChangeLevel(3)}>高级</div>
          </div>
        </div>
      </div>
  );
};
