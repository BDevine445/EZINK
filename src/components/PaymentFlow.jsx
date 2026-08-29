import { useState } from 'react'
import ConfirmSheet from './ConfirmSheet'
import Receipt from './Receipt'
import VerifyPassword from './VerifyPassword'
import { useTranslation } from '../i18n/LanguageContext'

// Owns the confirm -> password -> POST /api/transaction -> receipt sequence
// for every outgoing/incoming money movement. Flow screens just call
// beginPayment({ type, amount, counterparty?, meta? }) and render this.
export default function PaymentFlow({ payment, balance, verifyPassword, onComplete, onCancel }) {
  const { t } = useTranslation()
  const [stage, setStage] = useState('confirm') // 'confirm' | 'verify' | 'done'
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  async function submit() {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: payment.type,
          amount: payment.amount,
          counterparty: payment.counterparty || undefined,
          meta: payment.meta || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(
          data.error === 'insufficient_funds' ? t('error.insufficientFunds') : t('error.generic')
        )
        return
      }
      setResult(data.transaction)
      setStage('done')
    } catch {
      setError(t('error.network'))
    } finally {
      setSubmitting(false)
    }
  }

  if (stage === 'done' && result) {
    return <Receipt transaction={result} onDone={() => onComplete(result)} />
  }

  return (
    <>
      <ConfirmSheet
        payment={payment}
        balance={balance}
        error={error}
        submitting={submitting}
        onConfirm={() => setStage('verify')}
        onCancel={onCancel}
      />
      {stage === 'verify' && (
        <VerifyPassword
          onVerify={verifyPassword}
          onSuccess={() => {
            setStage('confirm')
            submit()
          }}
          onCancel={() => setStage('confirm')}
        />
      )}
    </>
  )
}
