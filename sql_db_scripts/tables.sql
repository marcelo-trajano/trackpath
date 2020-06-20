CREATE TABLE `features` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TitleFeature` varchar(100) NOT NULL,
  `DescriptionFeature` varchar(3000) NOT NULL,
  `EstimatedTime` int NOT NULL,
  `DeliveryDate` date NOT NULL,
  `CreatedAt` date NOT NULL,
  `ProjectID` int NOT NULL,
  `FeatureStatusID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ProjectID` (`ProjectID`),
  KEY `FeatureStatusID` (`FeatureStatusID`),
  CONSTRAINT `features_ibfk_1` FOREIGN KEY (`ProjectID`) REFERENCES `projects` (`ID`),
  CONSTRAINT `features_ibfk_2` FOREIGN KEY (`FeatureStatusID`) REFERENCES `featurestatus` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
     
CREATE TABLE `featurestatus` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NameFeatureStatus` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `statusproject` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `StatusName` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `StatusProgress` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `StatusProgressValue` int NOT NULL,
  `StatusProgress` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
)

insert into StatusProgress (StatusProgressValue,StatusProgress) values (0, "Not Started");
insert into StatusProgress (StatusProgressValue,StatusProgress) values (25, "25%");
insert into StatusProgress (StatusProgressValue,StatusProgress) values (50, "50%");
insert into StatusProgress (StatusProgressValue,StatusProgress) values (75, "75%");
insert into StatusProgress (StatusProgressValue,StatusProgress) values (100, "Done") ;

ALTER TABLE features
ADD StatusProgressID int

ALTER TABLE features
ADD FOREIGN KEY (StatusProgressID) REFERENCES StatusProgress(ID);

ALTER TABLE features
MODIFY DescriptionFeature varchar(3000) NULL;