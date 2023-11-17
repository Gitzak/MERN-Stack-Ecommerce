import './FormInput.css'

const FormInput = ({label, inputOptions}) => {
  return (
    <div className='group'>
        
        <input className="form-input" {...inputOptions}/>

        {label && (
            <label className={`${inputOptions.value.length > 0 ? 'shrink' : ''} form-input-label `}> {label} </label>
        )}

      </div>
  )
}

export default FormInput
