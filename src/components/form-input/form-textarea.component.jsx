import React from 'react';

import './form-input.styles.scss'

const TextArea = ({ textarea, ...otherProps}) => (
    <div className="group">
        <textarea className='form-textarea'{...otherProps} />
        {textarea ? (
            <textarea 
                className={`${
                    otherProps.value.length ? 'shrink' : ''
                } form-textarea-label`}
            >
                {textarea}
            </textarea>
            ) : null}
    </div>
)
export default TextArea;