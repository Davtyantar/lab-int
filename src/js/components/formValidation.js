import JustValidate from 'just-validate';
import Inputmask from "./../../../node_modules/inputmask/dist/inputmask.es6.js";
import { Fancybox } from '@fancyapps/ui';

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
        const emailField = form.querySelector('input[name="email"]');
        const telField = form.querySelector('input[name="tel"]');
        const messageField = form.querySelector('textarea[name="message"]');

        if (telField) {
            const inputMask = new Inputmask('+7 (999) 999-99-99');
            inputMask.mask(telField);
        }

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

        addFieldValidation(validation, emailField, [
            { rule: 'required', errorMessage: requiredErrorMessage },
            { rule: 'email', errorMessage: 'Почта указана не верно' },
        ]);

        addFieldValidation(validation, telField, [
            { rule: 'required', errorMessage: requiredErrorMessage },
            { 
                rule: 'customRegexp', 
                value: /^\+\d{1,2} \(\d{3}\) \d{3}-\d{2}-\d{2}$/gi,
                errorMessage: 'Номер телефона указан не верно',
            },
            {
                rule: 'function',
                validator: function() {
                    const phone = telField.inputmask.unmaskedvalue();
                    return phone.length === 10;
                },
                errorMessage: 'Номер телефона должен содержать 10 цифр без учёта кода страны',
            }
        ]);

        if (form.closest('#callback_form')) {
            addFieldValidation(validation, messageField, [
                { rule: 'required', errorMessage: requiredErrorMessage },
                { 
                    rule: 'minLength', 
                    value: 10,
                    errorMessage: 'Сообщение должно содержать не менее 10 символов',
                },
            ]);
        }

        validation.onSuccess(event => {
            event.preventDefault();
            const formWrapper = form.closest('.form-wrapper');
            const formSuccess = formWrapper?.querySelector('.form__success');
            const formData = new FormData(form);
            const formValues = Object.fromEntries(formData.entries());

            console.log('Form data:', formValues);

            if (formSuccess) {
                formSuccess.classList.add('is-visible');
                setTimeout(() => {
                    Fancybox.close();
                    if (!form.closest('#callback_form')) {
                        form.reset();
                        formSuccess.classList.remove('is-visible');
                    }
                }, 2000);
            }
        });
    });
};
