SET NAMES latin1;
SET FOREIGN_KEY_CHECKS = 0;

BEGIN;
CREATE DATABASE IF NOT EXISTS `pweb`;
COMMIT;

USE `pweb`;

-- ----------------------------
--  Table structure for `Esordio`
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `domanda` varchar(255) NOT NULL,
  `risposta` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `game`;
CREATE TABLE `game` (
  `id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `username` varchar(255) NOT NULL,
  `points` INT,
  FOREIGN KEY (username) REFERENCES account(username)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

