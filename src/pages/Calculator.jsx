import { useState } from 'react'
import OddBlock from '../components/OddBlock'

export default function Calculator() {
  const [odds, setOdds] = useState([])

  // Função para remover uma odd
  const handleRemoveOdd = (oddId) => {
    setOdds(odds.filter(odd => odd.id !== oddId))
  }

  // Função para adicionar uma odd
  const handleAddOdd = () => {
    setOdds([...odds, { id: Date.now() }])
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Calculadora Tática</h1>
        <p className="text-gray-400">
          Arbitragem, Freebet, Boost e Comissão combinados em um só lugar
        </p>
      </div>

      {/* Seção de Odds */}
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-green-400">
          ODDS E CONFIGURAÇÕES
        </h2>
        
        {/* Lista de Odds */}
        {odds.map(odd => (
          <OddBlock
            key={odd.id}
            oddId={odd.id}
            onRemove={handleRemoveOdd}
          />
        ))}

        {odds.length === 0 && (
          <p className="text-gray-400 text-center py-8">
            Nenhuma odd adicionada ainda. Clique no botão abaixo para começar.
          </p>
        )}

        {/* Botão para adicionar odd */}
        <button
          onClick={handleAddOdd}
          className="w-full py-3 border-2 border-dashed border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-slate-900 transition"
        >
          + Adicionar Odd
        </button>
      </div>

      {/* Seção de Resultados */}
      <div className="bg-slate-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-green-400">
          RESULTADOS
        </h2>
        <p className="text-gray-400">
          Adicione odds para ver os resultados aqui
        </p>
      </div>
    </div>
  )
}