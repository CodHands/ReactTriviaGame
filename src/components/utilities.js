import React from 'react'
import SuccessToast from '../utilities/rightAnswerToast';
import FailureToast from '../utilities/wrongAnswerToast';

const Utilities = ({isSuccess,isFailure,isFinished}) => {
        return (
            <div>
                {isSuccess ? <SuccessToast/> : null}
                {isFailure ? <FailureToast/> : null}
            </div>
        )
}

export default Utilities;
