import React from 'react'

export default function useRandomCode(length=5, type="string"){
    let [code, setCode] = React.useState(length? length : 5)


    const generated = {
        numeric: "0123456789",
        text: "abcdefghijklmnopqrstuvwxyz"
    }

    function generate (){
        if(typeof type === 'number'){
            for( let i=0; i < length; i++ )
            {
                setCode(code += generated.numeric.charAt(Math.floor(Math.random() * generated.numeric.length))) ;
               
            }
        }
        if(typeof type==="string"){
            for( let i=0; i < length; i++ )
            {
                setCode(code+=generated.text.charAt(Math.floor(Math.random() * generated.text.length)))
            }
           
        }
    } 
 return {code, generate}
}
