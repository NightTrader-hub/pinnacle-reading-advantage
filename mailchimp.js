// Mailchimp API integration for trial signups
window.addToMailchimp = function(email, firstName, lastName) {
    try {
        // Mailchimp API endpoint for adding subscribers
        const apiEndpoint = 'https://us14.api.mailchimp.com/3.0/lists/faf010cb80/members';
        
        // Prepare subscriber data
        const subscriberData = {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName || '',
                LNAME: lastName || ''
            },
            tags: ['website-signup']
        };
        
        // Note: Direct API calls from browser will have CORS issues
        // This implementation provides the structure for server-side integration
        // For immediate deployment, we'll use the embedded form approach
        
        // Alternative: Use embedded form with JSONP to avoid CORS
        const form = document.createElement('form');
        form.action = 'https://pinnaclereadingadvantage.us14.list-manage.com/subscribe/post-json';
        form.method = 'GET';
        form.style.display = 'none';
        
        // Use embedded form parameters (no separate User ID needed)
        const fields = {
            'u': 'faf010cb80', // This is actually the Audience ID, not a separate User ID
            'id': 'faf010cb80', // List ID
            'EMAIL': email,
            'FNAME': firstName || '',
            'LNAME': lastName || '',
            'c': 'mailchimpCallback' + Date.now()
        };
        
        // Build query string and submit via JSONP
        const params = new URLSearchParams(fields).toString();
        const script = document.createElement('script');
        script.src = form.action + '?' + params;
        document.head.appendChild(script);
        
        // Clean up script after loading
        setTimeout(() => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        }, 3000);
        
        console.log('Submitted to Mailchimp via embedded form');
        
    } catch (error) {
        console.log('Mailchimp signup failed, trial continues without email automation');
    }
};