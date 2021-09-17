CREATE DATABASE  IF NOT EXISTS `inventory_management_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `inventory_management_system`;
-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: inventory_management_system
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `inventory_number` varchar(50) NOT NULL COMMENT 'Generated from the brand_model and maybe from the date as numbers + random numbers after that.',
  `created_on` date NOT NULL,
  `available` bit(1) NOT NULL,
  `is_scrapped` bit(1) NOT NULL,
  `product_details_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `inventory_number_UNIQUE` (`inventory_number`),
  KEY `fk_product_product_details1_idx` (`product_details_id`),
  CONSTRAINT `fk_product_product_details1` FOREIGN KEY (`product_details_id`) REFERENCES `product_details` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'LLY530_0001','2021-04-26',_binary '\0',_binary '\0',1),(2,'LLY530_0002','2021-04-26',_binary '\0',_binary '\0',1),(3,'RN10_0001','2021-04-26',_binary '\0',_binary '\0',2),(4,'RN10_0002','2021-04-26',_binary '\0',_binary '\0',2),(5,'RN10_0003','2021-04-26',_binary '\0',_binary '\0',2),(6,'RN10_0004','2021-04-26',_binary '\0',_binary '\0',2),(7,'RN10_0005','2021-04-26',_binary '\0',_binary '\0',2),(8,'RN10_0006','2021-04-25',_binary '\0',_binary '\0',2),(9,'RN10_0007','2021-04-25',_binary '\0',_binary '\0',2),(10,'MDMP500GU_0001','2021-04-20',_binary '\0',_binary '\0',5),(11,'MDMP500GU_0002','2021-04-20',_binary '\0',_binary '\0',5),(12,'MDMP500GU_0003','2021-04-20',_binary '\0',_binary '\0',5),(13,'MDMP500GU_0004','2021-04-20',_binary '\0',_binary '\0',5),(14,'MDMP500GU_0005','2021-04-20',_binary '\0',_binary '\0',5),(15,'MDMP500GU_0006','2021-04-20',_binary '\0',_binary '\0',5),(16,'MDMP500GU_0007','2021-04-20',_binary '\0',_binary '\0',5),(17,'MDMP500GU_0008','2021-04-20',_binary '\0',_binary '\0',5),(18,'PCLT7i_0001','2021-04-23',_binary '\0',_binary '\0',6),(19,'PCLT7i_0002','2021-04-23',_binary '\0',_binary '\0',6),(20,'PCLT7i_0003','2021-04-23',_binary '\0',_binary '\0',6),(21,'LLM500_0001','2021-03-15',_binary '\0',_binary '\0',7),(22,'LLM500_0002','2021-03-15',_binary '\0',_binary '\0',7),(23,'LLM500_0003','2021-03-15',_binary '\0',_binary '\0',7),(24,'LLM500_0004','2021-03-15',_binary '',_binary '\0',7),(25,'LLM500_0005','2021-03-15',_binary '\0',_binary '',7),(26,'LLM500_0006','2021-03-15',_binary '\0',_binary '',7),(27,'LPWK_0001','2021-02-05',_binary '\0',_binary '\0',8),(28,'LPWK_0002','2021-02-05',_binary '\0',_binary '\0',8),(29,'LPWK_0003','2021-02-05',_binary '\0',_binary '',8),(30,'LPWK_0004','2021-02-06',_binary '',_binary '\0',8),(31,'LPWK_0005','2021-02-06',_binary '',_binary '\0',8);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-17  7:52:59
