import React from 'react';
import { useParams } from 'react-router-dom';

const Apply = () => {
  const { scheme_name } = useParams(); // Extract scheme name from URL

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      {/* Scheme Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Apply for <span className="text-blue-600">{scheme_name}</span>
      </h1>

      {/* How to Apply Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Apply</h2>
        <p className="text-gray-600">
          Thank you for your interest in applying for <span className="text-blue-600">{scheme_name}</span>.
          Detailed instructions on how to apply will be made available soon. Please check back later or stay updated with the latest announcements.
        </p>
        <div className="mt-4">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors duration-300">
            Notify Me
          </button>
        </div>
      </div>

      {/* Feature Coming Soon */}
      <div className="bg-yellow-100 rounded-lg shadow-lg p-6 w-full max-w-3xl mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feature Coming Soon</h2>
        <p className="text-gray-600">
          We're working hard to bring you the best application experience for <span className="text-blue-600">{scheme_name}</span>.
          Stay tuned as we introduce more features to simplify the application process.
        </p>
      </div>

      {/* End Application Feedback Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">End Application Feedback</h2>
        <form>
          {/* Scheme Selection */}
          <div className="mb-4">
            <label htmlFor="scheme" className="block text-gray-700 font-medium mb-2">
              Which scheme did you apply for? <span className="text-red-500">*</span>
            </label>
            <select
              id="scheme"
              className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none"
            >
              <option value={scheme_name || ''} selected>
                {scheme_name ? scheme_name.replace(/-/g, ' ') : 'Please Select'}
              </option>
              <option value="Other Scheme">Other Scheme</option>
            </select>
          </div>

          {/* Satisfaction Rating */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Overall, how satisfied were you with the application process? <span className="text-red-500">*</span>
            </label>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Unsatisfied</span>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={num} className="flex items-center">
                    <input
                      type="radio"
                      name="satisfaction"
                      value={num}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-1 text-gray-700">{num}</span>
                  </label>
                ))}
              </div>
              <span className="text-sm text-gray-500">Very Satisfied</span>
            </div>
          </div>

          {/* Preferred Access Method */}
          <div className="mb-4">
            <label htmlFor="access-method" className="block text-gray-700 font-medium mb-2">
              How would you prefer to access scheme application tracking? <span className="text-red-500">*</span>
            </label>
            <select
              id="access-method"
              className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none"
            >
              <option value="email">Email</option>
              <option value="mobile">Mobile</option>
              <option value="kiosk">Kiosk</option>
            </select>
          </div>

          {/* Feedback Textarea */}
          <div className="mb-4">
            <label htmlFor="feedback" className="block text-gray-700 font-medium mb-2">
              Additional Feedback
            </label>
            <textarea
              id="feedback"
              rows="4"
              placeholder="Share your feedback about the application process..."
              className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors duration-300"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Apply;
