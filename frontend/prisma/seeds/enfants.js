const { createPage } = require('./_helpers');

module.exports = async function seedEnfants(prisma) {
  await createPage(prisma, 'enfants', {
    title: 'Financer les Études de ses Enfants | Amana Patrimoine',
    description: 'Anticipez les besoins futurs de vos enfants : études, permis, logement. Épargne éthique et conforme à la finance islamique.',
    keywords: 'épargne enfants, études supérieures, assurance-vie mineur, finance islamique, Paris',
  }, [
    { type: 'pageHero', content: {
      badge: 'Famille',
      title: 'Financer les études de ses enfants : préparez leur avenir dès maintenant',
      subtitle: 'L\'arrivée d\'un enfant est une magnifique nouvelle. C\'est à la fois un cadeau et une responsabilité qui s\'offre aux parents. Prévoir en amont les dépenses à venir permet d\'ouvrir toutes les portes à son enfant. Les dépenses importantes que représentent les études, un échange universitaire à l\'étranger, le permis de conduire ou l\'acquisition d\'une première voiture s\'anticipent dès les premières années de vie de l\'enfant. Le prêt étudiant est souvent privilégié par les parents, mais cette solution est loin d\'être idéale. L\'enfant débutera sa vie endettée et passera ses premières années de travail à rembourser ce prêt. Fort heureusement, d\'autres solutions existent. Il faut cependant anticiper suffisamment tôt ces dépenses.',
      image: '/Site 30.png',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'content', content: {
      label: 'Besoins',
      title: 'Comprendre les besoins futurs',
      image: '/enfaits.jpeg',
      paragraphs: [
        'En France, on estime que le budget global consacré par les familles françaises aux études supérieures est d\'environ 7 000 à 8 000 € par an et par enfant en moyenne. Ce montant varie en fonction des écoles et du choix d\'étude de chacun.',
        'Cela est sans compter les dépenses connexes : permis de conduire (environ 1 500 €), première voiture, voyages linguistiques, matériel informatique, logement étudiant si l\'enfant quitte la ville natale.',
        'À 18 ans, les besoins financiers s\'accélèrent brutalement. Une épargne régulière commencée à la naissance représente un capital substantiel à la majorité, grâce à l\'effet de capitalisation.',
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Prêt étudiant',
      title: 'Pourquoi ne pas compter sur le prêt étudiant ?',
      paragraphs: [
        'Bien qu\'encore largement plébiscité, le prêt étudiant présente de nombreux défauts. Beaucoup s\'y refusent pour des raisons religieuses. Nos conseillers en gestion de patrimoine sont formés à la finance islamique et sauront vous aiguiller vers des solutions excluant totalement les taux d\'intérêt (riba).',
        'En dehors de ces considérations éthiques, commencer sa vie professionnelle en s\'endettant est loin d\'être optimal. Le marché du travail n\'est pas toujours au beau fixe, certains souhaitent se lancer dans l\'entrepreneuriat ou voyager après leurs études. La dette est un frein qui oblige à s\'insérer dans un système qui ne correspond pas à tout le monde.',
        'Anticiper une épargne afin de financer ces dépenses, c\'est s\'assurer la sérénité, l\'autonomie et la transmission de valeurs.',
      ],
    } },
    // Simulateur (EnfantsSimulator) is rendered directly in the page component, not via CMS
    { type: 'content', content: {
      background: 'beige',
      label: 'Épargne',
      title: 'Mettre en place une épargne dès la naissance',
      paragraphs: [
        'Chez Amana Patrimoine, nous vous conseillons de mettre en place une épargne au nom de votre enfant dont l\'argent fructifiera jusqu\'au moment de ses études. Un horizon de 18 ans permet de profiter pleinement de la capitalisation de vos contrats.',
        'Cet horizon long terme permet également de lisser les potentielles mauvaises performances d\'investissement. L\'importance de la régularité : investir automatiquement chaque mois. Le réinvestissement des profits permet d\'obtenir un effet boule de neige et d\'atteindre au plus vite son objectif, c\'est ce qu\'on appelle la capitalisation.',
      ],
    } },
    { type: 'content', content: {
      label: 'Solutions',
      title: 'Comment épargner pour ses enfants ?',
      steps: [
        { title: 'Assurance-vie au nom de l\'enfant', description: 'Ouvrir un contrat d\'assurance-vie au nom de votre enfant dès sa naissance permet de bénéficier de la fiscalité avantageuse et de l\'effet capitalisation. L\'argent versé appartient à l\'enfant, mais les parents en assurent la gestion légale jusqu\'à sa majorité. Il est possible d\'ajouter une clause de pacte adjoint pour encadrer l\'âge de mise à disposition des fonds. Nous proposons des contrats investis sur des fonds conformes aux normes de finance islamique, validés par des Shariah Boards.' },
        { title: 'SCPI en démembrement', description: 'Investir dans l\'immobilier progressivement, sans fiscalité immédiate. Les SCPI en démembrement permettent d\'acquérir la nue-propriété de parts immobilières. Pendant la période de démembrement, vous ne percevez pas de revenus, donc vous ne payez pas d\'impôt. À l\'issue, vous récupérez la pleine propriété sans frais supplémentaires. Cette solution permet de se constituer progressivement un patrimoine immobilier conforme aux principes de la finance islamique.' },
        { title: 'Épargne programmée', description: 'Versements automatiques mensuels pour profiter de l\'effet capitalisation. En programmant un virement automatique chaque mois (100 €, 150 €, 200 € selon vos capacités), vous mettez en place une discipline d\'investissement. Le lissage du risque : acheter régulièrement permet de moyenner le prix d\'achat. L\'effet boule de neige : les gains sont réinvestis automatiquement, ce qui accélère la croissance du capital sur 18 ans.' },
      ],
    } },
    { type: 'faq', content: { items: [
      { question: 'À quel âge ouvrir un contrat pour mon enfant ?', answer: 'Dès la naissance. Plus le contrat est ouvert tôt, plus vous bénéficiez de la puissance des intérêts composés et de l\'antériorité fiscale (notamment pour l\'assurance-vie après 8 ans). Un contrat ouvert à la naissance aura 18 ans d\'ancienneté au moment des études, ce qui offre une fiscalité très avantageuse.' },
      { question: 'Est-ce que l\'argent appartient à l\'enfant ?', answer: 'Oui, les fonds versés sur un contrat au nom d\'un mineur lui appartiennent. Toutefois, les parents en assurent la gestion légale jusqu\'à sa majorité. Il est possible d\'ajouter une clause de pacte adjoint pour encadrer l\'âge de mise à disposition des fonds (par exemple jusqu\'à 25 ans, le temps qu\'il termine ses études).' },
      { question: 'Comment garantir que l\'épargne est éthique ?', answer: 'Nous sélectionnons uniquement des supports certifiés Shariah Compliant ou ISR (Investissement Socialement Responsable) qui excluent les secteurs comme l\'armement, le tabac, l\'alcool ou la spéculation bancaire classique. Tous nos supports sont validés par des comités charia reconnus.' },
    ] } },
    { type: 'cta', content: {
      title: 'Parlons de l\'avenir de vos enfants',
      subtitle: 'Vous souhaitez préparer les études de vos enfants ? Investir progressivement et sereinement ? Respecter vos convictions éthiques ?',
      description: 'Prenez rendez-vous pour un premier échange gratuit et sans engagement.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
