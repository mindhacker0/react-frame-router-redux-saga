import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styles from "./react-page.css";
const ReactPage = function({current,total,pageSize,onChange,prevBtn,nextBtn}){
    if(!prevBtn){
        prevBtn = ()=><div><span>上一页</span></div>
    }
    if(!nextBtn){
        nextBtn = ()=><div><span>下一页</span></div>
    }
    const [currentPage,setCurrentPage] = useState(1);
    const [pageList,setPageList] = useState([]);
    const [first, setFirst] = useState(null);
    const [last, setLast] = useState(null);
    useEffect(()=>{
        const maxPage = Math.floor(total/pageSize);
        const pages = new Array(maxPage).fill(1).map((_, index) => (index + 1));
        setFirst(pages[0]);
        setLast(pages[pages.length - 1]);
        setPageList(pages);
    },[pageSize,total])
    useEffect(()=>{
        setCurrentPage(current);
    },[current]);
    const handleClickPrev = () => {
        const newPage = currentPage - 1;
        if (newPage < first) {
            return;
        }
        setCurrentPage(newPage);
    };
    const handleClickNext = () => {
        const newPage = currentPage + 1;
        if (newPage > last) {
            return;
        }
        setCurrentPage(newPage);
    };
    function renderPage(){
       return <>{pageList.map((val,key)=>{
        return <div key={`page-item-${key}`} className={classNames(styles.pageItem,currentPage===key+1 && styles.active)} onClick={()=>setCurrentPage(key+1)}><span>{val}</span></div>
       })}</>
    }
    return <div className={styles.pageWrap}>
      <div className={classNames(styles.pageItem,styles.pageBtn)} onClick={handleClickPrev}>{prevBtn()}</div>
      <div className={styles.pageItemWrap}>{renderPage()}</div>
      <div className={classNames(styles.pageItem,styles.pageBtn)} onClick={handleClickNext}>{nextBtn()}</div>
    </div>
}
 
ReactPage.propTypes = {
 
};
export default ReactPage;
