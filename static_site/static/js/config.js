// Configuration file for Mass Communication website
// Update this with your actual Netlify URL when you deploy

window.SiteConfig = {
    // Your actual domain
    baseUrl: 'https://mass-com.com',
    
    // Social media URLs
    social: {
        linkedin: 'https://www.linkedin.com/company/mass-communication',
        instagram: 'https://www.instagram.com/masscommunication'
    },
    
    // Contact information
    contact: {
        email: 'office@mass-com.com',
        phone: '+243 99 597 47 70'
    },
    
    // Company information
    company: {
        name: 'Mass Communication',
        location: 'Lubumbashi, RDC',
        description: 'Agence de marketing digital multidisciplinaire'
    }
};

// Function to get full URL for any path
window.getFullUrl = function(path) {
    return window.SiteConfig.baseUrl + path;
};

// Function to update all meta tags with correct URLs
window.updateMetaTags = function() {
    // Update canonical URLs
    const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
    canonicalLinks.forEach(link => {
        if (link.href.includes('your-site-name.netlify.app')) {
            link.href = link.href.replace('your-site-name.netlify.app', window.SiteConfig.baseUrl.replace('https://', ''));
        }
    });
    
    // Update Open Graph URLs
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) {
        ogUrlMeta.content = window.SiteConfig.baseUrl + window.location.pathname;
    }
    
            // Update Twitter URLs
        const twitterUrlMeta = document.querySelector('meta[name="twitter:url"]');
        if (twitterUrlMeta) {
            twitterUrlMeta.content = window.SiteConfig.baseUrl + window.location.pathname;
        }
        
        // Update any remaining placeholder URLs
        const allMetaTags = document.querySelectorAll('meta[content*="your-site-name.netlify.app"]');
        allMetaTags.forEach(meta => {
            meta.content = meta.content.replace('your-site-name.netlify.app', window.SiteConfig.baseUrl.replace('https://', ''));
        });
        
        console.log('Meta tags updated with base URL:', window.SiteConfig.baseUrl);
};

// Auto-update meta tags when config loads
document.addEventListener('DOMContentLoaded', function() {
    window.updateMetaTags();
});
