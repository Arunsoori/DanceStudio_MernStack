// import React from 'react'
// import "./UserFooter.css"
// import { Link } from 'react-router-dom';
// import { BsInstagram,BsFacebook,BsYoutube} from "react-icons/bs";

// function UserFooter() {
//   return (
//     <div>
//         {/* Footer */}
// <footer className="text-center text-lg-start  text-muted footer">
//   {/* Section: Social media */}
//   <section className="d-flex  flex-column flex-md-row  p-4 border-bottom">
//   {/* Left */}
  
//   <div className="d-flex ">
//     <div>
//      <span> <h3> Get connected with us on social networks: </h3></span>
//     </div>
//   </div>
//   {/* Left */}
//   {/* Right */}
  
//     <div className="ms-md-auto social-icons d-flex   justify-content-center gap-5">
//       <Link to="#" className="social-icon"><BsFacebook size={30} /></Link>
//       <Link to="#" className="social-icon"><BsInstagram  size={30}/></Link>
//       <Link to="#" className="social-icon"><BsYoutube size={30} /></Link>
//     </div>
  
  

//   {/* Right */}
// </section>

//   {/* Section: Social media */}
//   {/* Section: Links  */}
//   <section className>
//     <div className="container text-center text-md-start mt-5">
//       {/* Grid row */}
//       <div className="row mt-3">
//         {/* Grid column */}
//         <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4  d-flex flex-column align-items-center">
//           {/* Content */}
//           <img style={{width:'200px'}} src="../../..//download-final.png" alt="" />
         
//           <h6 className="text-uppercase fw-bold mb-4">
//             {/* <i className="fas fa-gem me-3" /> */}
         
//             <p>Where Dance meets fun </p>

//           </h6>

//           {/* <p>
//             Here you can use rows and columns to organize your footer content. Lorem ipsum
//             dolor sit amet, consectetur adipisicing elit.
//           </p> */}
//         </div>
//         {/* Grid column */}
//         {/* Grid column */}
//         {/* <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
//           {/* Links */}
//           {/* <h6 className="text-uppercase fw-bold mb-4">
//             Products
//           </h6>
//           <p>
//             <a href="#!" className="text-reset">Angular</a>
//           </p>
//           <p>
//             <a href="#!" className="text-reset">React</a>
//           </p>
//           <p>
//             <a href="#!" className="text-reset">Vue</a>
//           </p>
//           <p>
//             <a href="#!" className="text-reset">Laravel</a>
//           </p>
//         // </div> */ }
//         {/* Grid column */}
//         {/* Grid column */}
//         <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
//           {/* Links */}
//           <h6 className="text-uppercase fw-bold mb-4">
//             Useful links
//           </h6>
//           <p>
//             <a href="#!" className="text-reset">Contact</a>
//           </p>
//           <p>
//             <a href="#!" className="text-reset">Refund & Cancellation</a>
//           </p>
//           <p>
//             <a href="#!" className="text-reset"> Privacy Policy</a>
//           </p>
//           <p>
//             <a href="#!" className="text-reset">Term Conditions</a>
//           </p>
//         </div>
//         {/* Grid column */}
//         {/* Grid column */}
//         <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
//           {/* Links */}
//           <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
//           <p><i className="fas fa-home me-3" /> near EMS stadium, Tazhekkod, Kozhikode, Kerala 673032</p>
//           <p>
//             <i className="fas fa-envelope me-3" />
//             thunderlines.com
//           </p>
//           <p><i className="fas fa-phone me-3" /> 9633864222</p>
//           <p><i className="fas fa-print me-3" /> 9633864222</p>
//         </div>
//         {/* Grid column */}
//       </div>
//       {/* Grid row */}
//     </div>
//   </section>
//   {/* Section: Links  */}
//   {/* Copyright */}
//   <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
//     © 2023 Copyright:
//     <a className="text-reset fw-bold" href="https://mdbootstrap.com/">Thunderlines.com</a>
//   </div>
//   {/* Copyright */}
// </footer>
// {/* Footer */}
//     </div>
//   )
// }

// export default UserFooter


function UserFooter(){
  return (
<div class="">

<footer className="text-center text-white" style={{backgroundColor: '#212121'}}>
  {/* Grid container */}
  <div className="container p-4 d-none d-sm-block" >
    {/* Section: Images */}
    <section className>
      <div className="row">
        <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
          <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
            <img src="/footer1.jpg" className="w-100" />
            <a href="#!">
              <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.2)'}} />
            </a>
          </div>
        </div>
        <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
          <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
            <img src="/footer2.jpg" className="w-100" />
            <a href="#!">
              <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.2)'}} />
            </a>
          </div>
        </div>
        <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
          <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
            <img src="/footer3.jpg" className="w-100" />
            <a href="#!">
              <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.2)'}} />
            </a>
          </div>
        </div>
        <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
          <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
            <img src="/footer4.jpg" className="w-100" />
            <a href="#!">
              <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.2)'}} />
            </a>
          </div>
        </div>
        <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
          <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
            <img src="/footer5.jpg" className="w-100" />
            <a href="#!">
              <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.2)'}} />
            </a>
          </div>
        </div>
        <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
          <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
            <img src="/footer6.jpg" className="w-100" />
            <a href="#!">
              <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.2)'}} />
            </a>
          </div>
        </div>
      </div>
    </section>
    {/* Section: Images */}
  </div>
  {/* Grid container */}
  {/* Copyright */}
  <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
    © 2023 Copyright:
    <a className="text-white" href="">thunderlines.online</a>
  </div>
  {/* Copyright */}
</footer>


</div>





  )
}

export default UserFooter