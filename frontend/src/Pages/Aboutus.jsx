import React from 'react'

const Aboutus = () => {
  return (
    <div>
      <br />
      <br />
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 drop-shadow-lg">
            Meet Our Team @Tech Buddies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="h-32 w-32 mx-auto rounded-full bg-gray-200"></div>
              <h3 className="text-xl font-semibold mt-4">Mohd Saad Siddiqui</h3>
              <p className="text-gray-600">Handled Frontend  Content and Integeration of API/backend</p>
            </div>
         
            <div className="text-center">
              <div className="h-32 w-32 mx-auto rounded-full bg-gray-200"></div>
              <h3 className="text-xl font-semibold mt-4">Pankaj Maske</h3>
              <p className="text-gray-600">Researched Frontend And backend APIs with platform .Built logic for application design</p>
            </div>
            <div className="text-center">
              <div className="h-32 w-32 mx-auto rounded-full bg-gray-200"></div>
              <h3 className="text-xl font-semibold mt-4">Sayali Lagad</h3>
              <p className="text-gray-600">Handled Backend Model Preparation with database and Feedback Mechanisms</p>
            </div>
          </div>
        </div>

    
    </div>
  )
}

export default Aboutus
