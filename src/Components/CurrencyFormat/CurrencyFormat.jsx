import React from 'react'

const CurrencyFormat = ({ amount }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  return <span>{formatCurrency(amount)}</span>
}

export default CurrencyFormat