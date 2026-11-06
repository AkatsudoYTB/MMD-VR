# MMD VR — GitHub Pages, casque et partage de projets

L’application complète est déjà prête pour le navigateur du casque. Il faut publier **index.html ET le dossier assets/** : le moteur 3D et ses fichiers WebAssembly ne tiennent pas dans un simple HTML autonome. Ne publie pas le fichier index.html des sources, qui dépend de TypeScript et du serveur de développement.

## Publier les fichiers déjà compilés (le plus simple)

1. Décompresse **MMD-VR-GitHub-Pages.zip**.
2. Mets **le contenu** de l’archive à la racine d’un dépôt GitHub : `index.html`, `assets/`, `coi-sw.js`, `icon.svg`, `.nojekyll`, etc. Garde les chemins et les noms.
3. Dans le dépôt : **Settings → Pages → Deploy from a branch**, sélectionne ta branche et **/ (root)**, puis Save.
4. Ouvre l’adresse HTTPS indiquée par GitHub Pages, par exemple `https://ton-pseudo.github.io/MMD-VR/`.
5. Ouvre cette même adresse dans le navigateur du casque, choisis un projet et clique **Entrer en VR**.

GitHub Pages sert des fichiers statiques. Il n’enregistre pas dans ton dépôt les dossiers choisis depuis le navigateur. Les projets restent dans le stockage local de chaque navigateur tant que tu ne les transfères pas.

## Publier depuis les sources

La copie du projet contient aussi `.github/workflows/pages.yml`.

1. Mets les sources du projet sur GitHub, avec `package.json`, `package-lock.json`, `src/`, `public/`, `tools/`, la configuration Vite et `.github/`.
2. Ne publie pas `.partage/`, `node_modules/`, les fichiers `.env*.local`, ni les fichiers de test personnels.
3. Dans **Settings → Pages → Source**, choisis **GitHub Actions**.
4. Un push sur `main` ou `master` lance les tests, la compilation puis la publication.

Pour inclure des archives de projets dans cette méthode, place-les dans **public/projets/** avant la compilation. Elles apparaîtront sur le site sous **projets/**.

## Ajouter et gérer les projets

- **Nouveau projet** : crée une scène et ajoute les modèles, les animations et l’audio depuis l’éditeur.
- **Ajouter un dossier** : choisis le dossier complet avec ses textures. S’il contient un `.pmm`, l’application propose de l’importer ; sinon elle crée un projet et classe les fichiers reconnus.
- **Importer un projet MMD** : ouvre un `.pmm`, avec les dossiers nécessaires pour retrouver ses ressources.
- Les cartes de projets permettent **Ouvrir, Partager, Renommer, Dupliquer et Supprimer**.
- Dans l’éditeur, le bouton **Partager le projet** est en haut.
- **Importer une sauvegarde** restaure un fichier `.mmdvr.zip` et toutes ses ressources. La restauration crée une copie ; elle n’écrase pas un projet existant.

Le sélecteur de dossiers dépend du navigateur. Sur un casque qui ne permet pas de choisir un dossier, importe le projet depuis le PC puis utilise le partage Wi-Fi ou une sauvegarde publiée.

## Même Wi-Fi : lien, QR code et port local

1. Sur le PC, ouvre la copie complète du projet et lance **LANCER-PARTAGE.cmd**. Node.js 22.12 ou plus récent doit être installé. Au premier lancement, la commande télécharge les dépendances manquantes.
2. La fenêtre reste ouverte et démarre l’application compilée sur **http://localhost:4173/**.
3. Dans **Appareils / QR code**, choisis l’adresse de ta carte Wi-Fi, par exemple **https://192.168.1.11:4174/**. Le port 4174 est l’accès HTTPS pour les autres appareils.
4. Ouvre ce lien sur le casque/téléphone ou scanne son QR code avec un appareil qui sait lire les QR. On peut toujours saisir le lien à la main dans le casque.
5. **Partager** sur une carte de projet donne un lien et un QR qui ouvrent directement ce projet. Le PC envoie d’abord les ressources avant de montrer le lien.

Tous les appareils doivent ouvrir le **serveur du PC**, sur le même réseau. Le PC et la fenêtre du serveur restent allumés. Le dossier `.partage/` conserve les projets partagés ; les changements se synchronisent environ toutes les cinq secondes. Une suppression sur ce serveur se répercute sur les autres appareils connectés.

La VR demande HTTPS. Le certificat du serveur local est auto-signé : il faut éventuellement le valider dans le navigateur du casque au premier accès. Si Windows demande d’autoriser Node.js sur le réseau, utilise le réseau privé. Un Wi-Fi invité qui isole les appareils empêche leur connexion entre eux.

Depuis la version GitHub Pages, **Appareils / QR code → J’ai déjà l’adresse locale** permet d’ouvrir l’adresse du PC. On navigue vers ce serveur : la version publique de GitHub Pages ne lit pas automatiquement les fichiers privés de ton PC.

## Autre réseau : publier un projet par lien ou QR

1. Dans **Partager**, clique **Exporter le projet complet**. Tu obtiens `Nom du projet.mmdvr.zip`.
2. Dans le dépôt du **site déjà compilé**, ajoute un dossier `projets/` contenant cette archive. Pour un dépôt des sources avec GitHub Actions, utilise `public/projets/`.
3. Attends la publication. L’archive doit être accessible par une adresse directe comme `https://ton-pseudo.github.io/MMD-VR/projets/concert.mmdvr.zip`.
4. Dans **Partager → Lien et QR code · projet publié**, indique l’adresse de ton application GitHub Pages et celle de l’archive. Clique **Créer le lien et le QR**.
5. Ouvre ou scanne ce lien sur l’autre appareil. Le projet est téléchargé, vérifié et enregistré localement, puis ouvert dans l’éditeur. Clique ensuite **Entrer en VR** dans le casque.

L’archive publiée est une **copie à l’instant de l’export**, sans synchronisation entre appareils. Une nouvelle version peut être publiée sous un nouveau nom pour créer un nouveau lien. Une archive déjà ouverte est réutilisée depuis le stockage de l’appareil ; pour la télécharger de nouveau au même lien, supprime sa copie locale puis rouvre le lien. L’export/import portable est limité à 1 Go de ressources pour limiter la mémoire utilisée ; pour un projet plus lourd, utilise le serveur Wi-Fi.

Un lien vers la seule page d’accueil donne accès à l’application, pas aux projets privés d’un autre navigateur. Le QR contient uniquement l’adresse du projet, pas les modèles ou l’audio. Publie uniquement les modèles et musiques que tu es autorisé à diffuser. Les fichiers que tu ajoutes à un site public deviennent accessibles aux visiteurs.

## Vérification et compilation

```text
node --import tsx --test tools/vr-menu.test.ts tools/project-transfer.test.ts
npm run build
```

La sortie `dist/` est la version à héberger. Un service worker ajoute l’isolation nécessaire au moteur MMD sur GitHub Pages ; au premier accès un rechargement peut avoir lieu.

Documentation : [publication GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [workflows Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [WebXR et HTTPS](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API).
