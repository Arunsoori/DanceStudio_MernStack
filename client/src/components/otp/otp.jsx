import React from 'react'
import "./otp.css"
function otp() {
  return (
    <div>
<div classname="container height-100 d-flex justify-content-center align-items-center">
  <div classname="position-relative">
    <div classname="card p-2 text-center">
      <h6>Please enter the one time password <br /> to verify your account</h6>
      <div> <span>A code has been sent to</span> <small>*******9897</small> </div>
      <div id="otp" classname="inputs d-flex flex-row justify-content-center mt-2"> <input classname="m-2 text-center form-control rounded" type="text" id="first" maxLength="{1}" /> <input classname="m-2 text-center form-control rounded" type="text" id="second" maxLength="{1}" /> <input classname="m-2 text-center form-control rounded" type="text" id="third" maxLength="{1}" /> <input classname="m-2 text-center form-control rounded" type="text" id="fourth" maxLength="{1}" /> <input classname="m-2 text-center form-control rounded" type="text" id="fifth" maxLength="{1}" /> <input classname="m-2 text-center form-control rounded" type="text" id="sixth" maxLength="{1}" /> </div>
      <div classname="mt-4"> <button classname="btn btn-danger px-4 validate">Validate</button> </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default otp

