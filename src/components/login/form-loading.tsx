'use client'

import { useEffect, useState } from 'react'

interface FormLoadingProps {
  inputCount: number
  children?: React.ReactNode
  buttonText?: string
}

const FormLoading: React.FC<FormLoadingProps> = ({
  inputCount = 3,
  children,
  buttonText = 'Submit',
}) => {
  const [inputs, setInputs] = useState<number[]>([])
  useEffect(() => {
    setInputs(createArray(inputCount))
  }, [])

  const createArray = (length: number) => {
    return new Array(length).fill(0)
  }

  return (
    <div className="form-loading animate-pulse">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="grid w-full items-center gap-4">
        {inputs.map((input, index) => (
          <div
            key={index}
            className="h-9 bg-slate-600 rounded-md flex flex-col space-y-1.5"
          ></div>
        ))}
        <fieldset className="flex flex-col space-y-1.5 mt-4">
          {children}
        </fieldset>
        <fieldset className="flex flex-col space-y-1.5 mt-4">
          <button type="submit" className="btn btn-accent text-white" disabled>
            {buttonText}
          </button>
        </fieldset>
      </div>
    </div>
  )
}

export default FormLoading
