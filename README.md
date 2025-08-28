# Mass Communication - Direction créative & production

## 🌟 About

Mass Communication est une agence de marketing digital multidisciplinaire basée à Lubumbashi, en République Démocratique du Congo. Nous sommes spécialisés dans l'amélioration de la présence en ligne des entreprises grâce à des solutions marketing stratégiques et créatives.

## 🚀 Features

- **Responsive Design** - Optimized for all devices
- **SEO Optimized** - Complete search engine optimization
- **PWA Ready** - Progressive Web App capabilities
- **Fast Loading** - Optimized images and videos
- **Accessibility** - Screen reader and keyboard navigation friendly
- **Social Media Ready** - Open Graph and Twitter Card support

## 🛠️ Tech Stack

- **Backend:** Python Flask
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Custom CSS with CSS Variables
- **Icons:** Custom favicon set
- **Deployment:** Netlify ready

## 📁 Project Structure

```
CompanySite/
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   │   ├── cases/          # Project case studies
│   │   ├── services/       # Service illustrations
│   │   ├── about/          # About section images
│   │   └── contact/        # Contact section images
│   ├── videos/             # Background videos
│   ├── robots.txt          # Search engine crawling
│   ├── sitemap.xml         # Site structure for SEO
│   ├── manifest.json       # PWA configuration
│   └── favicon files       # Browser icons
├── templates/
│   ├── index.html          # Homepage
│   └── portfolio.html      # Portfolio page
├── app.py                  # Flask application
├── main.py                 # Entry point
├── requirements.txt        # Python dependencies
├── runtime.txt            # Python version for Netlify
├── netlify.toml           # Netlify configuration
└── README.md              # This file
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd CompanySite
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python3 main.py
   ```

4. **Open in browser**
   ```
   http://localhost:5000
   ```

### Netlify Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Connect your GitHub repository
   - Deploy automatically

## 🔧 Configuration

### Environment Variables

Create a `.env` file for local development:

```env
FLASK_ENV=development
MAIL_USERNAME=your-email@example.com
MAIL_PASSWORD=your-password
CONTACT_EMAIL=contact@masscommunication.cd
```

### SEO Configuration

- **robots.txt** - Configured for search engine crawling
- **sitemap.xml** - Complete page listing with priorities
- **Meta tags** - Open Graph and Twitter Card support
- **Structured data** - Schema.org markup for organization

## 📱 PWA Features

- **Web App Manifest** - Install as mobile app
- **Service Worker Ready** - Offline capabilities
- **Touch Icons** - iOS and Android support
- **Theme Colors** - Consistent branding

## 🎨 Customization

### Colors
CSS variables in `static/css/style.css`:
```css
:root {
    --color-black: #000000;
    --color-white: #ffffff;
    --color-accent: #2563eb;
    /* ... more colors */
}
```

### Content
- Update project information in `app.py`
- Modify service descriptions in `templates/index.html`
- Add new portfolio items in the portfolio route

## 📊 Performance

- **Image Optimization** - WebP format support
- **Video Optimization** - Compressed for web delivery
- **Lazy Loading** - Images load only when needed
- **Critical CSS** - Above-the-fold styles optimized

## 🔍 SEO Features

- **Meta Tags** - Complete Open Graph and Twitter support
- **Structured Data** - Organization and Local Business schema
- **Sitemap** - XML sitemap for search engines
- **Robots.txt** - Search engine crawling control
- **Canonical URLs** - Prevents duplicate content

## 📱 Mobile Optimization

- **Responsive Design** - Works on all screen sizes
- **Touch Friendly** - Optimized for mobile interaction
- **Fast Loading** - Optimized for mobile networks
- **PWA Ready** - Install as mobile app

## 🚀 Deployment

### Netlify (Recommended)

1. **Automatic Deployment**
   - Connect GitHub repository
   - Netlify builds automatically on push
   - Custom domain support

2. **Build Settings**
   - Build command: `pip install -r requirements.txt`
   - Publish directory: `.`
   - Python version: 3.9

### Other Platforms

- **Heroku** - Add `Procfile` and `runtime.txt`
- **Vercel** - Python support with `vercel.json`
- **AWS** - Elastic Beanstalk or Lambda

## 📈 Analytics & Monitoring

- **Google Analytics** - Add tracking code to templates
- **Search Console** - Submit sitemap for indexing
- **Performance Monitoring** - Core Web Vitals tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to Mass Communication. All rights reserved.

## 📞 Contact

- **Website:** [masscommunication.cd](https://masscommunication.cd)
- **Email:** office@mass-com.com
- **Phone:** +243 99 597 47 70
- **Location:** Lubumbashi, RDC

## 🙏 Acknowledgments

- Flask framework and community
- Modern web standards and best practices
- SEO optimization techniques
- PWA development guidelines

---

**Built with ❤️ in Lubumbashi, RDC**
