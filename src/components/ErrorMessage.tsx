import React from 'react'
import { motion } from 'framer-motion'
import { FaExclamationTriangle } from 'react-icons/fa'

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <motion.div 
      className="bg-red-50 dark:bg-red-900/20 border border-red-400 dark:border-red-500/50 
                 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <motion.div
        className="absolute inset-0 bg-red-500/10"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }}
      />
      <div className="relative flex items-center gap-3">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <FaExclamationTriangle className="text-red-500 text-xl" />
        </motion.div>
        <div>
          <strong className="font-bold mr-2">Hata!</strong>
          <span className="block sm:inline">{message}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default ErrorMessage 