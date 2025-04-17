import { useEffect, useState } from 'react';
import { supabase } from './Supabase';
import "./Inventory.css";

function Inventory() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const[RollItem,setRollItem]=useState("VEG");
    const[FriesItem,setFriesitem]=useState("Salt");
    const[FoodType,setFoodType]=useState("Rolls");
   

    useEffect(() => {
        setLoading(true);
        const fetchItems = async () => {
            const { data, error } = await supabase.from("Inventory").select("*");    //ratta

            if (error) {
                console.error("Error fetching data:", error);
            } else {
                setItems(data);
            }
            setLoading(false);
        };

        fetchItems();
    }, []);

    const AddItem= async()=>{

        const lastOrderNo = items.length > 0 ? items[items.length - 1].OrderNo : 0;
        const newOrderNo = lastOrderNo + 1;

        const newItem = { OrderNo: newOrderNo, Rolls: RollItem, Fries: FriesItem };
    
        const { error } = await supabase.from("Inventory").insert([newItem]);

        if(error){
            console.log("error in inserting data")
        }
        else{
            console.log("insertrd data :)")
        }

        setItems((prevItems) => [...prevItems, newItem]);
    }

    return (
        <>
            <h1 style={{color :"white"}}>Inventory</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='Parent'>
                    <div className='table-container'>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>ORDER NO</th>
                                    <th>ROLLS</th>
                                    <th>FRIES</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                    items.map((item) => (                  //ratta
                                        <tr key={item.id}>
                                        
                                            <td>{item.OrderNo}</td>
                                            <td>{item.Rolls}</td>
                                            <td>{item.Fries}</td>
                                        </tr>
                                    ))}
                            
                            </tbody>
                        </table>
                        </div>

                    <div className='ItemAdder'>
                            <select value={FoodType} onChange={(e)=>{setFoodType(event.target.value)}}>
                                <option value="Rolls">Rolls</option>
                                <option value="Fries">Fries</option>  
                            </select>
                        
                            {/*Rolls */

                            FoodType==="Rolls" &&(
                            <select value={RollItem}  onChange={(e)=>setRollItem(event.target.value)}>
                                <option value="VEG">VEG</option>
                                <option value="Panner">Panner</option>  
                            </select>
                            )
                            
                            }

                            {/*Fries */

                            FoodType==="Fries" &&(
                            <select value={FriesItem}  onChange={(e)=>  setFriesitem(event.target.value)}>
                                <option value="Salt">Salt</option>
                                <option value="Peri">Peri</option>  
                            </select>
                            )
                            }

                            <button  onClick={AddItem}> CONFIRM!</button>

                    <div className='display'>
                        
                        <h2>UR ORDER</h2>

                       <p>  Rolls : {RollItem}</p>
                       <p>  Fries : {FriesItem}</p>
                        
                    </div>
                
                
                    </div>
                
                </div>
            )}
        </>
    );
}

export default Inventory;
