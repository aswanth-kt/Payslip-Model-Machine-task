import "./Payslip.css"

export const Payslip = ({ payslipData }) => {
  return (
    <div className="payslip-page">

      <div className="print-area">
        <button className="print-btn">🖨 Print Payslip</button>
      </div>

      <div className="payslip-card">

        {/* Header */}
        <div className="company-header">
          <h2>BTRACK</h2>
          <p>Down Town, Kannur, Talap</p>
          <h3>Salary Slip - {payslipData.totalPayableDay} (Leave: {payslipData.leave})</h3>
        </div>

        <hr />

        {/* Employee Info */}
        <div className="employee-info">

          <div>
            <p><strong>Employee Name:</strong>{ payslipData.employee.name }</p>
            <p><strong>Employee ID:</strong> { payslipData.employee.employeeId }</p>
            <p><strong>Designation:</strong> { payslipData.employee.designation }</p>
          </div>

          <div>
            <p><strong>Date of Joining:</strong> { new Date(payslipData.employee.joiningDate).toLocaleDateString('en-IN') }</p>
            <p><strong>Payable Days:</strong> { payslipData.totalPayableDay } </p>
            <p><strong>Date of Issue:</strong> { new Date().toISOString().split('T')[0] } </p>
          </div>

        </div>

        {/* Earnings & Deductions */}
        <div className="salary-table">

          <div className="earnings">

            <div className="table-header">Earnings</div>

            <div className="row">
              <span>Basic Salary</span>
              <span>₹{payslipData.adjustBasicSalary}</span>
            </div>

            <div className="row">
              <span>House Rent Allowance (HRA)</span>
              <span>₹{payslipData.hra}</span>
            </div>

            <div className="row">
              <span>Dearness Allowance (DA)</span>
              <span>₹{payslipData.da}</span>
            </div>

            <div className="row">
              <span>Other Allowances</span>
              <span>₹{payslipData.otherAllowances}</span>
            </div>

            <div className="total-row">
              <span>Total Earnings</span>
              <span>₹{payslipData.totalEarnings}</span>
            </div>

          </div>

          <div className="deductions">

            <div className="table-header">Deductions</div>

            <div className="row">
              <span>Provident Fund (PF)</span>
              <span>₹{payslipData.pf}</span>
            </div>

            <div className="row">
              <span>ESI</span>
              <span>₹{payslipData.esi}</span>
            </div>

            <div className="total-row">
              <span>Total Deductions</span>
              <span>₹{payslipData.totalDeductions}</span>
            </div>

          </div>

        </div>

        {/* Net Salary */}
        <div className="net-salary">
          <span>Net Salary Payable</span>
          <strong>₹{payslipData.netSalary}</strong>
        </div>

        {/* Signatures */}
        <div className="signature-section">

          <div className="signature">
            <div className="line"></div>
            <p>Employer Signature</p>
          </div>

          <div className="signature">
            <div className="line"></div>
            <p>Employee Signature</p>
          </div>

        </div>

      </div>
    </div>
  );
};