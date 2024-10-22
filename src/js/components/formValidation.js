import JustValidate from 'just-validate';

export const setupFormValidation = () => {
    const forms = document.querySelectorAll('.form');

    const requiredErrorMessage = 'Поле не может быть пустым';
    const formSuccess = document.querySelector('.form__success')

    forms.forEach(form => {
        const validation = new JustValidate(form);

        const nameField = form.querySelector('input[name="name"]');
        if (nameField) {
            validation.addField(nameField, [
                {
                    rule: 'required',
                    errorMessage: requiredErrorMessage,
                },
                {
                    rule: 'minLength',
                    value: parseInt(nameField.dataset.minlength, 10),
                    errorMessage: `Имя должно содержать не менее ${nameField.dataset.minlength} символов`,
                },
            ]);
        }

        const emailField = form.querySelector('input[name="email"]');
        if (emailField) {
            validation.addField(emailField, [
                {
                    rule: 'required',
                    errorMessage: requiredErrorMessage,
                },
                {
                    rule: 'email',
                    errorMessage: 'Почта указана не верно',
                },
            ]);
        }

        const telField = form.querySelector('input[name="tel"]');
        if (telField) {
            validation.addField(telField, [
                {
                    rule: 'required',
                    errorMessage: requiredErrorMessage,
                },
                {
                    rule: 'customRegexp',
                    value: /^\+\d{1,2} \(\d{3}\) \d{3}-\d{2}-\d{2}$/gi,
                    errorMessage: 'Номер телефона указан не верно',
                },
            ]);
        }

        validation.onSuccess((event) => {
            event.preventDefault();
            formSuccess.classList.add('is-visible');
            setTimeout(() => {
                formSuccess.classList.remove('is-visible');
            }, 3000);
            
            const formData = new FormData(form);
            const formValues = {};
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            console.log('Форма успешно отправлена!', formValues);

            form.reset();
        });
    });
};
