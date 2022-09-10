const showError = (errorMessage) => {
    const errorDiv = document.createElement('div');
    const redLine = document.createElement('div');
    const message = document.createElement('div');

    errorDiv.classList.add('error-div');
    redLine.classList.add('red-line');
    message.classList.add('message');

    message.textContent = errorMessage;

    errorDiv.appendChild(redLine);
    errorDiv.appendChild(message);

    body.appendChild(errorDiv);

    setTimeout(() => {
        body.removeChild(errorDiv);
    }, 2000);
}

