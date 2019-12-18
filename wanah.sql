-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: wanah
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author_book`
--
use wannabook_server
DROP TABLE IF EXISTS `author_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `author_book` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `authorId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  PRIMARY KEY (`authorId`,`bookId`),
  KEY `bookId` (`bookId`),
  CONSTRAINT `author_book_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `author_book_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author_book`
--

LOCK TABLES `author_book` WRITE;
/*!40000 ALTER TABLE `author_book` DISABLE KEYS */;
INSERT INTO `author_book` VALUES ('2019-12-14 17:20:00','2019-12-14 17:20:00',3,4),('2019-12-14 17:26:27','2019-12-14 17:26:27',3,5),('2019-12-14 17:28:26','2019-12-14 17:28:26',3,6),('2019-12-14 17:31:22','2019-12-14 17:31:22',3,7),('2019-12-14 17:32:58','2019-12-14 17:32:58',3,8),('2019-12-14 17:34:58','2019-12-14 17:34:58',3,9),('2019-12-14 17:36:20','2019-12-14 17:36:20',3,10),('2019-12-14 17:47:39','2019-12-14 17:47:39',6,11),('2019-12-14 17:49:39','2019-12-14 17:49:39',6,12),('2019-12-14 17:54:19','2019-12-14 17:54:19',6,13),('2019-12-14 17:56:46','2019-12-14 17:56:46',7,14),('2019-12-14 18:01:13','2019-12-14 18:01:13',11,15),('2019-12-14 18:06:06','2019-12-14 18:06:06',12,16),('2019-12-15 01:14:25','2019-12-15 01:14:28',13,18),('2019-12-15 01:14:37','2019-12-15 01:14:40',14,17),('2019-12-14 18:18:04','2019-12-14 18:18:04',15,19);
/*!40000 ALTER TABLE `author_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (3,'Nguyễn Nhật Ánh','2019-12-14 16:58:02','2019-12-14 16:58:02'),(4,'Nguyễn Ngọc Ngạn','2019-12-14 17:09:14','2019-12-14 17:09:14'),(5,'Martin Dorey','2019-12-14 17:09:44','2019-12-14 17:09:44'),(6,'Higashino Keigo','2019-12-14 17:10:22','2019-12-14 17:10:22'),(7,'Cảnh Thiên','2019-12-14 17:11:03','2019-12-14 17:11:03'),(8,'Hae Min','2019-12-14 17:11:50','2019-12-14 17:11:50'),(9,'Thu Giang','2019-12-14 17:13:02','2019-12-14 17:13:02'),(10,'Nguyễn Duy Cần','2019-12-15 00:14:02','2019-12-15 00:14:05'),(11,'Phạm Lữ Ân','2019-12-14 17:59:58','2019-12-14 17:59:58'),(12,'Rosie Nguyễn','2019-12-14 18:03:50','2019-12-14 18:03:50'),(13,'Robin Sharma','2019-12-14 18:14:12','2019-12-14 18:14:12'),(14,'Mari Tamagawa','2019-12-14 18:15:03','2019-12-14 18:15:03'),(15,'Sasaki Fumio','2019-12-14 18:15:57','2019-12-14 18:15:57');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_users`
--

DROP TABLE IF EXISTS `book_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `bookId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `bookId` (`bookId`),
  CONSTRAINT `book_users_ibfk_11` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `book_users_ibfk_12` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_users`
--

LOCK TABLES `book_users` WRITE;
/*!40000 ALTER TABLE `book_users` DISABLE KEYS */;
INSERT INTO `book_users` VALUES (1,'2019-12-17 05:01:22','2019-12-17 05:01:22',12,5),(2,'2019-12-17 05:14:38','2019-12-17 05:14:38',10,6),(3,'2019-12-17 05:18:00','2019-12-17 05:18:00',10,5),(4,'2019-12-17 09:11:53','2019-12-17 09:11:53',10,4);
/*!40000 ALTER TABLE `book_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8 NOT NULL,
  `publisher` text CHARACTER SET utf8,
  `description` text CHARACTER SET utf8,
  `image` varchar(255) DEFAULT NULL,
  `star` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `text_idx` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (4,'Những chàng trai xấu tính','Nhà xuất bản trẻ','Từ những lần gặp gỡ thường xuyên ở hồ bơi, có một cuộc chiến tranh tưởng bùng nổ giữa hai chàng trai vốn là “chiến hữu”. Tất cả chỉ là vì một cô gái có hành tung khó hiểu và tính nết thay đổi liên tục. Sự hiểu lầm ấy may thay không kéo dài lâu quá, bởi vì sau cùng hai chàng trai xấu tính ấy hiểu ra, họ đang yêu hai chị em sinh đôi.','books/1.jpg',0,'2019-12-14 17:20:00','2019-12-14 17:20:00'),(5,'Làm bạn với bầu trời','Nhà xuất bản trẻ','Một câu chuyện  giản dị, chứa đầy bất ngờ cho tới trang cuối cùng. Và đẹp lộng lẫy, vì lòng vị tha và tình yêu thương, khiến mắt rưng rưng vì một nỗi mừng vui hân hoan. Cuốn sách như một đốm lửa thắp lên lòng khát khao sống tốt trên đời.Viết về điều tốt đã không dễ, viết sao cho người đọc có thể đón nhận đầy cảm xúc tích cực, và muốn  được hưởng, được làm những điều tốt dù nhỏ bé... mới thật là khó. Làm bạn với bầu trời của Nguyễn Nhật Ánh đã làm được điều này, anh đã “mô tả cái tốt thật đẹp để người ta yêu thích nó”, như  anh  từng phát biểu “... điểm mạnh của văn chương nằm ở khả năng thẩm thấu. Bằng hình thức đặc thù của mình, văn chương góp phần mài sắc các ý niệm đạo đức nơi người đọc một cách vô hình. Bồi đắp tâm hồn và nhân cách một cách âm thầm và bền bỉ, đó là chức năng gốc rễ của văn chương, đặc biệt là văn chương viết cho thanh thiếu niên.”','books/2.jpg',2.8,'2019-12-14 17:26:27','2019-12-14 17:26:27'),(6,'Mắt biếc','Nhà xuất bản trẻ','Một tác phẩm được nhiều người bình chọn là hay nhất của nhà văn này. Một tác phẩm đang được dịch và giới thiệu tại Nhật Bản (theo thông tin từ các báo)… Bởi sự trong sáng của một tình cảm, bởi cái kết thúc rất, rất buồn khi suốt câu chuyện vẫn là những điều vui, buồn lẫn lộn (cái kết thúc không như mong đợi của mọi người). Cũng bởi, mắt biếc… năm xưa nay đâu (theo lời một bài hát)','books/3.jpg',0,'2019-12-14 17:28:26','2019-12-14 17:28:26'),(7,'Bảy bước tới mùa hè','Nhà xuất bản trẻ','Câu chuyện về một mùa hè ngọt ngào, những trò chơi nghịch ngợm và bâng khuâng tình cảm tuổi mới lớn. Chỉ vậy thôi nhưng chứng tỏ tác giả đúng là nhà kể chuyện hóm hỉnh, khiến đọc cuốn hút từ tựa đến trang cuối cùng, có lẽ chính vì giọng văn giản dị và trong trẻo của Nguyễn Nhật Ánh, và kết thúc thì có hậu đầy thuyết phục. Câu chuyện cho tuổi học trò, đọc xong là thấy ngập lên khao khát quay về một thời thơ bé, với tình thầy trò, bè bạn, tình xóm giềng, họ hàng, qua cách nhìn đời nhẹ nhõm, rộng lượng.</br>Cuốn sách này nhà văn đề tặng “Những năm tháng ấu thơ”, tặng các bạn thời nhỏ, cũng là tặng bạn đọc thân thiết của mình.','books/4.jpg',0,'2019-12-14 17:31:22','2019-12-14 17:31:22'),(8,'Bồ câu không đưa thư','Nhà xuất bản trẻ','Câu chuyện bắt đầu từ lá thư làm quen để trong học bàn của Thục, trong bộ ba Xuyến, Thục, Cúc Hương. Lá thư chân tình đã thu hút sự tò mò của bộ ba, và họ bị cuốn hút vào trò chơi với người giấu mặt, dần hồi kéo theo Phán củi, anh chàng xấu xí vụng về của lớp làm quân sư và giúp xướng họa thơ. Cuộc truy tìm dẫn mọi người đến nhiều hiểu lầm tai hại và cả những bất ngờ thú vị. Và điều bất ngờ cuối cùng đã được phát hiện quá muộn. Vì sao? Xin để cho bạn đọc tự khám phá.','books/5.jpg',0,'2019-12-14 17:32:58','2019-12-14 17:32:58'),(9,'Cảm Ơn Người Lớn','Nhà xuất bản trẻ','Bạn sẽ gặp lại Mùi, Tủn, Tí sún, Hải cò… của Cho tôi xin một vé đi tuổi thơ, cùng chơi những trò chơi quen thuộc, và được đắm mình vào những ước mơ điên rồ, ngốc nghếch nhưng trong veo của tuổi mới lớn hồn nhiên và đầy ắp dự định.\nVà cả khi họ đã trưởng thành, bạo chúa thời gian đã vùng vẫy thế nào trong cuộc đời của những nhân vật mà bạn yêu quý…\nHãy bắt đầu đọc từ bất cứ trang nào, có thể đọc bất cứ lúc nào, và cùng với bất cứ ai. Bạn sẽ nhận được món quà “n trong 1” của nhà văn Nguyễn Nhật Ánh: sẽ n lần thổn thức qua 1 cuốn sách 19 chương đầy ắp tình bạn ngây thơ, tình xóm giềng tốt lành nhân ái, tình yêu đắm đuối ngọt ngào…\nCảm ơn người lớn được Nguyễn Nhật Ánh đặt bút viết đúng sau 10 năm ra đời Cho tôi xin một vé đi tuổi thơ – cuốn sách bán chạy tới nay đã 400.000 bản.','books/6.jpg',0,'2019-12-14 17:34:58','2019-12-14 17:34:58'),(10,'Cô Gái Đến Từ Hôm Qua','Nhà xuất bản trẻ','Nếu ngày xưa còn bé, Thư luôn tự hào mình là cậu con trai thông minh có quyền bắt nạt và sai khiến các cô bé cùng lứa tuổi thì giờ đây khi lớn lên, anh luôn khổ sở khi thấy mình ngu ngơ và bị con gái “xỏ mũi”. Và điều nghịch lý ấy xem ra càng “trớ trêu’ hơn, khi như một định mệnh, Thư nhận ra Việt An, cô bạn học thông minh thường làm mình bối rối bấy lâu nay chính là Tiểu Li, con bé hàng xóm ngốc nghếch từng hứng chịu những trò nghịch ngợm của mình hồi xưa.','books/7.jpg',0,'2019-12-14 17:36:20','2019-12-14 17:36:20'),(11,'Bạch Dạ Hành','Nhã Nam','Kosuke, chủ một tiệm cầm đồ bị sát hại tại một ngôi nhà chưa hoàn công, một triệu yên mang theo người cũng bị cướp mất.\nSau đó một tháng, nghi can Fumiyo được cho rằng có quan hệ tình ái với nạn nhân và đã sát hại ông để cướp một triệu yên, cũng chết tại nhà riêng vì ngộ độc khí ga. Vụ án mạng ông chủ tiệm cầm đồ rơi vào bế tắc và bị bỏ xó.\nNhưng với hai đứa trẻ mười một tuổi, con trai nạn nhân và con gái nghi can, vụ án mạng năm ấy chưa bao giờ kết thúc. Sinh tồn và trưởng thành dưới bóng đen cái chết của bố mẹ, cho đến cuối đời, Ryoji vẫn luôn khao khát được một lần đi dưới ánh mặt trời, còn Yukiho cứ ra sức vẫy vùng rồi mãi mãi chìm vào đêm trắng.','books/8.jpg',0,'2019-12-14 17:47:39','2019-12-14 17:47:39'),(12,'Điều Kỳ Diệu Của Tiệm Tạp Hóa NAMIYA','Nhã Nam','Một đêm vội vã lẩn trốn sau phi vụ khoắng đồ nhà người, Atsuya, Shota và Kouhei đã rẽ vào lánh tạm trong một căn nhà hoang bên con dốc vắng người qua lại. Căn nhà có vẻ khi xưa là một tiệm tạp hóa với biển hiệu cũ kỹ bám đầy bồ hóng, khiến người ta khó lòng đọc được trên đó viết gì. Định bụng nghỉ tạm một đêm rồi sáng hôm sau chuồn sớm, cả ba không ngờ chờ đợi cả bọn sẽ là một đêm không ngủ, với bao điều kỳ bí bắt đầu từ một phong thư bất ngờ gửi đến…','books/9.jpg',0,'2019-12-14 17:49:39','2019-12-14 17:49:39'),(13,'Phía Sau Nghi Can X','Nhã Nam','Khi nhấn chuông cửa nhà nghi can chính của một vụ án mới, điều tra viên Kusanagi không biết rằng anh sắp phải đương đầu với một thiên tài ẩn dật. Kusanagi càng không thể ngờ rằng, chỉ một câu nói vô thưởng vô phạt của anh đã kéo người bạn thân, Manabu Yukawa, một phó giáo sư vật lý tài năng, vào vụ án. Và điều làm sững sờ nhất, đó là vụ án kia chẳng qua cũng chỉ như một bài toán cấp ba đơn giản, tuy nhiên ấn số X khi được phơi bày ra lại không đem đến hạnh phúc cho bất cứ ai…','books/10.gif',0,'2019-12-14 17:54:19','2019-12-14 17:54:19'),(14,'Đừng lựa chọn an nhàn khi còn trẻ','Nhà Xuất Bản Thế Giới','Trong độ xuân xanh phơi phới ngày ấy, bạn không dám mạo hiểm, không dám nỗ lực để kiếm học bổng, không chịu tìm tòi những thử thách trong công việc, không phấn đấu hướng đến ước mơ của mình. Bạn mơ mộng rằng làm việc xong sẽ vào làm ở một công ty nổi tiếng, làm một thời gian sẽ thăng quan tiến chức. Mơ mộng rằng khởi nghiệp xong sẽ lập tức nhận được tiền đầu tư, cầm được tiền đầu tư là sẽ niêm yết trên sàn chứng khoán. Mơ mộng rằng muốn gì sẽ có đó, không thiếu tiền cũng chẳng thiếu tình, an hưởng những năm tháng êm đềm trong cuộc đời mình. Nhưng vì sao bạn lại nghĩ rằng bạn chẳng cần bỏ ra chút công sức nào, cuộc sống sẽ dâng đến tận miệng những thứ bạn muốn? Bạn cần phải hiểu rằng: Hấp tấp muốn mau chóng thành công rất dễ khiến chúng ta đi vào mê lộ. Thanh xuân là khoảng thời gian đẹp đẽ nhất trong đời, cũng là những năm tháng then chốt có thể quyết định tương lai của một người. Nếu bạn lựa chọn an nhàn trong 10 năm, tương lai sẽ buộc bạn phải vất vả trong 50 năm để bù đắp lại. Nếu bạn bươn chải vất vả trong 10 năm, thứ mà bạn chắc chắn có được là 50 năm hạnh phúc. Điều quý giá nhất không phải là tiền mà là tiền bạc. Thế nên, bạn à, đừng lựa chọn an nhàn khi còn trẻ.','books/11.jpg',0,'2019-12-14 17:56:46','2019-12-14 17:56:46'),(15,'Nếu Biết Trăm Năm Là Hữu Hạn','Nhà Xuất Bản Thế Giới','Người ta gọi tuổi mới lớn là “tuổi biết buồn”. “Biết buồn” tức là chạm ngõ cuộc đời rồi đó. Biết buồn tức là bắt đầu nhận ra sự hiện hữu của những khoảng trống trong tâm hồn. Biết buồn là khi nhận ra rằng có những lúc mình cảm thấy cô độc. Khi đó, hãy dành cho sự cô độc một khoảng riêng, hãy đóng khung sự cô đơn trong giới hạn của nó, như một căn phòng trống trong ngôi nhà tâm hồn. Mỗi lần vào căn phòng ấy, dù tự nguyện hay bị xô đẩy, thì bạn vẫn có thể điềm tĩnh khám phá bản thân trong sự tĩnh lặng. để rồi sau đó, bạn bình thản bước ra, khép cánh cửa lại và trở về với cuộc sống bề bộn thường ngày, vốn lắm nỗi buồn nhưng cũng không bao giờ thiếu niềm vui…','books/12.jpg',0,'2019-12-14 18:01:13','2019-12-14 18:01:13'),(16,'Tuổi Trẻ Đáng Giá Bao Nhiêu','Nhã Nam','\"Bạn hối tiếc vì không nắm bắt lấy một cơ hội nào đó, chẳng có ai phải mất ngủ.\nBạn trải qua những ngày tháng nhạt nhẽo với công việc bạn căm ghét, người ta chẳng hề bận lòng.\nBạn có chết mòn nơi xó tường với những ước mơ dang dở, đó không phải là việc của họ.\nSuy cho cùng, quyết định là ở bạn. Muốn có điều gì hay không là tùy bạn.\nNên hãy làm những điều bạn thích. Hãy đi theo tiếng nói trái tim. Hãy sống theo cách bạn cho là mình nên sống.\nVì sau tất cả, chẳng ai quan tâm.\"\n\nNhận định\n\n\"Tôi đã đọc quyển sách này một cách thích thú. Có nhiều kiến thức và kinh nghiệm hữu ích, những điều mới mẻ ngay cả với người gần trung niên như tôi.\nTuổi trẻ đáng giá bao nhiêu? được tác giả chia làm 3 phần: HỌC, LÀM, ĐI.\nNhưng tôi thấy cuốn sách còn thể hiện một phần thứ tư nữa, đó là ĐỌC.\nHãy đọc sách, nếu bạn đọc sách một cách bền bỉ, sẽ đến lúc bạn bị thôi thúc không ngừng bởi ý muốn viết nên cuốn sách của riêng mình.\nNếu tôi còn ở tuổi đôi mươi, hẳn là tôi sẽ đọc Tuổi trẻ đáng giá bao nhiêu? nhiều hơn một lần.\"','books/13.jpg',0,'2019-12-14 18:06:05','2019-12-14 18:06:05'),(17,'Mặc Kệ Thiên Hạ - Sống Như Người Nhật','SKY Books','Dành cho những ai muốn được sống là chính mình, cuộc đời của mình, tuổi trẻ của mình.\n\nĐã đến lúc bạn nên dừng tìm kiếm sự an ủi ở người khác, hoặc chờ đợi sự giúp đỡ từ một ai đó. Bởi an ủi hay giúp đỡ về mặt cảm xúc đôi khi giống như con dao hai lưỡi. Nó có thể giúp bạn chống đỡ lo âu hay muộn phiền nhất thời, nhưng lại đẩy bạn chìm sâu hơn vào những cảm xúc tiêu cực đó. Giống như một đứa trẻ khi vấp ngã, bạn mong đợi một sự xoa dịu từ người lớn, mà quên mất rằng sự “hỗ trợ” ấy chỉ càng khiến bạn mãi chẳng thể nào “biết đi”.\n\nVà Mặc hệ thiên hạ, sống như người Nhật chính là cuốn sách dành cho những người muốn đi bằng chính đôi chân mình. Dành cho những người muốn gạt bỏ những nỗi sợ bởi chính tay mình, chứ không cầu cứu bất kì sự trợ giúp nào.\n\nHãy thử sống một ngày “mặc kệ thiên hạ”, mặc kệ những lời nhận xét từ người khác. Hãy thử sống một ngày bạn cho phép mình từ bỏ, từ bỏ những thứ khó khăn, ngổn ngang lo lắng. Hãy thử sống một ngày bạn trân trọng mọi cung bậc cảm xúc bên trong con người bạn.\n\n“Nếu bạn có thể thẳng thắn đối diện với bản thân và từ bỏ những thứ đang giam cầm bạn, bạn sẽ trở thành con người có chính kiến, biết quý trọng hơn và đặt những cảm xúc của bản thân lên trên mọi ánh nhìn của người khác.”\n\nMari Tamagawa khuyến khích mỗi người nên sống thật và ngưng phán xét bản thân. Thật lãng phí khi bạn để cuộc đời mình phải trải qua những tháng ngày khổ sở chỉ vì cái nhìn của người khác. Cũng đừng tin vào những “chiếc phao” cứu cánh mà bạn nhầm tưởng rằng sẽ giúp mình rũ bỏ được mọi lo lắng. Tổn thương tâm lí, áp lực hay nỗi sợ… của bản thân, chúng ta phải đối mặt với nó, chiến đấu và tự chữa trị cho chính mình.\n\nĐã đến lúc bạn cần phải nói lời tạm biệt với cuộc sống đầy âu lo đang rút cạn năng lượng của bạn. Cuộc đời của bạn không thuộc về ai khác, cuộc đời của bạn thuộc về bạn. Tháng 3 này hãy để “Mặc kệ thiên hạ, sống như người Nhật” giúp bạn bắt đầu cuộc đời mới, cuộc đời mang tên chính mình.','books/14.jpg',0,'2019-12-14 18:10:34','2019-12-14 18:10:34'),(18,'Đời Ngắn Đừng Ngủ Dài','SKY Books','Người ta gọi tuổi mới lớn là “tuổi biết buồn”. “Biết buồn” tức là chạm ngõ cuộc đời rồi đó. Biết buồn tức là bắt đầu nhận ra sự hiện hữu của những khoảng trống trong tâm hồn. Biết buồn là khi nhận ra rằng có những lúc mình cảm thấy cô độc. Khi đó, hãy dành cho sự cô độc một khoảng riêng, hãy đóng khung sự cô đơn trong giới hạn của nó, như một căn phòng trống trong ngôi nhà tâm hồn. Mỗi lần vào căn phòng ấy, dù tự nguyện hay bị xô đẩy, thì bạn vẫn có thể điềm tĩnh khám phá bản thân trong sự tĩnh lặng. để rồi sau đó, bạn bình thản bước ra, khép cánh cửa lại và trở về với cuộc sống bề bộn thường ngày, vốn lắm nỗi buồn nhưng cũng không bao giờ thiếu niềm vui…','books/15.jpg',0,'2019-12-14 18:13:03','2019-12-14 18:13:03'),(19,'Lối Sống Tối Giản Của Người Nhật','Nhà xuất bản lao động','Lối sống tối giản là cách sống cắt giảm vật dụng xuống còn mức tối thiểu. Và cùng với cuộc sống ít đồ đạc, ta có thể để tâm nhiều hơn tới hạnh phúc, đó chính là chủ đề của cuốn sách này.\n\nChẳng có ai từ khi sinh ra đã có tài sản, đồ đạc gì trong tay. Vậy nên bất cứ ai khi mới chào đời đều là những người sống tối giản. Cứ mỗi lần bạn sở hữu trong tay những đồ dùng hơn mức cần thiết là một lần bạn lấy mất tự do của chính mình. Giá trị bản thân chúng ta không đo bằng những đồ dùng mà chúng ta sở hữu. Những đồ dùng này chỉ cho chúng ta một chút cảm giác hạnh phúc nhất thời mà thôi. Mang theo những đồ dùng hơn mức cần thiết sẽ lấy hết thời gian, năng lượng của bạn. Khi nhận ra được điều đó, tức là bạn đã bắt đầu trở thành một người sống tối giản.\n\nNhững người sống tối giản luôn cảm thấy vui vẻ, mới lạ mỗi ngày. Cái cảm giác này, tôi nghĩ bất cứ ai cũng có thể cảm nhận được, dù bạn có phải là một người sống tối giản hay không, bởi bất cứ ai.\n\nLối sống tối giản của người Nhật gồm có năm chương, trong đó, chương một, tác giả sẽ giới thiệu cho bạn lối sống tối giản là gì, đưa ra định nghĩa của anh về nó. Sau đó anh sẽ đưa ra lý do vì sao mình lại theo lối sống này sau nhiều năm sống trong căn phòng của bản thân.\n\nChương hai tác giả sẽ đề cập đến tại sao sau ngần ấy năm, đồ đạc trong nhà lại chất nhiều đến thế. Những đồ đạc được tích tụ lại do thói quen hay nhu cầu của con người này mang ý nghĩa gì?\n\nChương ba là những bí quyết để cắt giảm đồ đạc trong nhà. Tác giả sẽ đưa ra cho bạn những quy tắc cụ thể, những phương pháp để có thể giảm bớt đồ đạc trong nhà. Thêm vào đó cũng sẽ giới thiệu cho bạn danh sách bổ sung 15 điều cho những người muốn tối giản hơn nữa cùng với toa thuốc cho “căn bệnh muốn vứt bỏ”.\n\nChương bốn, những thay đổi của chính tác giả sau khi dọn hết đồ đạc trong nhà. Kèm theo đó, anh còn phân tích và khảo sát thêm về các kết quả nghiên cứu tâm lý học.\n\nCuối cùng chương năm, tiếp nối ý từ chương bốn, tác giả sẽ giải thích tại sao những thay đổi của bản thân lại dẫn đến “hạnh phúc”.\n\nĐể hiểu sâu hơn về lối sống tối giản, bạn nên đọc hết từ chương một đến chương bốn. Tuy nhiên, bạn cũng có thể đọc riêng từng chương. Thậm chí chỉ cần đọc chương ba cũng có thể giúp bạn cắt giảm được đồ đạc của mình.\n\nTrong cuốn sách này, “lối sống tối giản” được hiểu là: 1) giới hạn tối thiểu cần thiết cho bản thân và 2) vứt bỏ tất cả mọi thứ trừ những thứ quan trọng.\n\nVà những người sống theo lối sống đó gọi là người sống tối giản.','books/16.jpg',0,'2019-12-14 18:18:04','2019-12-14 18:18:04');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Kinh di','2019-12-14 07:22:30','2019-12-14 07:22:32'),(2,'Tình cảm','2019-12-14 09:24:53','2019-12-14 09:24:53'),(3,'Văn học','2019-12-14 17:03:26','2019-12-14 17:03:26'),(4,'Giáo trình','2019-12-14 17:04:25','2019-12-14 17:04:25'),(5,'Truyện ngắn','2019-12-14 17:04:34','2019-12-14 17:04:34'),(6,'Sách thiếu nhi','2019-12-14 17:04:54','2019-12-14 17:04:54'),(7,'Tiểu thuyết','2019-12-14 17:05:10','2019-12-14 17:05:10'),(8,'Khoa học','2019-12-14 17:05:25','2019-12-14 17:05:25'),(9,'Kinh tế','2019-12-14 17:05:57','2019-12-14 17:05:57'),(10,'Kỹ năng sống','2019-12-14 17:06:13','2019-12-14 17:06:13'),(11,'Tham khảo','2019-12-14 17:06:30','2019-12-14 17:06:30'),(12,'Công nghệ','2019-12-14 17:06:48','2019-12-14 17:06:48'),(13,'Chính trị - Pháp Lý','2019-12-14 17:07:05','2019-12-14 17:07:05'),(14,'Y học','2019-12-14 17:07:23','2019-12-14 17:07:23'),(15,'Trinh thám','2019-12-14 17:53:16','2019-12-14 17:53:16'),(16,'Tình yêu','2019-12-14 18:00:53','2019-12-14 18:00:53'),(17,'Tâm lý','2019-12-14 18:04:26','2019-12-14 18:04:26');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_book`
--

DROP TABLE IF EXISTS `category_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_book` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  PRIMARY KEY (`categoryId`,`bookId`),
  KEY `bookId` (`bookId`),
  CONSTRAINT `category_book_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_book_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_book`
--

LOCK TABLES `category_book` WRITE;
/*!40000 ALTER TABLE `category_book` DISABLE KEYS */;
INSERT INTO `category_book` VALUES ('2019-12-14 17:47:39','2019-12-14 17:47:39',1,11),('2019-12-14 17:49:39','2019-12-14 17:49:39',1,12),('2019-12-14 17:20:01','2019-12-14 17:20:01',3,4),('2019-12-14 17:26:27','2019-12-14 17:26:27',3,5),('2019-12-14 17:28:26','2019-12-14 17:28:26',3,6),('2019-12-14 17:31:22','2019-12-14 17:31:22',3,7),('2019-12-14 17:32:58','2019-12-14 17:32:58',3,8),('2019-12-14 17:34:58','2019-12-14 17:34:58',3,9),('2019-12-14 17:36:20','2019-12-14 17:36:20',3,10),('2019-12-14 17:47:39','2019-12-14 17:47:39',3,11),('2019-12-14 17:49:39','2019-12-14 17:49:39',3,12),('2019-12-14 17:54:19','2019-12-14 17:54:19',3,13),('2019-12-14 17:26:27','2019-12-14 17:26:27',5,5),('2019-12-14 17:28:26','2019-12-14 17:28:26',5,6),('2019-12-14 17:31:22','2019-12-14 17:31:22',5,7),('2019-12-14 17:32:58','2019-12-14 17:32:58',5,8),('2019-12-14 17:34:58','2019-12-14 17:34:58',5,9),('2019-12-14 17:36:20','2019-12-14 17:36:20',5,10),('2019-12-14 17:56:46','2019-12-14 17:56:46',10,14),('2019-12-14 18:06:06','2019-12-14 18:06:06',10,16),('2019-12-14 18:10:34','2019-12-14 18:10:34',10,17),('2019-12-14 18:13:03','2019-12-14 18:13:03',10,18),('2019-12-14 18:18:04','2019-12-14 18:18:04',10,19),('2019-12-14 17:54:19','2019-12-14 17:54:19',15,13),('2019-12-14 18:01:13','2019-12-14 18:01:13',16,15),('2019-12-14 18:06:06','2019-12-14 18:06:06',17,16);
/*!40000 ALTER TABLE `category_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_user_favorite`
--

DROP TABLE IF EXISTS `category_user_favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_user_favorite` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int(11) NOT NULL,
  `profileId` int(11) NOT NULL,
  PRIMARY KEY (`categoryId`,`profileId`),
  KEY `profileId` (`profileId`),
  CONSTRAINT `category_user_favorite_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_user_favorite_ibfk_2` FOREIGN KEY (`profileId`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_user_favorite`
--

LOCK TABLES `category_user_favorite` WRITE;
/*!40000 ALTER TABLE `category_user_favorite` DISABLE KEYS */;
INSERT INTO `category_user_favorite` VALUES ('2019-12-14 07:22:41','2019-12-14 07:22:47',1,3),('2019-12-14 17:27:24','2019-12-14 17:27:26',1,12),('2019-12-14 17:27:34','2019-12-14 17:27:36',2,12);
/*!40000 ALTER TABLE `category_user_favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8,
  `message_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `from` int(11) DEFAULT NULL,
  `to` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `from` (`from`),
  KEY `to` (`to`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`from`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`to`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` text CHARACTER SET utf8,
  `last_name` text CHARACTER SET utf8,
  `description` text CHARACTER SET utf8,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `address_detail` text CHARACTER SET utf8,
  `address_longitude` double DEFAULT NULL,
  `address_latitude` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'Nguyen','Vương',NULL,'2019-11-27 15:40:39','2019-11-27 15:40:39',1,'Hồ Tung Mậu, Cầu Giấy, Hà Nội',106.1124496459961,20.76534080505371),(2,'Nguyen','Vương',NULL,'2019-11-27 15:42:28','2019-11-27 15:42:28',2,'265 Trần Quốc Hoàn, Cầu Giấy, Hà Nội',105.78498840332031,21.04166030883789),(3,'Nguyen','Vu','This is a good day','2019-12-03 08:16:05','2019-12-14 00:45:50',3,'46 Trần Quốc Hoàn, Cầu Giấy, Hà Nội',105.78578186035156,21.04167938232422),(4,'asd','adsa',NULL,'2019-12-03 08:23:36','2019-12-03 08:23:36',4,'165 Cầu Giấy, Hà Nội',105.79853820800781,21.032649993896484),(5,'Nguyen','Vu',NULL,'2019-12-03 08:45:36','2019-12-03 08:45:36',5,'130 Xuân Thủy, Cầu Giấy,  Hà Nội',105.78533172607422,21.036670684814453),(6,'ad','sad',NULL,'2019-12-03 08:45:56','2019-12-03 08:45:56',6,'Trung Tâm Hội Nghị Quốc Gia',104.51335144042969,21.600250244140625),(7,'ad','da',NULL,'2019-12-03 08:57:21','2019-12-03 08:57:21',7,'182 Lương Thế Vinh, Thanh Xuân, Hà Nội',104.51335144042969,21.600250244140625),(8,'asd','dad',NULL,'2019-12-03 08:58:51','2019-12-03 08:58:51',8,'182 Nguyễn Trãi, Thanh Xuân, Hà Nội',105.79920196533203,20.98889923095703),(9,'Nguyen','Vu',NULL,'2019-12-03 09:05:25','2019-12-03 09:05:25',9,'69 Trần Duy Hưng, Hà Nội',105.8009262084961,21.011579513549805),(10,'Nguyen ','Tuan Vu',NULL,'2019-12-09 09:43:12','2019-12-09 09:43:12',10,'198 Tây Sơn, Đống Đa, Hà Nội',105.82404327392578,21.00885009765625),(11,'Nguyen','Vu',NULL,'2019-12-10 08:55:09','2019-12-10 08:55:09',11,'17 Duy Tân, Hà Nội',105.84345245361328,21.02914047241211),(12,'ly','nghia',NULL,'2019-12-14 08:39:02','2019-12-14 08:39:02',12,'Nhà Hát Lớn Hà Nội',105.61649322509766,21.12894058227539),(13,'nguyen','vu',NULL,'2019-12-14 10:36:47','2019-12-14 10:36:47',13,'82 Xuân Thủy, Cầu Giấy, Hà Nội',105.78858184814453,21.036529541015625),(14,'Nguyen','Tuan Vu',NULL,'2019-12-14 10:46:37','2019-12-14 10:46:37',14,'21 Phố Tôn Đức Thắng, Hà Nội, Việt Nam',105.83402252197266,21.027189254760742);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `request_date` datetime DEFAULT NULL,
  `return_date` datetime DEFAULT NULL,
  `is_accept` tinyint(1) DEFAULT NULL,
  `is_exprired` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `bookUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bookUserId` (`bookUserId`),
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`bookUserId`) REFERENCES `book_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8,
  `star` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `bookId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `bookId` (`bookId`),
  CONSTRAINT `reviews_ibfk_11` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_12` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'Sách rất hay đáng để đọc',5,'2019-12-15 19:19:56','2019-12-15 19:19:56',10,5),(2,'Sách còn nhiều chỗ chưa ổn',4,'2019-12-15 19:20:41','2019-12-15 19:20:41',10,6),(3,'Truyện rất sinh động ',4,'2019-12-16 07:06:04','2019-12-16 07:06:04',10,5),(4,'asda',2,'2019-12-17 15:58:26','2019-12-17 15:58:28',9,5),(5,'asd',1,'2019-12-17 16:06:04','2019-12-17 16:06:09',10,5),(6,'asd',2,'2019-12-17 16:06:44','2019-12-17 16:06:47',10,5);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger review_trg after insert on reviews for each row
    begin
        declare starCount FLOAT;
        select AVG(star) INTO starCount
        FROM reviews
        WHERE bookId = NEW.bookId
        GROUP BY bookId;
        update books set star=starCount where id = NEW.bookId;
    end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_Admin` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'nguyentuanvu12@gmail.com','$2a$08$wwW8usUsiBxyhf1idVkCV.643UJeLHQP.iBQxopnvvwkfZwUyIQdK',0,'2019-11-27 15:40:39','2019-11-27 15:40:39'),(2,'nguyentuanv2u12@gmail.com','$2a$08$VordFV7.bTI4P8U5I0EbzOzsk2KcH.XxWiy/umYuSVrGAhREL5vpq',0,'2019-11-27 15:42:28','2019-11-27 15:42:28'),(3,'nguyentuanvu211@gmail.com','$2a$08$xaJ04VQMn31vwjmRlXlTcevo8k0ZZbN3AGsV1FYrKWi4pgzZYhU4q',0,'2019-12-03 08:16:05','2019-12-03 08:16:05'),(4,'a@gmail.com','$2a$08$CmPQw2H/biO5HM0NAygnLecPu1QnysQXbivYZAPEwxiVLkmsaOYqC',0,'2019-12-03 08:23:36','2019-12-03 08:23:36'),(5,'nguyentuanvu1@gmail.com','$2a$08$LIa9H9DThtVGnqSmTNXrD.75.NKZnnJyIqTMBDEM5ucxYUXtoebMu',0,'2019-12-03 08:45:36','2019-12-03 08:45:36'),(6,'das@gmail.com','$2a$08$7AePCYrMrOjc5wcQiB8Veun0VMOIelEHwRYGVqTpniZurE1OtJg/a',0,'2019-12-03 08:45:56','2019-12-03 08:45:56'),(7,'aa@gmail.com','$2a$08$x7IyxsUe9Xc2jo0k2qjilOla/tRHYKbKPPwZUyPyl1RJ7YyPuXsyK',0,'2019-12-03 08:57:21','2019-12-03 08:57:21'),(8,'ab@gmail.com','$2a$08$qCCsDUnnltcwWyLNYEAIQe4UrTLlU3rx3SA1VmyRsZVxmPifQXGre',0,'2019-12-03 08:58:51','2019-12-03 08:58:51'),(9,'daigiachantran01@gmail.com','$2a$08$/EKfkJj43d.b32rhfvaODOjkurxbFLifty8GCGBEnODJ0obPcBw4K',0,'2019-12-03 09:05:25','2019-12-03 09:05:25'),(10,'daigiachantran123456@gmail.com','$2a$08$0uXfEGjDItpy.nesDuU8iOCiEt6A0J4XAimbONgaGW1r1ahrYOX0S',NULL,'2019-12-09 09:43:12','2019-12-09 09:43:12'),(11,'daigiachantran1234@gmail.com','$2a$08$WpHIyIJuRoowAhOUEMaULucMGW0hRexAa6rqc.hnfiz0zHOLCT8u2',NULL,'2019-12-10 08:55:09','2019-12-10 08:55:09'),(12,'1@gmail.com','$2a$08$XdmIh5wsa0rpz.jPd3lPyeFGy7CqIlZdur2PjYcRM.9ouizu1YNBm',0,'2019-12-14 08:39:02','2019-12-14 08:39:02'),(13,'2@gmail.com','$2a$08$iIbLZoFw1HONQvaHOxqtXOCE/cZYOww12M2/ts4/ITxX6OqNsRIiW',0,'2019-12-14 10:36:47','2019-12-14 10:36:47'),(14,'3@gmail.com','$2a$08$WXCoaVPvPcSYSWATZb3tReB1PP3uDP8oPPBdcUCwpHyQvCERvtdUa',0,'2019-12-14 10:46:37','2019-12-14 10:46:37');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `votes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_upvote` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `reviewId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `reviewId` (`reviewId`),
  CONSTRAINT `votes_ibfk_11` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `votes_ibfk_12` FOREIGN KEY (`reviewId`) REFERENCES `reviews` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-17 18:05:55
