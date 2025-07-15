// Mailchimp integration using embedded form method
window.addToMailchimp = function(email, firstName, lastName) {
    try {
        console.log('Attempting Mailchimp signup for:', email);
        
        // Create hidden iframe for form submission
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.name = 'mailchimp-frame';
        document.body.appendChild(iframe);
        
        // Create form that submits to Mailchimp
        const form = document.createElement('form');
        form.action = 'https://pinnaclereadingadvantage.us14.list-manage.com/subscribe/post';
        form.method = 'POST';
        form.target = 'mailchimp-frame';
        form.style.display = 'none';
        
        // Add required hidden fields for Mailchimp
        const fields = {
            'u': 'faf010cb80',
            'id': 'faf010cb80',
            'EMAIL': email,
            'FNAME': firstName || '',
            'LNAME': lastName || '',
            'b_faf010cb80_faf010cb80': '' // Bot protection field (empty)
        };
        
        // Create and append input fields
        Object.keys(fields).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = fields[key];
            form.appendChild(input);
        });
        
        // Append form to body and submit
        document.body.appendChild(form);
        form.submit();
        
        // Clean up after submission
        setTimeout(() => {
            if (form.parentNode) form.parentNode.removeChild(form);
            if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
        }, 2000);
        
        console.log('Mailchimp form submitted successfully');
        
    } catch (error) {
        console.log('Mailchimp signup failed:', error.message);
        console.log('Trial continues without email automation');
    }
};