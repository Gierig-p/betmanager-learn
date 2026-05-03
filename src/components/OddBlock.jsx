import { useState } from 'react'
import { Trash2 } from 'lucide-react'

export default function OddBlock({ oddId, onRemove }) {
  const [type, setType] = useState('back')
  const [bookmaker, setBookmaker] = useState('')
  const [odd, setOdd] = useState('')
  const [value, setValue] = useState('')
  const [commission, setCommission] = useState('')
  const [boost, setBoost] = useState('')
  const [isFreebet, setIsFreebet] = useState(false)
  const [isFixed, setIsFixed] = useState(false)

  return (
    <div className="bg-slate-700 rounded-lg p-6 mb-4 border border-slate-600">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">TIPO</label>
          <div className="flex gap-2">
            <button
              onClick={() => setType('back')}
              className={`flex-1 py-2 rounded font-semibold transition ${
                type === 'back'
                  ? 'bg-green-500 text-slate-900'
                  : 'bg-slate-600 text-white hover:bg-slate-500'
              }`}
            >
              Back
            </button>
            <button
              onClick={() => setType('lay')}
              className={`flex-1 py-2 rounded font-semibold transition ${
                type === 'lay'
                  ? 'bg-green-500 text-slate-900'
                  : 'bg-slate-600 text-white hover:bg-slate-500'
              }`}
            >
              Lay
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">CASA</label>
          <input
            type="text"
            value={bookmaker}
            onChange={(e) => setBookmaker(e.target.value)}
            placeholder="Ex: Bet365"
            className="w-full bg-slate-600 text-white px-3 py-2 rounded border border-slate-500 focus:border-green-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">ODD</label>
          <input
            type="text"
            value={odd}
            onChange={(e) => setOdd(e.target.value)}
            placeholder="Ex: 2,30"
            className="w-full bg-slate-600 text-white px-3 py-2 rounded border border-slate-500 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">VALOR (R$)</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ex: 100,00"
            className="w-full bg-slate-600 text-white px-3 py-2 rounded border border-slate-500 focus:border-green-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">COMISSÃO (%)</label>
          <input
            type="text"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            placeholder="Ex: 2,5"
            className="w-full bg-slate-600 text-white px-3 py-2 rounded border border-slate-500 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">AUMENTO (%)</label>
          <input
            type="text"
            value={boost}
            onChange={(e) => setBoost(e.target.value)}
            placeholder="Ex: 15"
            className="w-full bg-slate-600 text-white px-3 py-2 rounded border border-slate-500 focus:border-green-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFreebet}
              onChange={(e) => setIsFreebet(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-400">Freebet</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFixed}
              onChange={(e) => setIsFixed(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-400">Fixar esta odd</span>
          </label>
        </div>

        <button
          onClick={() => onRemove(oddId)}
          className="text-red-500 hover:text-red-400 transition"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  )
}
