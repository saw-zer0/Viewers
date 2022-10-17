import React from 'react'
// import LesionMatchPopUp from "../LesionMatchPopUp\.png"

export default function LesionMatch() {
  return (
    <div className='h-220 bg-white'>
      <header className='grid grid-cols-3 gap-1' >
        <span>4 Matches</span>
        <span>1 of 4</span>
        <div className='flex flex-row justify-between'>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
            </svg>
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </header>
      <section>
        <div>
          <ul>
            <li>Legion Id: {"979208964589"}</li>
            <li>Diagnosis: {"malignant"}</li>
            <li>Type: {"DCIS"}</li>
          </ul>
          <ul>
            <li>Match %: {"96.4"}</li>
            <li>Segment %: {"100.0"}</li>
            <li>Density %: {"92.8"}</li>
          </ul>
        </div>
      </section>
      <div>

      </div>
      <div>

      </div>
    </div >
  )
}
