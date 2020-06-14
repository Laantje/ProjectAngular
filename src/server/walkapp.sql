-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2020 at 11:19 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `walkapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_api_key`
--

CREATE TABLE `app_api_key` (
  `id` binary(16) NOT NULL COMMENT 'Record ID',
  `site_name` varchar(128) NOT NULL COMMENT 'Site name',
  `api_key` char(16) NOT NULL COMMENT 'API Key',
  `api_secret_key` varchar(128) NOT NULL COMMENT 'API Secret Key',
  `create_timestamp` datetime(3) NOT NULL COMMENT 'Data creation timestamp',
  `status_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '-1=Deleted, 0=Disabled, 1=Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='App API authentication keys';

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_app_api_key`
-- (See below for the actual view)
--
CREATE TABLE `vw_app_api_key` (
`id` varchar(32)
,`site_name` varchar(128)
,`api_key` char(16)
,`api_secret_key` varchar(128)
,`create_timestamp` datetime(3)
,`status_flag` tinyint(4)
);

-- --------------------------------------------------------

--
-- Structure for view `vw_app_api_key`
--
DROP TABLE IF EXISTS `vw_app_api_key`;

CREATE ALGORITHM=UNDEFINED DEFINER=`stoer`@`%` SQL SECURITY DEFINER VIEW `vw_app_api_key`  AS  select hex(`app_api_key`.`id`) AS `id`,`app_api_key`.`site_name` AS `site_name`,`app_api_key`.`api_key` AS `api_key`,`app_api_key`.`api_secret_key` AS `api_secret_key`,`app_api_key`.`create_timestamp` AS `create_timestamp`,`app_api_key`.`status_flag` AS `status_flag` from `app_api_key` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_api_key`
--
ALTER TABLE `app_api_key`
  ADD PRIMARY KEY (`id`),
  ADD KEY `api_key` (`api_key`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
