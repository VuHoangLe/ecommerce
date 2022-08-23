import React from 'react';
import './index.scss';
function Table({ headData, renderHead, bodyData, renderBody }) {
    return (
        <div>
            <div className="table-wrapper">
                <table>
                    {headData && renderHead ? (
                        <thead>
                            <tr>
                                {headData.map((item, index) => {
                                    return renderHead(item, index);
                                })}
                            </tr>
                        </thead>
                    ) : null}

                    {bodyData && renderBody ? (
                        <tbody>
                            {bodyData.map((item, index) => {
                                return renderBody(item, index);
                            })}
                        </tbody>
                    ) : null}
                </table>
            </div>
        </div>
    );
}

export default Table;
