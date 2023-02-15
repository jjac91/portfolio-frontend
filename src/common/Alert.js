import React from "react";

/**Component for showing boostrap style alerts
 * the default type of Alert is danger
 */

function Alert({ type = "danger", messages = [] }) {
  
    return (
        <div className={`alert alert-${type}`} role="alert">
          {messages.map(message => (
              <p className="mb-0 small" key={message}>
                {message}
              </p>
          ))}
        </div>
    );
  }

export default Alert