import React, { useState } from 'react';
import './table.scss';
function Table({ headData, renderHead, bodyData, renderBody, limit }) {
    const initDataShow = limit && bodyData ? bodyData.slice(0, Number(limit)) : bodyData;

    const [dataShow, setDataShow] = useState(initDataShow);

    let pages = 1;

    let range = [];

    if (limit !== undefined) {
        let page = Math.floor(bodyData.length / Number(limit));
        pages = bodyData.length % Number(limit) === 0 ? page : page + 1;
        range = [...Array(pages).keys()];
    }

    const [currPage, setCurrPage] = useState(0);

    const selectPage = (page) => {
        const start = Number(limit) * page;
        const end = start + Number(limit);

        setDataShow(bodyData.slice(start, end));

        setCurrPage(page);
    };
    return (
        <div>
            <div className="table-wrapper">
                <table>
                    {/* get the header data and render */}
                    {headData && renderHead ? (
                        <thead>
                            <tr>
                                {headData.map((item, index) => {
                                    return renderHead(item, index);
                                })}
                            </tr>
                        </thead>
                    ) : null}

                    {/* get the body data and render */}
                    {bodyData && renderBody ? (
                        <tbody>
                            {bodyData.map((item, index) => {
                                return renderBody(item, index);
                            })}
                        </tbody>
                    ) : null}
                </table>
            </div>

            {pages > 1 ? (
                <div className="pagination">
                    {range.map((item, index) => (
                        <div
                            key={index}
                            className={`pagination-item ${currPage === index ? 'active' : ''}`}
                            onClick={() => {
                                selectPage(index);
                                window.scrollTo(0, 0);
                            }}>
                            {item + 1}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default Table;
