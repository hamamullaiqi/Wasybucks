import React, {useState} from 'react'
import SelectToping from '../Pages/SelectToping'
import { data } from '../Pages/DetailProduct'



const TopingList = ({item, id}) => {

    
   

    const [checked, setChecked] = useState(false);
    
    const handleChecked= () => {
         setChecked(!checked)

          const datacheck = data[0].find(topping => topping.id === id).checked = !checked;
        
          
    }
    
  return (
            <div onClick={ handleChecked}  >
                    <img
                        src={item.image}
                        alt={item.title}
                        
                        
                    />

                { checked && <SelectToping /> } 
                
                
                    <p className='text-red'>{item.title}</p>
                   
            </div> 
    )

}
export default TopingList


