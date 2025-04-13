import React from 'react'

type InfoCardProps = {
  title?: string
  children: React.ReactNode
  className?: string
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-4 border border-gray-200 dark:border-gray-700 ${className}`}>
      {title && (
        <div className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </div>
      )}
      {children}
    </div>
  )
}

export default InfoCard
