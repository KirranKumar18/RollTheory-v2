// import "./PlaceOrder.css"

// function PlaceOrder(Order){

//     console.log(Order);


// return(
//     <>
    
    
//     <div className="popup">
//         <h1>PLACE ORDER</h1>
//        <span className="OrderType">
//         <button className="abc">DINE</button>
//         <button>PARCEL</button>
//        </span>
//        <h3>PAYMENT</h3>
//        <div>
//        <button type="radio">UPI</button>
//        <button type="radio">CASH</button>
//        </div>
//         <button className="Confirm">CONFIRM!!</button>
//     </div>
//     </>
// )

// }

// export default PlaceOrder



import "./PlaceOrder.css";

function PlaceOrder(Order) {
    console.log(Order);

    return (
        <>
            <div className="popup">
                <h1>PLACE ORDER</h1>
                <div className="OrderType">
                    <button >DINE</button>
                    <button>PARCEL</button>
                </div>
                <h3>PAYMENT</h3>
                <div className="PaymentType">
                    <button>UPI</button>
                    <button>CASH</button>
                </div>
                <button className="Confirm">CONFIRM!!</button>
            </div>
        </>
    );
}

export default PlaceOrder;
