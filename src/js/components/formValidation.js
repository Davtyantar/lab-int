import JustValidate from 'just-validate';
import Inputmask from "./../../../node_modules/inputmask/dist/inputmask.es6.js";

export const setupFormValidation = () => {
    const forms = document.querySelectorAll('.form');
    const requiredErrorMessage = 'Поле не может быть пустым';

    const addFieldValidation = (validation, field, rules) => {
        if (field) {
            validation.addField(field, rules);

            field.addEventListener('blur', () => {
                let isValid = true;

                for (const rule of rules) {
                    if (rule.rule === 'required' && !field.value.trim()) {
                        isValid = false;
                        break;
                    }
                    if (rule.rule === 'minLength' && field.value.length < rule.value) {
                        isValid = false;
                        break;
                    }
                    if (rule.rule === 'customRegexp' && !rule.value.test(field.value)) {
                        isValid = false;
                        break;
                    }
                    if (rule.rule === 'function' && !rule.validator()) {
                        isValid = false;
                        break;
                    }
                }

                field.classList.toggle('valid', isValid);
                field.classList.toggle('invalid', !isValid);
            });
        }
    };

    const validateFieldsOnSubmit = (form, validation) => {
        const fields = form.querySelectorAll('input');

        fields.forEach(field => {
            const fieldValidation = validation.fields.find(v => v.field === field);
            if (fieldValidation) {
                const isValid = fieldValidation.rules.every(rule => {
                    if (rule.rule === 'required') return field.value.trim();
                    if (rule.rule === 'minLength') return field.value.length >= rule.value;
                    if (rule.rule === 'customRegexp') return rule.value.test(field.value);
                    if (rule.rule === 'function') return rule.validator();
                    return true;
                });

                field.classList.toggle('valid', isValid);
                field.classList.toggle('invalid', !isValid);
            }
        });
    };

    forms.forEach(form => {
        const validation = new JustValidate(form);
        const nameField = form.querySelector('input[name="name"]');
        const telField = form.querySelector('input[name="tel"]');

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

        validation.onSuccess(event => {
            event.preventDefault();

            validateFieldsOnSubmit(form, validation);

            const formWrapper = form.closest('.form-wrapper');
            const formSuccess = formWrapper?.querySelector('.form__success');

            if (!form.querySelector('.invalid')) {
                formSuccess.classList.add('is-visible');
                form.reset();

                form.querySelectorAll('input').forEach(input => {
                    input.classList.remove('valid', 'invalid');
                });

                setTimeout(() => {
                    formSuccess.classList.remove('is-visible');
                }, 3000);
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', setupFormValidation);
