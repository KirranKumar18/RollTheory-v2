import { useState } from "react";

function Order() {
  const [rate, setRate] = useState([2, 5, 10]); 
  const [quantity, setQuantity] = useState([0, 0, 0]); 
  const [Drate, setDrate] = useState([0, 0, 0]); 

  function Eval200mlPrice(event) {
    const newQuantity = Number(event.target.value) || 0; 
    setQuantity([newQuantity, quantity[1], quantity[2]]); 

    const cpu = rate[0]; 
    const newDrate = [...Drate]; 
    newDrate[0] = cpu * newQuantity; 
    setDrate(newDrate);
  }

  function Eval500mlPrice(event) {
    const newQuantity = Number(event.target.value) || 0;
    setQuantity([quantity[0], newQuantity, quantity[2]]);

    const cpu = rate[1]; 
    const newDrate = [...Drate];
    newDrate[1] = cpu * newQuantity;
    setDrate(newDrate);
  }
  
  function Eval1000mlPrice(event) {
    const newQuantity=Number(event.target.value)|| 0;
    setQuantity([quantity[0],quantity[1],newQuantity])

    const cpu=rate[2]
    const tDrate=[...Drate];
    tDrate[2]=cpu * newQuantity
    setDrate(tDrate);
  }

  return (
    <div className="menu">
      <h1>BRAND NAME</h1>
      <ol>
        <li>
          <span>200ml</span>{" "}
          <input type="number"  onChange={Eval200mlPrice} />
          <span> Final Rate: {Drate[0]}</span>
        </li>
        <li>
          <span>500ml</span>{" "}
          <input type="number"  onChange={Eval500mlPrice} />
          <span> Final Rate: {Drate[1]}</span>
        </li>
        <li>
          <span>1000ml</span>{" "}
          <input type="number" onChange={Eval1000mlPrice} />
          <span> Final Rate: {Drate[2]}</span>
        </li>
      </ol>
    </div>
  );
}

export default Order;
