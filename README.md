![GitHub contributors](https://img.shields.io/github/contributors/giovanniBombardieri/NuovaMobilita)
![Github issues](https://img.shields.io/github/issues/giovanniBombardieri/NuovaMobilita)
![GitHub forks](https://img.shields.io/github/forks/giovanniBombardieri/NuovaMobilita?style=flat)
![Github stars](https://img.shields.io/github/stars/giovanniBombardieri/NuovaMobilita?style=flat&color=%23EF2D5E)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giovanni-bombardieri-13ba7021b/)

<div align="center">
  <img src="https://github.com/user-attachments/assets/89384be9-c396-4eef-b566-648b5f8fe327" alt="nuova-mobilita" width="400"/>

  <br />

  Nuova Mobilità è una piattaforma web dedicata al supporto delle persone che affrontano un percorso di recupero post-amputazione. Permette di mettere in contatto utenti e strutture sanitarie qualificate, facilitando la ricerca di servizi, la gestione delle prestazioni e la comunicazione tra pazienti e centri specializzati.
</div>

## Funzionalità principali

- **Registrazione e Login** per utenti e strutture sanitarie
- **Gestione del profilo** personale o della struttura
- **Ricerca strutture** sanitarie per nome e posizione
- **Visualizzazione dettagli struttura** e recapiti
- **Gestione delle prestazioni** offerte dalle strutture
- **Aggiunta e rimozione di strutture preferite**
- **Mappa delle strutture** (per utenti)
- **Gestione avanzata delle prestazioni** (per strutture)
- **Sistema di paginazione** per la consultazione di strutture e prestazioni

<div align="center">
  <img src="https://github.com/user-attachments/assets/9e847153-6e20-42bb-ba2c-bf35fe07e28d" alt="nuova-mobilita" width="1000"/>
</div>


## Technologies used
### Frontend
- ![React](https://img.shields.io/badge/-React-333333?style=flat&logo=react)
- ![Typescript](https://img.shields.io/badge/-Typescript-333333?style=flat&logo=typescript)
- ![Tailwind CSS](https://img.shields.io/badge/-TailwindCSS-333333?style=flat&logo=tailwindcss)


### Backend Laravel (PHP)
- ![Laravel](https://img.shields.io/badge/-Laravel-333333?style=flat&logo=laravel)
- ![PHP](https://img.shields.io/badge/-PHP-333333?style=flat&logo=php)


### Database
- ![MySQL](https://img.shields.io/badge/-MySQL-333333?style=flat&logo=mysql)

### Containerizzazione
- ![Docker](https://img.shields.io/badge/-Docker-333333?style=flat&logo=docker)

### Autenticazione
- Laravel Sanctum
### Geocoding
- OpenStreetMap Nominatim API

## Requisiti

- Docker

Se si vuole usare l'app in locale:
- Node.js (>=18)
- PHP (>=8.1)
- Composer
- MySQL

## Installazione

### 1. Clona il repository

```bash
git clone https://github.com/GiovanniBombardieri/NuovaMobilita.git
cd nuova-mobilita
```

### 2. Configura il file .env

```bash
cp .env.example .env
```

### 3. Avvio con Docker

```bash
docker-compose up --build -d
```

### 4. Lancia le migrazioni e i seeder

```bash
cd backend
php artisan migrate
php artisan db:seed
php artisan key:generate
```

### 5. Prova l'applicazione

```url
http://localhost:8000
```

## Utilizzo

- Registrati e accedi come utente o struttura sanitaria.
- Gli utenti possono cercare strutture, visualizzare dettagli, aggiungere preferiti e consultare le prestazioni offerte.
- Le strutture possono gestire le proprie prestazioni e modificare il profilo.
- Tutte le operazioni sono protette da autenticazione.

## Struttura del progetto

```
nuova-mobilita/
├── backend/    # Laravel API
├── frontend/   # React App
├── .env.example
└── docker-compose.yml
```

## Contribuire

1. Fai un fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/NomeFeature`)
3. Fai commit delle tue modifiche
4. Fai push del branch
5. Apri una Pull Request

## Licenza

Questo progetto è distribuito sotto licenza MIT.

---

**Per qualsiasi domanda o segnalazione, apri una issue su GitHub!**
