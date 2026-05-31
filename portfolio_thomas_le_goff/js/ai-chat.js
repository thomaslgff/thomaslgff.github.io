/* =====================================================
   PORTFOLIO - THOMAS LE GOFF
   Chat assistant local — gratuit, sans clé API
   ===================================================== */

// ─── STATE ────────────────────────────────────────────
let aiChatOpen = false;
let aiChatHistory = [];
let aiChatLoading = false;

// ─── MOTEUR DE RÉPONSES LOCAL ─────────────────────────
function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s?']/g, ' ');
}

function includesAny(text, words) {
  return words.some(w => text.includes(w));
}

function pick(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

function getLocalReply(userText) {
  const t = normalize(userText);

  // Salutations
  if (includesAny(t, ['bonjour', 'salut', 'hello', 'hey', 'coucou', 'bonsoir'])) {
    return pick([
      "Salut ! 👋 Je suis Thomas, étudiant en BUT Informatique à Lannion. Tu veux en savoir plus sur mon parcours, mes projets ou mon alternance ?",
      "Hey ! Content de te voir sur mon portfolio 😊 Pose-moi ce que tu veux — alternance, projets, compétences…"
    ]);
  }

  // Alternance / stage
  if (includesAny(t, ['alternance', 'alternant', 'stage', 'recrute', 'embauche', 'opportunite', 'travail', 'entreprise', 'disponib'])) {
    return pick([
      "Je cherche une alternance en développement d'applications ou en gestion de bases de données, avec un vrai intérêt pour la data et l'IA. Je suis dispo pour 2026–2027. Si ça t'intéresse, écris-moi à tlegoff31@gmail.com ! 📩",
      "Mon objectif : une alternance dev ou BDD, idéalement orientée data/IA. Je suis en 1ère année de BUT Info à l'IUT de Lannion et disponible dès 2026–2027. N'hésite pas à me contacter !"
    ]);
  }

  // Contact
  if (includesAny(t, ['contact', 'email', 'mail', 'telephone', 'tel', 'appeler', 'ecrire', 'linkedin', 'joindre', 'contacter'])) {
    return "Tu peux me joindre facilement : 📧 tlegoff31@gmail.com · 📱 07 83 86 50 74 · 💼 linkedin.com/in/thomas-le-goff-4585313ba — ou via le formulaire de la page Contact !";
  }

  // Formation / parcours
  if (includesAny(t, ['formation', 'but', 'iut', 'lannion', 'etudiant', 'ecole', 'bac', 'sti2d', 'sin', 'parcours', 'etudes', 'diplome'])) {
    return "Je suis en 1ère année de BUT Informatique à l'IUT de Lannion (2025–2026). Avant ça, j'ai eu mon Bac STI2D option SIN au Lycée Felix Le Dantec avec mention Bien (15/20). Le BUT m'a permis de bosser sur plein de projets concrets en C, Java, web, BDD et Docker 🎓";
  }

  // Sokoban
  if (includesAny(t, ['sokoban', 'sae 1.01', 'sae 1.02', 'sae1.01', 'sae1.02', 'puzzle', 'jeu en c'])) {
    return "Le Sokoban, c'est un de mes projets phares ! 🎮 En SAÉ 1.01 j'ai codé le jeu complet en C (terminal) : déplacements, victoire, structuration du code. En SAÉ 1.02 j'ai optimisé l'algo — suppression des séquences inutiles, meilleures structures de données. Tu peux voir le code sur mon GitHub (thomaslgff) !";
  }

  // Docker / système
  if (includesAny(t, ['docker', 'bash', 'linux', 'devops', 'sae 1.03', 'sae1.03', 'chaine de traitement', 'webp', 'weasyprint'])) {
    return "Pour la SAÉ 1.03, j'ai automatisé une chaîne de traitement de fichiers (images, CSV, textes) avec Docker, Bash et PHP CLI — conversion WebP, génération de PDF avec WeasyPrint… C'était un super projet pour la compétence C3 (administration de systèmes) 🐳";
  }

  // BDD
  if (includesAny(t, ['bdd', 'base de donnees', 'sql', 'uml', 'tutorial d', 'electricite', 'sae 1.04', 'sae1.04', 'modele relationnel'])) {
    return "En SAÉ 1.04, j'ai modélisé une BDD pour un comparateur d'offres d'électricité : diagramme UML, modèle relationnel en Tutorial D, gestion des créneaux HC/HP et des contrats. Ça m'a bien plu côté modélisation de données ⚡";
  }

  // Web / Portugal
  if (includesAny(t, ['portugal', 'site web', 'html', 'css', 'sae 1.05', 'sae1.05', 'touristique', 'responsive'])) {
    return "La SAÉ 1.05 c'était un site touristique sur le Portugal en HTML/CSS — arborescence, charte graphique, maquette et version responsive. Projet en équipe, dispo sur GitHub (Saynex228/site-portugal-tourism) 🇵🇹";
  }

  // Google / PESTEL
  if (includesAny(t, ['google', 'pestel', 'sae 1.06', 'sae1.06', 'economie', 'equipe', 'analyse'])) {
    return "En SAÉ 1.06, en équipe de 4, on a analysé l'environnement économique et écologique de Google : tableau de caractéristiques, diagnostic PESTEL avec opportunités et menaces. Bon exercice de travail collaboratif 🤝";
  }

  // Projets (général)
  if (includesAny(t, ['projet', 'sae', 'realisation', 'portfolio', 'github', 'code'])) {
    return "J'ai 6 SAÉ majeures : Sokoban en C (×2), chaîne Docker, comparateur électricité (BDD), site Portugal (web) et analyse Google (équipe). Chacune touche une ou plusieurs compétences BUT. Va voir l'onglet Projets pour les détails ! ⚡";
  }

  // Compétences / tech
  if (includesAny(t, ['competence', 'skill', 'techno', 'langage', 'java', ' python', ' php', ' c ', 'git', 'figma', 'javafx', 'sqlite', 'trello'])) {
    return "Côté technique : C, Java, Python, PHP · Web HTML/CSS · Linux, Bash, Docker · BDD avec Tutorial D, UML, SQL, SQLite · Outils GitHub, Trello, JavaFX, Figma. Les 6 compétences BUT (dev, optimisation, sys, data, projet, équipe) sont dans l'onglet Compétences 🧠";
  }

  // Langues
  if (includesAny(t, ['langue', 'anglais', 'espagnol', 'francais', 'b2', 'a2'])) {
    return "Pour les langues : français natif 🇫🇷, anglais B2 🇬🇧 et espagnol A2 🇪🇸. L'anglais me sert souvent pour la doc technique et les ressources en dev !";
  }

  // Expérience pro
  if (includesAny(t, ['experience', 'boucherie', 'super u', 'tregastel', 'job', 'travail ete', 'emploi'])) {
    return "En juillet–août 2025, j'ai travaillé comme employé polyvalent en boucherie au Super U de Trégastel : mise en rayon, contact clientèle, travail en équipe. Ça m'a appris la rigueur et le relationnel en plus du code 💼";
  }

  // Loisirs
  if (includesAny(t, ['loisir', 'sport', 'handball', 'volleyball', 'basketball', 'musculation', 'hobby'])) {
    return "En dehors du code, j'ai fait du handball, volleyball et basketball, et je fais de la musculation en ce moment 💪 Le sport, ça m'aide à rester focus et organisé !";
  }

  // CV
  if (includesAny(t, ['cv', 'curriculum', 'pdf', 'telecharger'])) {
    return "Tu peux télécharger mon CV en PDF directement depuis la page d'accueil ou la section Contact — bouton « CV PDF » 📄";
  }

  // Présentation / qui es-tu
  if (includesAny(t, ['qui es tu', 'qui es-tu', 'presente', 'presentation', 'c est quoi', "c'est quoi", 'parle moi de toi', 'parle-moi de toi', 'thomas'])) {
    return "Moi c'est Thomas Le Goff 👨‍💻 — étudiant BUT Info à Lannion, passionné de dev, BDD et IA. Je cherche une alternance pour 2026–2027. J'aime construire des trucs concrets, du Sokoban en C aux pipelines Docker !";
  }

  // Remerciements / au revoir
  if (includesAny(t, ['merci', 'thanks', 'super', 'genial', 'cool', 'parfait'])) {
    return pick([
      "Avec plaisir ! 😊 Si tu as d'autres questions, je suis là.",
      "Content d'avoir pu t'aider ! N'hésite pas si tu veux en savoir plus sur mon profil."
    ]);
  }
  if (includesAny(t, ['au revoir', 'a plus', 'bye', 'ciao', 'a bientot'])) {
    return "À bientôt ! 👋 Et si tu veux discuter sérieusement d'une alternance, mon mail c'est tlegoff31@gmail.com.";
  }

  // Questions oui/non ou floues
  if (t.includes('?') && t.length < 30) {
    return "Bonne question ! Je peux te parler de mon alternance, mes projets (Sokoban, Docker, BDD…), mes compétences ou comment me contacter. Reformule un peu et je te réponds 😊";
  }

  // Fallback
  return pick([
    "Hmm, je ne suis pas sûr de bien comprendre 🤔 Essaie de me demander mon alternance, mes projets, mes compétences ou comment me contacter !",
    "Je préfère parler de mon parcours et de mes projets ! Tu veux en savoir plus sur ma recherche d'alternance, le Sokoban, mes compétences techniques ou mon contact ?",
    "Là je suis un peu perdu 😅 Pose-moi plutôt une question sur mon BUT, mes SAÉ, mon alternance ou mes coordonnées — je serai plus à l'aise !"
  ]);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── TOGGLE ───────────────────────────────────────────
function toggleAiChat() {
  aiChatOpen = !aiChatOpen;
  const win = document.getElementById('ai-chat-window');
  win.classList.toggle('open', aiChatOpen);

  if (aiChatOpen && aiChatHistory.length === 0) {
    setTimeout(() => {
      addAiMessage('bot', "Salut ! 👋 Moi c'est Thomas, pose-moi tes questions sur mon parcours, mes projets ou ma recherche d'alternance !");
    }, 300);
  }

  if (aiChatOpen) {
    setTimeout(() => document.getElementById('ai-chat-input')?.focus(), 350);
  }
}

// ─── KEYBOARD HANDLER ─────────────────────────────────
function aiChatKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendAiMessage();
  }
}

// ─── SEND SUGGESTION ──────────────────────────────────
function sendSuggestion(text) {
  document.getElementById('ai-chat-input').value = text;
  document.getElementById('ai-suggestions').style.display = 'none';
  sendAiMessage();
}

// ─── SEND MESSAGE ─────────────────────────────────────
async function sendAiMessage() {
  if (aiChatLoading) return;
  const input = document.getElementById('ai-chat-input');
  const text = input.value.trim();
  if (!text) return;

  document.getElementById('ai-suggestions').style.display = 'none';

  input.value = '';
  input.style.height = 'auto';

  addAiMessage('user', text);
  aiChatHistory.push({ role: 'user', content: text });

  aiChatLoading = true;
  document.getElementById('ai-chat-send').disabled = true;
  const typingId = addTypingIndicator();

  // Petit délai pour simuler une réflexion
  await delay(400 + Math.random() * 600);

  const reply = getLocalReply(text);
  removeTypingIndicator(typingId);

  aiChatHistory.push({ role: 'assistant', content: reply });
  addAiMessage('bot', reply);

  aiChatLoading = false;
  document.getElementById('ai-chat-send').disabled = false;
  document.getElementById('ai-chat-input').focus();
}

// ─── ADD MESSAGE ──────────────────────────────────────
function addAiMessage(role, text) {
  const container = document.getElementById('ai-chat-messages');
  const msgId = 'msg-' + Date.now();

  const div = document.createElement('div');
  div.className = `ai-msg ${role}`;
  div.id = msgId;

  const icon = document.createElement('div');
  icon.className = 'ai-msg-icon';
  icon.textContent = role === 'bot' ? '👨‍💻' : '👤';

  const bubble = document.createElement('div');
  bubble.className = 'ai-msg-bubble';
  bubble.textContent = text;

  div.appendChild(icon);
  div.appendChild(bubble);
  container.appendChild(div);
  scrollToBottom();
  return msgId;
}

// ─── TYPING INDICATOR ─────────────────────────────────
function addTypingIndicator() {
  const container = document.getElementById('ai-chat-messages');
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'ai-msg bot ai-typing';
  div.id = id;

  const icon = document.createElement('div');
  icon.className = 'ai-msg-icon';
  icon.textContent = '👨‍💻';

  const bubble = document.createElement('div');
  bubble.className = 'ai-msg-bubble';
  bubble.innerHTML = '<div class="ai-typing-dot"></div><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div>';

  div.appendChild(icon);
  div.appendChild(bubble);
  container.appendChild(div);
  scrollToBottom();
  return id;
}

function removeTypingIndicator(id) {
  document.getElementById(id)?.remove();
}

// ─── SCROLL ───────────────────────────────────────────
function scrollToBottom() {
  const container = document.getElementById('ai-chat-messages');
  if (container) container.scrollTop = container.scrollHeight;
}
