import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';
import PropTypes from 'prop-types';

export default function PaymentForm({ course, onSuccess }) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing here
    console.log('Processing payment:', formData);
    onSuccess?.();
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Complete Purchase</h2>
        <p className="text-gray-600 mt-2">
          Total amount: ${course?.price.toFixed(2)}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Card Number</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="1234 5678 9012 3456"
              maxLength="19"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Expiry Date</label>
            <input
              type="text"
              value={formData.expiryDate}
              onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="MM/YY"
              maxLength="5"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">CVV</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="password"
                value={formData.cvv}
                onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="123"
                maxLength="3"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Cardholder Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Name on card"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium"
        >
          Pay ${course?.price.toFixed(2)}
        </motion.button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Your payment information is secure and encrypted
      </p>
    </div>
}

PaymentForm.propTypes = {
  course: PropTypes.shape({
    price: PropTypes.number.isRequired,
  }).isRequired,
  onSuccess: PropTypes.func,
}; );
}