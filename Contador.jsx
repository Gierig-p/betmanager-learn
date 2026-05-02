import { useState } from "react";

export default function Contador() {
  const [contador, setContador] = useState(0);
  
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Contador: {contador}</h1>

      <button onClick={() => setContador(contador + 1)}
        style={{padding: "10px 20px", fontSize: "16px"}}>Incrementar
        
        </button>

      <button onClick={() => setContador(contador - 1)}
        style={{padding: "10px 20px", fontSize: "16px", marginLeft: "10px"}}
        >Decrementar
        
        </button>

      <button onClick={() => setContador(0)}
        style={{padding: "10px 20px", fontSize: "16px", marginLeft: "10px"}}
        >Resetar
        
        </button>

    </div>
  );
}