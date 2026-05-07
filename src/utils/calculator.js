export function parseDecimal(value) {
    if (!value || value === '') return 0
    const cleaned = String(value).replace(/\s/g, '').replace(',', '.')
    const num = parseFloat(cleaned)
    return isNaN(num) ? 0 : num
}

export function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)
}

export function formatPercent(value) {
    return `${value.toFixed(2).replace('.', ',')}%`
}

export function applyBoost(odd, boostPercent) {
    if (boostPercent === 0) return odd
    return (odd - 1) * (1 + boostPercent / 100) + 1
}

export function calculate(odds) {
    if (!odds || odds.length < 2) {
        return {
            error: "Adicione pelo menos 2 odds para calcular",
            totalInvestment: 0,
            totalFreebet: 0,
            guaranteedReturn: 0,
            grossProfit: 0,
            netProfit: 0,
            roi: 0,
        }
    }

    const fixedOdd = odds.find((o) => o.isFixed)
    if (!fixedOdd) {
        return {
            error: "Marque pelo menos uma odd como fixa",
            totalInvestment: 0,
            totalFreebet: 0,
            guaranteedReturn: 0,
            grossProfit: 0,
            netProfit: 0,
            roi: 0,
        }
    }

    const fixedOddBoosted = applyBoost(fixedOdd.odd, fixedOdd.boost)
    const baseReturn = fixedOdd.value * fixedOddBoosted

    let totalInvestment = 0
    let totalFreebet = 0

    const calculatedOdds = odds.map((o) => {
        let calculatedValue = o.value

        if (!o.isFreebet) {
            const oddBoosted = applyBoost(o.odd, o.boost)
            calculatedValue = baseReturn / oddBoosted
        }

        if (o.isFreebet) {
            totalFreebet += calculatedValue
        } else {
            totalInvestment += calculatedValue
        }

        return {
            ...o,
            calculatedValue,
            oddBoosted: applyBoost(o.odd, o.boost),
        }
    })

    const grossProfit = baseReturn - totalInvestment

    let netProfit = grossProfit
    if (fixedOdd.commission > 0) {
        netProfit = grossProfit * (1 - fixedOdd.commission / 100)
    }

    const roi = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0

    return {
        error: null,
        odds: calculatedOdds,
        totalInvestment,
        totalFreebet,
        guaranteedReturn: baseReturn,
        grossProfit,
        netProfit,
        roi,
    }
}
