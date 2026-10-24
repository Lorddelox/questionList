import { useEffect, useState } from "react";
import ICONS from "../../ui/icons"
import paginaiton from "../../helpers/pagination";

const PaginationSection = ({ currentPage, totalPages, handlePaginationClick, range = 2 }) => {
    if (!totalPages) return;

    const paginationItems = paginaiton(totalPages, currentPage, range);

    return (
        <div className="questions__list-pagination pagination" >
            {
                paginationItems.map((page, index) => {
                    if (typeof (page) === "number")
                        return (
                            <button key={index} onClick={() => handlePaginationClick(page)}
                                className={`pagination__btn ${page === currentPage ? "pagination__btn--active" : ""}`}>
                                {page}
                            </button>
                        )
                    else
                        return (<div key={`ellipsis-${index}`}>{ICONS.ellipsis}</div>)
                })
            }
        </div>
    )
}

export default PaginationSection