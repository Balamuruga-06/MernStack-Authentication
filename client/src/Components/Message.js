import React, {useEffect} from 'react';
import M from 'materialize-css'

const Message = props => {

    useEffect(() =>{
        M.AutoInit();
        {M.toast({html: `${props.message.msgBody}`})}
    }, [])
    
    return (
        <div>            

        </div>
    )
}
export default Message;