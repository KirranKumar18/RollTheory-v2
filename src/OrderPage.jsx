import { useState,useEffect } from "react"
import React from "react";
//import { useNavigate } from "react-router-dom";
import "./Orderpage.css"
import expence from "./expence.jsx"
import { supabase } from "./Supabase.js";

function Orderpage(){
  
  const rolls=["Crispy Chicken Roll","Shawarma Roll","peri Peri Roll","Chicken Fajta Roll","Falafal Roll","Panner Roll","Mashroom Roll","Crispy Egg roll", "Normal Egg Roll"]  
  const Fries=["Crispy Chicken Fries","Shawarma Fries","peri Peri Fries","Chicken Fajta Fries","Falafal Fries","Panner Fries","Mashroom Fries","Crispy Egg Fries", "Normal Egg Fries"]  
  const milkShakes=["Chocolate","Oreo","KitKat","Biscoff"]
  const rollsPrice=[105, 115, 125, 130, 140, 145, 155, 165, 170]
  const friesPrice=[100, 110, 120, 135, 150, 160, 165, 170, 175]
  const milkShakesPrice = [60,60,60,70]

  const [Item,setItem]=useState("Rolls");
  const [rollQuantity,setrollQuantity]=useState([0,0,0,0,0,0,0,0,0]);
  const [friesQuantity,setfriesQuantity]=useState([0,0,0,0,0,0,0,0,0]);
  const [milkShakesQuantity, setmilkshakeQuantity] = useState([0,0,0,0])
  const [OrderedItems, setOrderedItems] = useState([]);
  const [TotalCost,setTotalCost]=useState(0);
  const [TotalItem,setTotalItem]=useState(0);

  useEffect(() => {
  const testConnection = async () => {
    const { data, error } = await supabase.from('orders').select('*');
    if (error) {
      console.error("Supabase fetch error:", error);
    } else {
      console.log("Supabase test data:", data);
    }
  };
  testConnection();
}, []);


  
  useEffect(() => {
    const newOrder = [];       // contains only 2 obj  { name:      ,quantity:     ,cost:     }
  
    rollQuantity.forEach((qty, index) => {
      if (qty > 0) {
        newOrder.push({
          name: rolls[index],
          quantity: qty,  
          cost: rollsPrice[index] * qty
        });
      }
    });
  
    friesQuantity.forEach((qty, index) => {
      if (qty > 0) {
        newOrder.push({
          name: Fries[index],
          quantity: qty,
          cost: friesPrice[index] * qty
        });
      }
    });

    milkShakesQuantity.forEach((qty, index) => {
      if (qty > 0) {
        newOrder.push({
          name: milkShakes[index],
          quantity: qty,  
          cost: milkShakesPrice[index] * qty
        });
      }
    });
  
    setOrderedItems(newOrder);
    console.log(newOrder)
  }, [rollQuantity, friesQuantity, milkShakesQuantity]);


  useEffect(() => {
    let totCost = 0;
  
    OrderedItems.forEach((item, index) => {
      const itemCost =  item.cost;
      totCost += itemCost;
      console.log(`Item ${index}: ₹${itemCost}`);
    });
  
    console.log("TotalCost updated to:", totCost);
    setTotalCost(totCost); 
    
  
  }, [OrderedItems]);
  
  useEffect(()=>{
      let totItem=0
      OrderedItems.forEach((item,index)=>{
        const qty=item.quantity
        totItem+=qty;
        console.log(`the Total items are ${totItem}`);
      })        
      
      setTotalItem(totItem)
  },[OrderedItems])
  

  //  -------------------------------------------------

function getCost(item,index){
  const l=[]
  if (item in OrderedItems){
    // need time
  }
}
  
  
  function IncrementRolls(x) {
  setrollQuantity(prev => {
    const updated = [...prev];
    updated[x] += 1;
    return updated;
  });
}

function DecrementRolls(y){
  setrollQuantity(prev =>{
    const updated =[...prev];
    if (updated[y]!=0)
    updated[y] -= 1;
    return updated ;
  })
}

function IncrementFries(x){
  setfriesQuantity(prev=>{
    const updated=[...prev];
    updated[x]+=1;
    return updated;
  })
}

function DecrementFries(y){
  setfriesQuantity(prev=>{
    const updated=[...prev];
    if(updated[y]!=0)
      updated[y]-=1
    return updated;
  })
}

function IncrementMilkShakes(x){
  setmilkshakeQuantity(prev=>{
    const updated = [...prev];
    updated[x] += 1;
    return updated
  })
}

function DecrementMilkShakes(y){
  setmilkshakeQuantity(prev=>{
    const updated = [...prev];
    if(updated[y]!=0)
      updated[y]-=1
    return updated;
  })
}


  // <Routes>
  //     <Route path="/" element={<Navigate to="/OrderPage" />} />
  //     <Route path="/OrderPage" element={<OrderPage />} />
  //     <Route path="/expence" element={<expence />} />
  //   </Routes>


  // SUPABASE UPDATE

const handleConfirmOrder = async () => {
  // 1. Get the last OrderNo
  const { data: lastOrderData, error: fetchError } = await supabase
    .from('Inventory')
    .select('OrderNo')
    .order('OrderNo', { ascending: false })
    .limit(1);

  if (fetchError) {
    console.error("Error fetching last order:", fetchError);
    alert("Failed to get last order number.");
    return;
  }

  const lastOrderNo = lastOrderData.length > 0 ? lastOrderData[0].OrderNo : 0;
  const newOrderNo = lastOrderNo + 1;

  // 2. Find selected items from your state
  const selectedRoll = OrderedItems.find(item =>
    item.name.toLowerCase().includes("roll")
  );

  const selectedFries = OrderedItems.find(item =>
    item.name.toLowerCase().includes("fries")
  );

  const selectedShake = OrderedItems.find(item =>
    milkShakes.some(ms =>
      item.name.toLowerCase().includes(ms.toLowerCase())
    )
  );

  // 3. Format as "Dish x Qty"
  const rollText = selectedRoll ? `${selectedRoll.name} x ${selectedRoll.quantity}` : null;
  const friesText = selectedFries ? `${selectedFries.name} x ${selectedFries.quantity}` : null;
  const shakeText = selectedShake ? `${selectedShake.name} x ${selectedShake.quantity}` : null;

  // 4. Insert the order into Supabase
  const { error: insertError } = await supabase.from('Inventory').insert([
    {
      OrderNo: newOrderNo,
      Rolls: rollText,
      Fries: friesText,
      MilkShake: shakeText
    }
  ]);

  // 5. Show result
  if (insertError) {
    console.error("Error inserting order:", insertError);
    alert("Error placing order: " + insertError.message);

    set
  } else {
    alert("Order placed successfully! Your Order No is " + newOrderNo);
    setOrderedItems([])
  }
};




  return(
    <>
      <div className="Holder">
          <div className="List">
          <button value={"Rolls"}  onClick={()=>{setItem("Rolls")}  }> ROLLS</button>
          <br/>
          <button  value={"Fries"}  onClick={()=>setItem("Fries")}> FRIES</button>
          <br/>
          <button  value={"MilkShakes"}  onClick={()=>setItem("MilkShakes")}> MilkShakes</button>
              
          </div>
          <div className=" Menu"> 
            {/* THIS IS FOR ROLLSSS */}
            
             {Item==="Rolls"&&(
               <>
              
              <div className="box-container">
              <div className="box"  style={{border: "5px solid rgb(227, 61, 49)"}}>
                <h1>{rolls[0]}</h1>
                  <div className="quantity-row">
                      <button className="defButton"   onClick={()=>{DecrementRolls(0)}}>-</button>
                      <h2>{rollQuantity[0]}</h2>
                      <button className="defButton"  onClick = {() =>{IncrementRolls(0)}} >+</button>
                    </div>  
              </div>
               
              <div className="box" style={{border: "5px solid rgb(227, 61, 49)"}}>
                <h1>{rolls[1]}</h1>
                  <div className="quantity-row">
                      <button className="defButton"   onClick={()=>{DecrementRolls(1)}}>-</button>
                      <h2>{rollQuantity[1]}</h2>
                      <button className="defButton"   onClick={()=>{IncrementRolls(1)}}>+</button>
                    </div>  
              </div>
               
              <div className="box" style={{border: "5px solid rgb(74, 196, 74)"}}>
                <h1>{rolls[2]}</h1>   
                  <div className="quantity-row">
                      <button className="defButton"   onClick={()=>{DecrementRolls(2)}}>-</button>
                      <h2>{rollQuantity[2]}</h2>
                      <button className="defButton"  onClick={()=>{IncrementRolls(2)}}>+</button>
                    </div>  
              </div>
               
              <div className="box" style={{border: "5px solid rgb(227, 61, 49)"}}>
                <h1>{rolls[3]}</h1>
                  <div className="quantity-row">
                      <button className="defButton"    onClick={()=>{DecrementRolls(3)}}>-</button>
                      <h2>{rollQuantity[3]}</h2>
                      <button className="defButton"    onClick={()=>{IncrementRolls(3)}}>+</button>
                    </div>  
              </div>
               
              <div className="box" style={{border: "5px solid rgb(74, 196, 74)"}}>   
                <h1>{rolls[4]}</h1>
                  <div className="quantity-row">
                      <button className="defButton"   onClick={()=>{DecrementRolls(4)}}>-</button>
                      <h2>{rollQuantity[4]}</h2>
                      <button className="defButton"   onClick={()=>{IncrementRolls(4)}}>+</button>
                    </div>  
              </div>
               
              <div className="box" style={{border: "5px solid rgb(74, 196, 74)"}}>
                <h1>{rolls[5]}</h1>
                  <div className="quantity-row">
                      <button className="defButton"   onClick={()=>{DecrementRolls(5)}}>-</button>
                      <h2>{rollQuantity[5]}</h2>
                      <button className="defButton"    onClick={()=>{IncrementRolls(5)}}>+</button>
                    </div>  
              </div>
              <div className="box" style={{border: "5px solid rgb(227, 61, 49)"}}>
                <h1>{rolls[6]}</h1>
                  <div className="quantity-row">
                      <button className="defButton"   onClick={()=>{DecrementRolls(6)}}>-</button>
                      <h2>{rollQuantity[6]}</h2>
                      <button className="defButton"    onClick={()=>{IncrementRolls(6)}}>+</button>
                    </div>  
              </div>
              <div className="box" style={{border: "5px solid rgb(227, 61, 49)"}}>
                <h1>{rolls[7]}</h1>
                  <div className="quantity-row">
                      <button className="defButton"   onClick={()=>{DecrementRolls(7)}}>-</button>
                      <h2>{rollQuantity[7]}</h2>
                      <button className="defButton"    onClick={()=>{IncrementRolls(7)}}>+</button>
                    </div>  
              </div>
              <div className="box" style={{border: "5px solid rgb(227, 61, 49)"}}>
                <h1>{rolls[8]}</h1>
                  <div className="quantity-row">
                      <button className="defButton"   onClick={()=>{DecrementRolls(8)}}>-</button>
                      <h2>{rollQuantity[8]}</h2>
                      <button className="defButton"    onClick={()=>{IncrementRolls(8)}}>+</button>
                    </div>  
              </div>
           </div>
               </>
          
            )}

            {/* THIS IS FOR FRIES */}
             {Item==="Fries"&&(
               
                <>
               
               <div className="box-container">
               <div className="box" style={{border: "5px solid rgb(227, 61, 49)"}}>
                 <h1>{Fries[0]} </h1>
                   <div className="quantity-row">
                       <button className="defButton"   onClick={()=>{DecrementFries(0)}}>-</button>
                       <h2>{friesQuantity[0]}</h2>
                       <button className="defButton"  onClick = {() =>{IncrementFries(0)}} >+</button>
                     </div>  
               </div>
                
               <div className="box" style={{border: "5px solid rgb(227, 61, 49)"}}>
                 <h1>{Fries[1]}</h1>
                   <div className="quantity-row">
                       <button className="defButton"   onClick={()=>{DecrementFries(1)}}>-</button>
                       <h2>{friesQuantity[1]}</h2>
                       <button className="defButton"   onClick={()=>{IncrementFries(1)}}>+</button>
                     </div>  
               </div>
                
               <div className="box" style={{border: "5px solid rgb(74, 196, 74)"}}>
                 <h1>{Fries[2]}</h1>
                   <div className="quantity-row">
                       <button className="defButton"   onClick={()=>{DecrementFries(2)}}>-</button>
                       <h2>{friesQuantity[2]}</h2>
                       <button className="defButton"  onClick={()=>{IncrementFries(2)}}>+</button>
                     </div>  
               </div>
                
               <div className="box" style={{border: "5px solid rgb(227, 61, 49)"}}> 
                 <h1>{Fries[3]}</h1>
                   <div className="quantity-row">
                       <button className="defButton"    onClick={()=>{DecrementFries(3)}}>-</button>
                       <h2>{friesQuantity[3]}</h2>
                       <button className="defButton"    onClick={()=>{IncrementFries(3)}}>+</button>
                     </div>  
               </div>
                
               <div className="box" style={{border: "5px solid rgb(227, 61, 49)"}}>
                 <h1>{Fries[4]}</h1>
                   <div className="quantity-row">
                       <button className="defButton"   onClick={()=>{DecrementFries(4)}}>-</button>
                       <h2>{friesQuantity[4]}</h2>
                       <button className="defButton"   onClick={()=>{IncrementFries(4)}}>+</button>
                     </div>  
               </div>
                
               <div className="box" style={{border: "5px solid rgb(74, 196, 74)"}}>
                 <h1>{Fries[5]}</h1>
                   <div className="quantity-row">
                       <button className="defButton"   onClick={()=>{DecrementFries(5)}}>-</button>
                       <h2>{friesQuantity[5]}</h2>
                       <button className="defButton"    onClick={()=>{IncrementFries(5)}}>+</button>
                     </div>  
               </div>
               <div className="box" style={{border: "5px solid rgb(227, 61, 49)"}}>
                 <h1>{Fries[6]}</h1>
                   <div className="quantity-row">
                       <button className="defButton"   onClick={()=>{DecrementFries(6)}}>-</button>
                       <h2>{friesQuantity[6]}</h2>
                       <button className="defButton"    onClick={()=>{IncrementFries(6)}}>+</button>
                     </div>  
               </div>
               <div className="box" style={{border: "5px solid rgb(74, 196, 74)"}}>
                 <h1>{Fries[7]}</h1>
                   <div className="quantity-row">
                       <button className="defButton"   onClick={()=>{DecrementFries(7)}}>-</button>
                       <h2>{friesQuantity[7]}</h2>
                       <button className="defButton"    onClick={()=>{IncrementFries(7)}}>+</button>
                     </div>  
               </div>
               <div className="box" style={{border: "5px solid rgb(74, 196, 74)"}}>
                 <h1>{Fries[8]}</h1>
                   <div className="quantity-row">
                       <button className="defButton"   onClick={()=>{DecrementFries(8)}}>-</button>
                       <h2>{friesQuantity[8]}</h2>
                       <button className="defButton"    onClick={()=>{IncrementFries(8)}}>+</button>
                     </div>  
               </div>
            </div>
                </>
           
             )}
               
              
              
              
              {/* THIS IS FOR MilkShakes */}
             {Item==="MilkShakes"&&(
                <>
                  <div className="box-container">
               <div className="box" style={{border: "5px solid rgb(74, 196, 74)"}}>
                 <h1>{milkShakes[0]}</h1>
                   <div className="quantity-row">
                       <button className="defButton"   onClick={()=>{DecrementMilkShakes(0)}}>-</button>
                       <h2>{milkShakesQuantity[0]}</h2>
                       <button className="defButton"  onClick = {() =>{IncrementMilkShakes(0)}} >+</button>
                     </div>  
               </div>
                
               <div className="box" style={{border: "5px solid rgb(74, 196, 74)"}}>
                 <h1>{milkShakes[1]}</h1>
                   <div className="quantity-row">
                       <button className="defButton"   onClick={()=>{+(1)}}>-</button>
                       <h2>{milkShakesQuantity[1]}</h2>
                       <button className="defButton"   onClick={()=>{IncrementMilkShakes(1)}}>+</button>
                     </div>  
               </div>
                
               <div className="box" style={{border: "5px solid rgb(74, 196, 74)"}}>
                 <h1>{milkShakes[2]}</h1>
                   <div className="quantity-row">
                       <button className="defButton"   onClick={()=>{DecrementMilkShakes(2)}}>-</button>
                       <h2>{milkShakesQuantity[2]}</h2>
                       <button className="defButton"  onClick={()=>{IncrementMilkShakes(2)}}>+</button>
                     </div>  
               </div>
                
               <div className="box" style={{border: "5px solid rgb(74, 196, 74)"}}>
                 <h1>{milkShakes[3]}</h1>
                   <div className="quantity-row">
                       <button className="defButton"    onClick={()=>{DecrementMilkShakes(3)}}>-</button>
                       <h2>{milkShakesQuantity[3]}</h2>
                       <button className="defButton"    onClick={()=>{IncrementMilkShakes(3)}}>+</button>
                     </div>  
               </div>
               </div>
                </>
            )}

          </div>

          <div className="Bill">
  <h1>YOUR ORDER</h1>
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Qty</th>
        <th>Cost</th>
      </tr>
    </thead>
    <tbody>
      {OrderedItems.map((item, index) => (
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>₹{item.cost}</td>
        </tr>
        
      ))}
      <tr>
        <td>TOTAL</td>
        <td>{TotalItem}</td>
        <td>₹{TotalCost}</td>
      </tr>
    </tbody>
  </table>

  {/* UPDATE TO SUPABASE */}

  

  <button onClick={handleConfirmOrder}>CONFIRM ORDER</button>

</div>




      </div>
    </>
  )
}

export default Orderpage


//   ₹