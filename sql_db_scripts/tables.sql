CREATE TABLE `projects` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NameProject` varchar(255) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `DescriptionProject` varchar(3000) NOT NULL,
  `StatusID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `StatusID` (`StatusID`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`StatusID`) REFERENCES `statusproject` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

 
CREATE TABLE `features` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TitleFeature` varchar(300) NOT NULL,
  `DescriptionFeature` varchar(3000) DEFAULT NULL,
  `EstimatedTime` int NOT NULL,
  `DeliveryDate` date NOT NULL,
  `CreatedAt` date NOT NULL,
  `ProjectID` int NOT NULL,
  `FeatureStatusID` int NOT NULL,
  `StatusProgressID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ProjectID` (`ProjectID`),
  KEY `FeatureStatusID` (`FeatureStatusID`),
  KEY `StatusProgressID` (`StatusProgressID`),
  CONSTRAINT `features_ibfk_1` FOREIGN KEY (`ProjectID`) REFERENCES `projects` (`ID`),
  CONSTRAINT `features_ibfk_2` FOREIGN KEY (`FeatureStatusID`) REFERENCES `featurestatus` (`ID`),
  CONSTRAINT `features_ibfk_3` FOREIGN KEY (`StatusProgressID`) REFERENCES `statusprogress` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `bugs` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(300) NOT NULL,
  `Summary` varchar(3000) DEFAULT NULL,
  `EstimatedHours` int NOT NULL,
  `DeliveryDate` date NOT NULL,
  `CreatedAt` date NOT NULL,
  `ProjectID` int NOT NULL,
  `StatusID` int NOT NULL,
  `SeverityID` int NOT NULL,
  `PriorityID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ProjectID` (`ProjectID`),
  KEY `StatusID` (`StatusID`),
  KEY `SeverityID` (`SeverityID`),
  KEY `PriorityID` (`PriorityID`),
  CONSTRAINT `bug_project` FOREIGN KEY (`ProjectID`) REFERENCES `projects` (`ID`),
  CONSTRAINT `priority_bug` FOREIGN KEY (`PriorityID`) REFERENCES `priority` (`ID`),
  CONSTRAINT `severity_bug` FOREIGN KEY (`SeverityID`) REFERENCES `severity` (`ID`),
  CONSTRAINT `status_bug` FOREIGN KEY (`StatusID`) REFERENCES `featurestatus` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `statusproject` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `StatusName` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `statusprogress` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `StatusProgressValue` int NOT NULL,
  `StatusProgress` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `severity` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Severity` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `priority` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Priority` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `featurestatus` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NameFeatureStatus` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `password` varchar(400) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




insert into StatusProgress (StatusProgressValue,StatusProgress) values (0, "Not Started");
insert into StatusProgress (StatusProgressValue,StatusProgress) values (25, "25%");
insert into StatusProgress (StatusProgressValue,StatusProgress) values (50, "50%");
insert into StatusProgress (StatusProgressValue,StatusProgress) values (75, "75%");
insert into StatusProgress (StatusProgressValue,StatusProgress) values (100, "Done") ;



insert into Severity (Severity) values ('Critical');
insert into Severity (Severity) values ('Major');
insert into Severity (Severity) values ('Medium');
insert into Severity (Severity) values ('Low');


insert into Priority (Priority) values ('Low');
insert into Priority (Priority) values ('Medium');
insert into Priority (Priority) values ('High');