import { useState, useMemo } from 'react'
import OddBlock from '../components/OddBlock'
import { calculate, parseDecimal, formatCurrency, formatPercent } from '../utils/calculator'

// Função para criar uma nova odd vazia
function createEmptyOdd(isFirst = false) {
  return {
    id: Date.now() + Math.random(),
    type: 'back',
    bookmaker: '',
    oddInput: '',
    valueInput: isFirst ? '100,00' : '',
    commissionInput: '',
    boostInput: '',
    isFreebet: false,
    isFixed: isFirst,
  }
}

export default function Calculator() {
  // Inicia com 2 odds (mínimo para arbitragem)
  const [odds, setOdds] = useState([
    createEmptyOdd(true),
    createEmptyOdd(false),
  ])

  // Adiciona nova odd
  const addOdd = () => {
    setOdds([...odds, createEmptyOdd(false)])
  }

  // Remove odd (mínimo 2)
  const removeOdd = (id) => {
    if (odds.length <= 2) {
      alert('Mínimo de 2 odds é necessário')
      return
    }
    setOdds(odds.filter((o) => o.id !== id))
  }

  // Atualiza uma odd
  const updateOdd = (id, newOdd) => {
    setOdds(
      odds.map((o) => {
        if (o.id === id) {
          // Se essa odd está sendo marcada como fixa, desmarcar as outras
          if (newOdd.isFixed && !o.isFixed) {
            return newOdd
          }
          return newOdd
        }
        // Se outra odd foi marcada como fixa, desmarcar essa
        if (newOdd.isFixed && o.isFixed) {
          return { ...o, isFixed: false }
        }
        return o
      })
    )
  }

  // Verifica se pode fixar (apenas uma odd fixa por vez)
  const hasFixed = odds.some((o) => o.isFixed)

  // Cálculo em tempo real (useMemo evita recalcular sem necessidade)
  const result = useMemo(() => {
    // Converte os inputs (com vírgula) para números
    const parsedOdds = odds.map((o) => ({
      ...o,
      odd: parseDecimal(o.oddInput),
      value: parseDecimal(o.valueInput),
      commission: parseDecimal(o.commissionInput),
      boost: parseDecimal(o.boostInput),
    }))

    return calculate(parsedOdds)
  }, [odds])

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

        {odds.map((odd) => (
          <OddBlock
            key={odd.id}
            odd={odd}
            onUpdate={updateOdd}
            onRemove={removeOdd}
            canFix={!hasFixed}
          />
        ))}

        <button
          onClick={addOdd}
          className="w-full py-3 border-2 border-dashed border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-slate-900 transition mt-4"
        >
          + Adicionar Odd
        </button>
      </div>

      {/* Seção de Resultados */}
      <div className="bg-slate-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-green-400">RESULTADOS</h2>

        {result.error ? (
          <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-300 p-4 rounded">
            ⚠️ {result.error}
          </div>
        ) : (
          <>
            {/* Grid de métricas */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-700 p-4 rounded">
                <p className="text-xs text-gray-400 mb-1">INVESTIMENTO REAL</p>
                <p className="text-xl font-bold">{formatCurrency(result.totalInvestment)}</p>
              </div>

              {result.totalFreebet > 0 && (
                <div className="bg-blue-900/30 p-4 rounded border border-blue-700">
                  <p className="text-xs text-blue-300 mb-1">FREEBET</p>
                  <p className="text-xl font-bold text-blue-300">
                    {formatCurrency(result.totalFreebet)}
                  </p>
                </div>
              )}

              <div className="bg-slate-700 p-4 rounded">
                <p className="text-xs text-gray-400 mb-1">RETORNO GARANTIDO</p>
                <p className="text-xl font-bold">{formatCurrency(result.guaranteedReturn)}</p>
              </div>

              <div className="bg-slate-700 p-4 rounded">
                <p className="text-xs text-gray-400 mb-1">LUCRO BRUTO</p>
                <p
                  className={`text-xl font-bold ${
                    result.grossProfit >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {formatCurrency(result.grossProfit)}
                </p>
              </div>

              <div className="bg-slate-700 p-4 rounded">
                <p className="text-xs text-gray-400 mb-1">LUCRO LÍQUIDO</p>
                <p
                  className={`text-xl font-bold ${
                    result.netProfit >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {formatCurrency(result.netProfit)}
                </p>
              </div>

              <div className="bg-slate-700 p-4 rounded">
                <p className="text-xs text-gray-400 mb-1">ROI</p>
                <p
                  className={`text-xl font-bold ${
                    result.roi >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {formatPercent(result.roi)}
                </p>
              </div>
            </div>

            {/* Valores calculados de cada odd */}
            {result.odds && (
              <div className="bg-slate-700 p-4 rounded">
                <h3 className="text-sm font-bold text-gray-300 mb-3">
                  VALORES CALCULADOS POR ODD
                </h3>
                <div className="space-y-2">
                  {result.odds.map((o, index) => (
                    <div key={o.id} className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        Odd {index + 1} ({o.bookmaker || 'Sem casa'})
                        {o.isFixed && ' 📌'}
                        {o.isFreebet && ' 🎁'}
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(o.calculatedValue)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}