![GitHub contributors](https://img.shields.io/github/contributors/giovanniBombardieri/NuovaMobilita)
![Github issues](https://img.shields.io/github/issues/giovanniBombardieri/NuovaMobilita)
![GitHub forks](https://img.shields.io/github/forks/giovanniBombardieri/NuovaMobilita?style=flat)
![Github stars](https://img.shields.io/github/stars/giovanniBombardieri/NuovaMobilita?style=flat&color=%23EF2D5E)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giovanni-bombardieri-13ba7021b/)

<div align="center">
  <img src="https://github.com/user-attachments/assets/89384be9-c396-4eef-b566-648b5f8fe327" alt="nuova-mobilita" width="400"/>

  <br />

Nuova Mobilità is a web platform dedicated to supporting people who are undergoing a post-amputation recovery journey. It connects users and qualified healthcare facilities, making it easier to find services, manage treatments, and facilitate communication between patients and specialized centers.

</div>
<br/>
<br/>

<div style="font-size: 12px; text-align: center; border-left: 5px solid #8C60C1ff; border-right: 5px solid #87D399ff; border-top-left-radius: 10px; border-bottom-right-radius: 10px; padding: 10px">
🕰️ <u>Please note</u>: the application might take a few extra seconds to start. It's hosted on free-tier servers (startup budget still pending!), so a bit of patience is appreciated — I promise it's worth the wait!
</div>

## Main Features

- **Registration and Login** for users and healthcare facilities
- **Profile management** for individuals or facilities
- **Search for healthcare facilities** by name and location
- **View facility details** and contacts
- **Manage services** offered by facilities
- **Add and remove favorite facilities**
- **Facilities map** (for users)
- **Advanced service management** (for facilities)
- **Pagination system** for browsing facilities and services

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

### Containerization

- ![Docker](https://img.shields.io/badge/-Docker-333333?style=flat&logo=docker)

### Authentication

- Laravel Sanctum

### Geocoding

- OpenStreetMap Nominatim API

## Requirements

- Docker

If you want to use the app locally:

- Node.js (>=18)
- PHP (>=8.1)
- Composer
- MySQL

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/GiovanniBombardieri/NuovaMobilita.git
cd nuova-mobilita
```

### 2. Configure the .env file

```bash
cp .env.example .env
```

### 3. Start with Docker

```bash
docker-compose up --build -d
```

### 4. Run migrations and seeders

```bash
cd backend
php artisan migrate
php artisan db:seed
php artisan key:generate
```

### 5. Try the application

```url
http://localhost:8000
```

## Usage

- Register and log in as a user or healthcare facility.
- Users can search for facilities, view details, add favorites, and browse available services.
- Facilities can manage their services and edit their profile.
- All operations are protected by authentication.

## Project structure

```
nuova-mobilita/
├── backend/    # Laravel API
├── frontend/   # React App
├── .env.example
└── docker-compose.yml
```

## Deployment & Hosting

- **Frontend**: l'applicazione React è deployata su [Netlify](https://nuova-mobilita.netlify.app/login).  
  Le chiamate API dal frontend puntano all'endpoint definito nella variabile `VITE_API_URL` del file `.env.production` in `frontend/`.

  > **Nota:** Per lo sviluppo locale, assicurati di modificare la variabile `VITE_API_URL` nel file `.env` o `.env.local` per puntare a `http://localhost:8000` (o la porta usata dal backend).

- **Backend**: l'API Laravel è containerizzata tramite Docker (vedi [`backend/Dockerfile`](backend/Dockerfile)) e deployata su [Render.com](https://render.com/).  
  Il deploy esegue lo script [`backend/start.sh`](backend/start.sh) che:

  - imposta i permessi e le variabili d'ambiente,
  - esegue le migrazioni (`php artisan migrate --force`),
  - lancia i seed solo se necessario,
  - avvia PHP-FPM e Nginx.

- **Database**: anche il database (ad esempio PostgreSQL o MySQL) è hostato su Render.com e accessibile dal backend tramite le variabili d'ambiente.

### Sviluppo locale

- Per testare il frontend in locale, assicurati che la variabile `VITE_API_URL` punti al backend locale.
- Per avviare il backend in locale, puoi usare Docker Compose seguendo le istruzioni già presenti nel README.

## Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/FeatureName`)
3. Commit your changes
4. Push the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

**For any questions or issues, open an issue on GitHub!**
