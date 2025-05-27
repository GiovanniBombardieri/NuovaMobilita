/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `posizione`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posizione` (
  `id_posizione` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comune` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provincia` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `via` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numero_civico` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cap` char(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time_modifica` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `record_attivo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_posizione`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `posizione_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posizione_user` (
  `id_posizione` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comune` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provincia` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `via` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numero_civico` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cap` char(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time_modifica` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `record_attivo` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_posizione`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `prestazioni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestazioni` (
  `id_prestazione` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_tipo_prestazione` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_struttura` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_valore` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descrizione_personalizzata` longtext COLLATE utf8mb4_unicode_ci,
  `time_modifica` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `record_attivo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_prestazione`),
  KEY `prestazioni_id_tipo_prestazione_foreign` (`id_tipo_prestazione`),
  KEY `prestazioni_id_struttura_foreign` (`id_struttura`),
  KEY `prestazioni_id_valore_foreign` (`id_valore`),
  CONSTRAINT `prestazioni_id_struttura_foreign` FOREIGN KEY (`id_struttura`) REFERENCES `struttura` (`id_struttura`) ON DELETE CASCADE,
  CONSTRAINT `prestazioni_id_tipo_prestazione_foreign` FOREIGN KEY (`id_tipo_prestazione`) REFERENCES `tipo_prestazione` (`id_tipo_prestazione`) ON DELETE CASCADE,
  CONSTRAINT `prestazioni_id_valore_foreign` FOREIGN KEY (`id_valore`) REFERENCES `valore` (`id_valore`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `recapito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recapito` (
  `id_recapito` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_struttura` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_tipo_recapito` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time_modifica` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `record_attivo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_recapito`),
  KEY `recapito_id_tipo_recapito_foreign` (`id_tipo_recapito`),
  KEY `recapito_id_struttura_foreign` (`id_struttura`),
  CONSTRAINT `recapito_id_struttura_foreign` FOREIGN KEY (`id_struttura`) REFERENCES `struttura` (`id_struttura`) ON DELETE CASCADE,
  CONSTRAINT `recapito_id_tipo_recapito_foreign` FOREIGN KEY (`id_tipo_recapito`) REFERENCES `tipo_recapito` (`id_tipo_recapito`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sito_web`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sito_web` (
  `id_sito_web` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_modifica` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `record_attivo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_sito_web`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `struttura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `struttura` (
  `id_struttura` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_posizione` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_sito_web` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_recapito` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ragione_sociale` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_modifica` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `record_attivo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_struttura`),
  KEY `struttura_id_posizione_foreign` (`id_posizione`),
  KEY `struttura_id_sito_web_foreign` (`id_sito_web`),
  CONSTRAINT `struttura_id_posizione_foreign` FOREIGN KEY (`id_posizione`) REFERENCES `posizione` (`id_posizione`) ON DELETE CASCADE,
  CONSTRAINT `struttura_id_sito_web_foreign` FOREIGN KEY (`id_sito_web`) REFERENCES `sito_web` (`id_sito_web`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `strutture_preferite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `strutture_preferite` (
  `id_struttura_preferita` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_struttura` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_utente` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_modifica` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `record_attivo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_struttura_preferita`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `telescope_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telescope_entries` (
  `sequence` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `family_hash` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `should_display_on_index` tinyint(1) NOT NULL DEFAULT '1',
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`sequence`),
  UNIQUE KEY `telescope_entries_uuid_unique` (`uuid`),
  KEY `telescope_entries_batch_id_index` (`batch_id`),
  KEY `telescope_entries_family_hash_index` (`family_hash`),
  KEY `telescope_entries_created_at_index` (`created_at`),
  KEY `telescope_entries_type_should_display_on_index_index` (`type`,`should_display_on_index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `telescope_entries_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telescope_entries_tags` (
  `entry_uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`entry_uuid`,`tag`),
  KEY `telescope_entries_tags_tag_index` (`tag`),
  CONSTRAINT `telescope_entries_tags_entry_uuid_foreign` FOREIGN KEY (`entry_uuid`) REFERENCES `telescope_entries` (`uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `telescope_monitoring`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telescope_monitoring` (
  `tag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipo_prestazione`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_prestazione` (
  `id_tipo_prestazione` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipologia` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `titolo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descrizione` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_modifica` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `record_attivo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_tipo_prestazione`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipo_recapito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_recapito` (
  `id_tipo_recapito` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descrizione` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_modifica` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `record_attivo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_tipo_recapito`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_struttura` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_posizione` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cognome` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `indirizzo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ruolo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `record_attivo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `valore`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valore` (
  `id_valore` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valore_numerico` decimal(10,2) NOT NULL,
  `inizio_validita` datetime NOT NULL,
  `fine_validita` datetime NOT NULL,
  `time_modifica` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `record_attivo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_valore`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (1,'0001_01_01_000000_create_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (2,'0001_01_01_000001_create_cache_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (3,'0001_01_01_000002_create_jobs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (4,'2025_03_22_163601_create_personal_access_tokens_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (5,'2025_04_23_150000_create_tipo_recapito_table',3);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (6,'2025_04_23_151000_create_recapito_table',3);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (7,'2025_04_23_151500_create_sito_web_table',3);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (8,'2025_04_23_152000_create_posizione_table',3);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (13,'2025_04_24_063401_add_campi_extra_to_users_table',4);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (14,'2025_04_24_132603_add_campo_id_struttura_to_users_table',4);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (15,'2025_04_24_133434_nome_cognome_nullable_in_users_table',4);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (16,'2025_04_28_114918_add_campo_id_posizione_to_users_table',5);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (17,'2025_04_28_115223_create_posizione_user_table',6);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (18,'2025_04_29_114719_make_columns_nullable_on_posizione_table',7);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (19,'2025_05_06_112653_create_telescope_entries_table',8);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (20,'2025_05_07_063922_add_foreign_key_to_recapito',9);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (21,'2025_05_07_112755_remove_id_recapito_from_struttura',10);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (26,'2025_05_09_070454_create_valore_table',11);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (27,'2025_05_09_070444_create_tipo_prestazione_table',12);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (28,'2025_05_09_064441_create_prestazioni_table',13);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (29,'2025_05_10_083457_add_titolo_to_tipo_prestazione_table',14);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (30,'2025_05_10_084425_add_tipologia_to_tipo_prestazione_table',15);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (31,'2025_05_10_084930_change_descrizione_column_in_tipo_prestazione_table',16);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (32,'2025_05_17_144753_add_id_recapito_column_to_struttura_table',17);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (33,'2025_05_17_145747_make_id_recapito_nullable_in_struttura_table',18);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (35,'2025_05_21_062919_add_descrizione_personalizzata_column_to_prestazioni_table',19);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (36,'2025_05_26_113329_create_preferred_structure_table',20);
