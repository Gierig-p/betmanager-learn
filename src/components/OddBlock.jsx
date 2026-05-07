import { useState } from 'react'
import { Trash2, Pin } from 'lucide-react'

export default function OddBlock({ odd, onUpdate, onRemove, canFix }) {
  // Função auxiliar para atualizar campos
  const update = (field, value) => {
    onUpdate(odd.id, { ...odd, [field]: value })
  }

  return (
    <div className="bg-slate-700 rounded-lg p-6 mb-4 border border-slate-600">
      {/* Linha 1: Tipo, Casa, Odd, Valor, Freebet */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        {/* TIPO */}
        <div>
          <label className="block text-xs text-gray-400 mb-2">TIPO</label>
          <div className="flex gap-1">
            <button
              onClick={() => update('type', 'back')}
              className={`flex-1 py-2 px-2 rounded text-sm font-semibold transition ${
                odd.type === 'back'
                  ? 'bg-green-500 text-slate-900'
                  : 'bg-slate-600 text-white hover:bg-slate-500'
              }`}
            >
              Back
            </button>
            <button
              onClick={() => update('type', 'lay')}
              className={`flex-1 py-2 px-2 rounded text-sm font-semibold transition ${
                odd.type === 'lay'
                  ? 'bg-green-500 text-slate-900'
                  : 'bg-slate-600 text-white hover:bg-slate-500'
              }`}
            >
              Lay
            </button>
          </div>
        </div>

        {/* CASA */}
        <div>
          <label className="block text-xs text-gray-400 mb-2">CASA</label>
          <input
            type="text"
            value={odd.bookmaker}
            onChange={(e) => update('bookmaker', e.target.value)}
            placeholder="Bet365"
            className="w-full bg-slate-600 text-white px-3 py-2 rounded border border-slate-500 focus:border-green-500 focus:outline-none text-sm"
          />
        </div>

        {/* ODD */}
        <div>
          <label className="block text-xs text-gray-400 mb-2">ODD</label>
          <input
            type="text"
            value={odd.oddInput}
            onChange={(e) => update('oddInput', e.target.value)}
            placeholder="2,30"
            className="w-full bg-slate-600 text-white px-3 py-2 rounded border border-slate-500 focus:border-green-500 focus:outline-none text-sm"
          />
        </div>

        {/* VALOR */}
        <div>
          <label className="block text-xs text-gray-400 mb-2">VALOR (R$)</label>
          <input
            type="text"
            value={odd.valueInput}
            onChange={(e) => update('valueInput', e.target.value)}
            placeholder="100,00"
            disabled={!odd.isFixed}
            className={`w-full px-3 py-2 rounded border focus:border-green-500 focus:outline-none text-sm ${
              odd.isFixed
                ? 'bg-slate-600 text-white border-slate-500'
                : 'bg-slate-800 text-gray-500 border-slate-700 cursor-not-allowed'
            }`}
          />
        </div>

        {/* FREEBET */}
        <div>
          <label className="block text-xs text-gray-400 mb-2">FREEBET</label>
          <button
            onClick={() => update('isFreebet', !odd.isFreebet)}
            className={`w-12 h-6 rounded-full transition ${
              odd.isFreebet ? 'bg-green-500' : 'bg-slate-600'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition transform ${
                odd.isFreebet ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Linha 2: Comissão, Aumento, Fixar, Remover */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* COMISSÃO */}
        <div>
          <label className="block text-xs text-gray-400 mb-2">COMISSÃO (%)</label>
          <input
            type="text"
            value={odd.commissionInput}
            onChange={(e) => update('commissionInput', e.target.value)}
            placeholder="2,5"
            className="w-full bg-slate-600 text-white px-3 py-2 rounded border border-slate-500 focus:border-green-500 focus:outline-none text-sm"
          />
        </div>

        {/* AUMENTO */}
        <div>
          <label className="block text-xs text-gray-400 mb-2">AUMENTO (%)</label>
          <input
            type="text"
            value={odd.boostInput}
            onChange={(e) => update('boostInput', e.target.value)}
            placeholder="15"
            className="w-full bg-slate-600 text-white px-3 py-2 rounded border border-slate-500 focus:border-green-500 focus:outline-none text-sm"
          />
        </div>

        {/* FIXAR ODD */}
        <div>
          <label className="block text-xs text-gray-400 mb-2">FIXAR ESTA ODD</label>
          <button
            onClick={() => {
              if (!odd.isFixed && !canFix) return
              update('isFixed', !odd.isFixed)
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded transition ${
              odd.isFixed
                ? 'bg-green-500 text-slate-900'
                : 'bg-slate-600 text-white hover:bg-slate-500'
            }`}
          >
            <Pin size={16} />
            {odd.isFixed ? 'Fixada' : 'Fixar'}
          </button>
        </div>

        {/* REMOVER */}
        <div className="flex justify-end">
          <button
            onClick={() => onRemove(odd.id)}
            className="bg-red-900/30 text-red-500 hover:bg-red-900/50 hover:text-red-400 transition p-2 rounded border border-red-900"
            title="Remover odd"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}