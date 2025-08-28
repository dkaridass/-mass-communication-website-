import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for
from flask_mail import Mail, Message

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")

# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME', '')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', '')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER', 'contact@masscommunication.cd')

mail = Mail(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/robots.txt')
def robots_txt():
    return app.send_static_file('robots.txt')

@app.route('/sitemap.xml')
def sitemap_xml():
    return app.send_static_file('sitemap.xml')

@app.route('/manifest.json')
def manifest():
    return app.send_static_file('manifest.json')

@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon-32x32.png')

@app.route('/portfolio')
def portfolio():
    # Portfolio page with all selected works
    portfolio_projects = [
        {
            'id': 'mining-brand',
            'title': 'Une stratégie de marque distincte pour l\'industrie minière',
            'category': 'Production Corporate',
            'client': 'Société Minière Premium',
            'year': '2024',
            'image': 'cases/project-1-mining.jpg',
            'description': 'Repositionnement stratégique complet d\'une société minière majeure avec création d\'identité visuelle premium et stratégie de communication intégrée.',
            'services': ['Identité Visuelle', 'Stratégie de Marque', 'Production Corporate'],
            'challenge': 'Moderniser l\'image d\'une industrie traditionnelle tout en respectant les valeurs d\'excellence et de responsabilité.',
            'solution': 'Création d\'un système visuel sophistiqué alliant tradition et innovation, avec une approche narrative centrée sur l\'impact positif.',
            'results': ['Augmentation de 40% de la notoriété de marque', 'Amélioration de 60% de la perception client', 'Reconnaissance internationale du nouveau branding']
        },
        {
            'id': 'tech-repositioning',
            'title': 'Un repositionnement audacieux pour une marque tech émergente',
            'category': 'Identité Visuelle',
            'client': 'Xolta Technologies',
            'year': '2024',
            'image': 'cases/project-2-tech.jpg',
            'description': 'Transformation complète de l\'identité d\'une startup tech avec création d\'un écosystème de marque moderne et différenciant.',
            'services': ['Rebranding Complet', 'Direction Artistique', 'Stratégie Digitale'],
            'challenge': 'Positionner une jeune entreprise tech dans un marché concurrentiel avec une identité forte et mémorable.',
            'solution': 'Développement d\'une identité visuelle audacieuse mêlant innovation technologique et élégance africaine contemporaine.',
            'results': ['Levée de fonds de 2M$ post-rebranding', '300% d\'augmentation du trafic web', 'Prix du meilleur design tech 2024']
        },
        {
            'id': 'podcast-larza',
            'title': 'L\'Histoire de Larza - Production Podcast Premium',
            'category': 'Production Podcast',
            'client': 'Larza Media Group',
            'year': '2024',
            'image': 'cases/project-3-podcast.jpg',
            'description': 'Production complète d\'une série podcast documentaire explorant l\'histoire contemporaine de Lubumbashi.',
            'services': ['Production Audio', 'Direction Éditoriale', 'Distribution Multi-plateforme'],
            'challenge': 'Créer un contenu audio engageant qui valorise l\'histoire locale tout en touchant une audience internationale.',
            'solution': 'Studio de production premium avec narrateur professionnel et post-production cinématographique.',
            'results': ['50K+ écoutes en 3 mois', 'Diffusion sur 15+ plateformes', 'Nomination Prix du Podcast Africain 2024']
        },
        {
            'id': 'corporate-events',
            'title': 'La fusion du sport et de la sophistication',
            'category': 'Événementiel',
            'client': 'Hors-D\'œuvre Club',
            'year': '2024',
            'image': 'cases/project-4-events.jpg',
            'description': 'Conception et production d\'événements corporatifs premium alliant excellence sportive et raffinement gastronomique.',
            'services': ['Événementiel Corporate', 'Scénographie', 'Production Technique'],
            'challenge': 'Créer une expérience événementielle unique mêlant sport de haut niveau et art de vivre à la française.',
            'solution': 'Concept événementiel sur-mesure avec scénographie immersive et production technique d\'excellence.',
            'results': ['200+ invités VIP par événement', '95% taux de satisfaction client', 'Partenariats stratégiques établis']
        },
        {
            'id': 'mobility-rebranding',
            'title': 'Rebranding de la mobilité urbaine',
            'category': 'Stratégie Digitale',
            'client': 'Urban Mobility Solutions',
            'year': '2024',
            'image': 'cases/project-5-mobility.jpg',
            'description': 'Refonte complète de l\'identité et de la stratégie digitale d\'une entreprise de mobilité urbaine innovante.',
            'services': ['Rebranding', 'Stratégie Digitale', 'Campagnes 360°'],
            'challenge': 'Repositionner une marque de transport urbain comme solution moderne et écologique pour l\'Afrique.',
            'solution': 'Stratégie de marque intégrée valorisant l\'innovation locale et l\'impact environnemental positif.',
            'results': ['40% d\'augmentation des utilisateurs', 'Expansion dans 3 nouvelles villes', 'Reconnaissance prix mobilité durable']
        }
    ]
    return render_template('portfolio.html', projects=portfolio_projects)

@app.route('/contact', methods=['POST'])
def contact():
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        company = request.form.get('company')
        message = request.form.get('message')
        
        if not all([name, email, message]):
            flash('Veuillez remplir tous les champs obligatoires.', 'error')
            return redirect(url_for('index') + '#contact')
        
        # Send email notification
        msg = Message(
            subject=f'Nouvelle demande de devis - {company or "Particulier"}',
            recipients=[os.environ.get('CONTACT_EMAIL', 'contact@masscommunication.cd')],
            body=f"""
Nouvelle demande de devis reçue:

Nom: {name}
Email: {email}
Entreprise: {company or 'Non spécifiée'}

Message:
{message}
            """
        )
        
        if app.config['MAIL_USERNAME']:
            mail.send(msg)
            flash('Votre message a été envoyé avec succès! Nous vous répondrons dans les plus brefs délais.', 'success')
        else:
            flash('Votre message a été reçu. Nous vous contacterons bientôt.', 'success')
            
    except Exception as e:
        app.logger.error(f'Error sending contact form: {e}')
        flash('Une erreur est survenue. Veuillez réessayer plus tard.', 'error')
    
    return redirect(url_for('index') + '#contact')

@app.errorhandler(404)
def not_found(error):
    return render_template('index.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('index.html'), 500
