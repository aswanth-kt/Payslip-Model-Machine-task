import React, { useState } from 'react'
import { GeneratePayslip } from '../components/GeneratePayslip'
import { Payslip } from '../components/Payslip'

export const PayslipPage = () => {

  const [payslip, setPayslip] = useState(null);

  return (
    <>
      <GeneratePayslip setPayslip={setPayslip} />
      {payslip && <Payslip payslipData={payslip} />}
    </>
  )
}
