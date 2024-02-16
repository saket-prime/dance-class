import React from 'react'

const ContactUs = () => {
  return (
    <div className='h-screen snap-start' id='contact'>ContactUs
        <div>
            contact Information
        </div>
        <div>
            <p>contact us</p>
              <form class="max-w-md mx-auto">
                  <div class="mb-6">
                      <input type="text" placeholder='name' class="border border-gray-400 p-2 rounded" />
                  </div>
                  <div class="mb-6">
                      <input type="text" placeholder='email' class="border border-gray-400 p-2 rounded" />
                  </div>
                  <div class="mb-6">
                      <textarea placeholder="message" rows="4" class="border border-gray-400  rounded"></textarea>
                  </div>
                  <div class="flex items-center justify-between">
                      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                          Submit
                      </button>
                  </div>
              </form>
        </div>
    </div>
  )
}

export default ContactUs