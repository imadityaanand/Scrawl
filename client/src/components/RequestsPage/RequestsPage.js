import React from 'react'
import Navbar from '../Navbar/Navbar'
import RequestCard from './RequestCard'

function RequestsPage() {
  return (
    <div className='requestspage'>
        <Navbar />
        <div className='main-container'>
            <h1>Requests</h1>
            <RequestCard
              categories={['Physics', 'EMI', 'Magentics']}
              image='../../../assets/aditya2.png'
              username='shutkone'
              text='Hi, can anyone provide a 3-4 pages of Formula Sheet for Magnetism and Matter for quick revision. Thank you.'
              date='4d'
              submissions={24}
            />
            <RequestCard
              categories={['Physics', 'EMI', 'Magentics']}
              image='../../../assets/aditya2.png'
              username='shutkone'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
              date='4d'
              submissions={24}
            />
            <RequestCard
              categories={['Physics', 'EMI', 'Magentics']}
              image='../../../assets/aditya2.png'
              username='shutkone'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
              date='4d'
              submissions={24}
            />
            <RequestCard
              categories={['Physics', 'EMI', 'Magentics']}
              image='../../../assets/aditya2.png'
              username='shutkone'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
              date='4d'
              submissions={24}
            />
            <RequestCard
              categories={['Physics', 'EMI', 'Magentics']}
              image='../../../assets/aditya2.png'
              username='shutkone'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
              date='4d'
              submissions={24}
            />
        </div>
    </div>
  )
}

export default RequestsPage
