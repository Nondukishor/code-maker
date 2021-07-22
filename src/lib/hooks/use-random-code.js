import React from 'react'

export default function useRandomCode(length=5, type="string"){
    const [code, setCode] = React.useState(length? length : 5)
    const generated = {
        numeric: "0123456789",
        text: "abcdefghijklmnopqrstuvwxyz"
    }
    if(typeof type === 'number'){
        for( var i=0; i < textLength; i++ )
        {
            setCode(code += generated.numeric.charAt(Math.floor(Math.random() * generated.numeric.length))) ;
           
        }
    }
    if(typeof type==="string"){
        setCode(code+=generated.text.charAt(Math.floor(Math.random() * generated.text.length)))
    }
 return code
}
