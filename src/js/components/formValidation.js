import JustValidate from 'just-validate';

export const setupFormValidation = () => {
    const forms = document.querySelectorAll('.form');
    const requiredErrorMessage = 'Поле не может быть пустым';

    const addFieldValidation = (validation, field, rules) => {
        if (field) {
            validation.addField(field, rules);
        }
    };

    forms.forEach(form => {
        const validation = new JustValidate(form);
        const nameField = form.querySelector('input[name="name"]');
        const telField = form.querySelector('input[name="tel"]');

        addFieldValidation(validation, nameField, [
            { 
                rule: 'required', errorMessage: requiredErrorMessage 
            },
            { 
                rule: 'minLength', 
                value: parseInt(nameField?.dataset.minlength, 10),
                errorMessage: `Имя должно содержать не менее ${nameField?.dataset.minlength} символов`,
            },
        ]);

        addFieldValidation(validation, telField, [
            { rule: 'required', errorMessage: requiredErrorMessage },
            { 
                rule: 'customRegexp', 
                value: /^\+\d{1,2} \(\d{3}\) \d{3}-\d{2}-\d{2}$/gi,
                errorMessage: 'Номер телефона указан не верно',
            },
        ]);

        validation.onSuccess(event => {
            event.preventDefault();
        
            const formWrapper = form.closest('.form-wrapper');
            const formSuccess = formWrapper?.querySelector('.form__success');
            const submitButton = form.querySelector('button[type="submit"]');
        
            const resetForm = () => {
                form.reset();
                formSuccess?.classList.remove('is-visible');
                submitButton.disabled = true;
            };
        
            form.querySelectorAll('.form-input').forEach(input => {
                input.classList.remove('just-validate-success-field');
            });
        
            form.querySelectorAll('input').forEach(input => {
                input.removeAttribute('data-just-validate-fallback-disabled');
            });
        
            formSuccess.classList.add('is-visible');
        
            setTimeout(() => {
                resetForm();
            }, 2000);
        });
        
    });
};

document.addEventListener('DOMContentLoaded', setupFormValidation);
