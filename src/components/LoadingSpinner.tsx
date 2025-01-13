import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner: React.FC = () => {
  const circleVariants = {
    start: {
      y: "0%"
    },
    bounce: {
      y: ["0%", "-50%"],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.6,
          ease: "easeInOut"
        }
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            variants={circleVariants}
            initial="start"
            animate="bounce"
            transition={{
              delay: index * 0.15
            }}
            className="w-3 h-3 rounded-full bg-accent"
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-gray-600 dark:text-gray-300 font-medium"
      >
        Yükleniyor...
      </motion.div>
      <motion.div
        className="w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="h-full bg-accent"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  )
}

export default LoadingSpinner 