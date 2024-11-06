export const toggleSubmitButtonState = () => {
    const forms = document.querySelectorAll('.form');
  
    forms.forEach(form => {
      const submitButton = form.querySelector('button[type="submit"]');
      const privacyBlock = form.querySelector('.form-privacy');
      
      if (privacyBlock) {
        const checkbox = privacyBlock.querySelector('input[type="checkbox"]');
        function updateSubmitButtonState() {
          if (checkbox && !checkbox.checked) {
            submitButton.disabled = true;
          } else {
            submitButton.disabled = false;
          }
        }
        updateSubmitButtonState();
        checkbox.addEventListener('change', updateSubmitButtonState);
      }
    });
}

document.addEventListener('DOMContentLoaded', toggleSubmitButtonState());