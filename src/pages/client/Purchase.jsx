import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PurchaseItem from '../../features/client/purchaseItem/components';
import { getDocumentById } from '../../firebase/services';
import Button from '../../components/button';
import '../../features/client/purchaseItem/components/purchase.scss';
function Purchase() {
    const { id: purchaseId } = useParams();
    const [purchaseOrder, setPurchaseOrder] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await getDocumentById('orders', purchaseId);
            setPurchaseOrder(response);
        }
        fetchData();
    }, [purchaseId]);

    return (
        <div className="purchase">
            <div className="purchase__delivery">
                <h1 className="purchase__delivery__title color-red">Delivery address</h1>
                <div className="purchase__delivery__customer">
                    <h3 className="purchase__delivery__customer__name">{purchaseOrder.customer}</h3>
                </div>
            </div>
            <div className="purchase__content">
                <div className="purchase__info">
                    <div className="purchase__info__title">
                        <h1>Products Ordered</h1>
                    </div>
                    <div className="purchase__info__detail">
                        <h5>Unit price</h5>
                        <h5>Amount</h5>
                        <h5>Subtotal</h5>
                    </div>
                </div>
                {purchaseOrder.products?.map((item) => (
                    <PurchaseItem key={item.docId} product={item} />
                ))}
            </div>
            <div className="purchase__vocher">
                <h2 className="purchase__vocher__title">Yolo Voucher</h2>
                <div className="purchase__vocher__input">
                    <input type="text" placeholder="(Optional) Enter a voucher to get a discount" />
                </div>
            </div>

            <div className="purchase__subtotal">
                <div className="purchase__subtotal__content">
                    <div className="purchase__subtotal__content__title">
                        <span>Merchandise Subtotal:</span>
                        <span>1000$</span>
                    </div>
                    <div className="purchase__subtotal__content__title">
                        <span>Discount total:</span>
                        <span>-40$</span>
                    </div>
                    <div className="purchase__subtotal__content__title">
                        <span>Total payment:</span>
                        <span>960$</span>
                    </div>
                    <Button>Place order</Button>
                </div>
            </div>
        </div>
    );
}

export default Purchase;
