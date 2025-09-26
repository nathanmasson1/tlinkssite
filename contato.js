// JavaScript específico para a página de contato

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulário
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Limpar mensagens de erro anteriores
            clearErrors();
            
            let isValid = true;
            
            // Validar nome
            if (!data.name || data.name.trim().length < 2) {
                showFieldError('name', 'Nome deve ter pelo menos 2 caracteres');
                isValid = false;
            }
            
            // Validar email
            if (!data.email || !isValidEmail(data.email)) {
                showFieldError('email', 'Email inválido');
                isValid = false;
            }
            
            // Validar assunto
            if (!data.subject || data.subject.trim().length < 5) {
                showFieldError('subject', 'Assunto deve ter pelo menos 5 caracteres');
                isValid = false;
            }
            
            // Validar mensagem
            if (!data.message || data.message.trim().length < 10) {
                showFieldError('message', 'Mensagem deve ter pelo menos 10 caracteres');
                isValid = false;
            }
            
            if (isValid) {
                submitForm(data);
            }
        });
    }
    
    // Validação em tempo real
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
});

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(fieldName);
    
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                showFieldError(fieldName, 'Nome deve ter pelo menos 2 caracteres');
                return false;
            }
            break;
            
        case 'email':
            if (!isValidEmail(value)) {
                showFieldError(fieldName, 'Email inválido');
                return false;
            }
            break;
            
        case 'subject':
            if (value.length < 5) {
                showFieldError(fieldName, 'Assunto deve ter pelo menos 5 caracteres');
                return false;
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                showFieldError(fieldName, 'Mensagem deve ter pelo menos 10 caracteres');
                return false;
            }
            break;
    }
    
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const formGroup = field.closest('.form-group');
    
    field.classList.add('error');
    
    // Remover mensagem de erro existente
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Adicionar nova mensagem de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function clearFieldError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const formGroup = field.closest('.form-group');
    
    field.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearErrors() {
    const errorFields = document.querySelectorAll('.form-input.error, .form-textarea.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
    });
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => {
        message.remove();
    });
}

function submitForm(data) {
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    // Mostrar estado de carregamento
    submitButton.classList.add('loading');
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simular envio (em um projeto real, aqui seria feita a requisição para o servidor)
    setTimeout(() => {
        // Resetar botão
        submitButton.classList.remove('loading');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Mostrar mensagem de sucesso
        showSuccessMessage();
        
        // Limpar formulário
        document.getElementById('contactForm').reset();
        
    }, 2000);
}

function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
    
    form.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
    
    // Também mostrar notificação global
    showMessage('Mensagem enviada com sucesso!', 'success');
}

